import cheerio from 'cheerio'
import path from 'path'
import git from './git'
import { promises as fs } from 'fs'
import { mkdirp } from 'fs-extra'
import { readJson, writeJson } from 'fs-extra'
import { encapsulateCSS, version } from './utils'
import { ViewWriter, ScriptWriter, StyleWriter } from './writers'
import anzip from 'anzip'

export const transpile = async (config) => {
  let htmlFiles = []
  let cssFiles = []
  let outputFiles = []
  let deletedFiles
  let exportDate

  // Read the migration state file to obtain the list of files
  // generated by the previous migration.
  await readJson(config.output.migration).then(async (migration) => {
    // Delete migrated files and the state file
    deletedFiles = migration.generatedFiles.map((file) =>
      path.join(path.dirname(config.output.migration), file))
    deletedFiles.push(config.output.migration)
    await Promise.all(deletedFiles.map((file) =>
      fs.rm(file, { force: true })))

    // Remove remaining empty directories
    const dirs = [...new Set(migration.generatedFiles
      .map((file) => {
        // Collect all parents (a/b/c, a/b, a)
        const result = []
        for (;;) {
          file = path.dirname(file)
          if (file == '.') {
            return result
          }
          result.push(file)
        }
      })
      .flat())] // flatten and find unique
      .sort().reverse() // root dirs last
    for (let dir of dirs) {
      dir = path.join(path.dirname(config.output.migration), dir)
      await fs.rmdir(dir).catch(() => {})
    }
  }).catch(() => {
    deletedFiles = []
  })

  // Stop here in "clean" mode
  if (config.clean) {
    await git.add(deletedFiles)
    await git.status()
    return
  }

  // Anzip file handlers
  const rules = [
    {
      // HTML files -- turn into views
      pattern: /(^(?!\.))(.+(\.html))$/i,
      outputContent: true,
      entryHandler: async (entry) => {
        htmlFiles.push({
          name: entry.name,
          content: await entry.getContent(),
        })
      },
    },
  ]

  if (config.encapsulateCSS) {
    rules.push({
      // CSS files -- encapsulate in af-class
      pattern: /(^(?!\.))(.+(\.css))$/i,
      outputContent: true,
      entryHandler: async (entry) => {
        cssFiles.push({
          name: entry.name,
          content: await entry.getContent(),
        })
      },
    })
  }

  // Process the input zip file
  await anzip(config.input, {
    disableOutput: true, // not using the return value
    rules, // file handlers
    // Default handler -- extract files into public folder
    entryHandler: async (entry) => {
      const filename = `${config.output.public}/${entry.name}`
      await mkdirp(path.dirname(filename))
      if (await entry.saveTo(config.output.public)) {
        outputFiles.push(filename)
      } else {
        console.error('error saving', filename, ':', entry.error)
      }
      // Get lastmod date of any file (they're all the same)
      if (!exportDate) {
        exportDate = entry.entry.getLastModDate()
      }
    },
  })

  const scriptWriter = new ScriptWriter({
    baseUrl: config.input,
    prefetch: config.prefetch,
    patchWebflow: config.encapsulateCSS,
  })

  const styleWriter = new StyleWriter({
    baseUrl: config.input,
    prefetch: config.prefetch,
    source: config.source,
    encapsulateCSS: config.encapsulateCSS,
  })

  const transpilingHTMLFiles = htmlFiles.map((htmlFile) => {
    return transpileHTMLFile(
      config,
      htmlFile,
      scriptWriter,
      styleWriter,
    )
  })

  const writingFiles = Promise.all(transpilingHTMLFiles).then((viewWriters) => {
    return Promise.all([
      ViewWriter.writeAll(
        viewWriters, config.output.src.views
      ).then((paths) => outputFiles.push(...paths)),
      scriptWriter.write(
        config.output.src.scripts
      ).then((paths) => outputFiles.push(...paths)),
      styleWriter.write(
        config.output.src.styles
      ).then((paths) => outputFiles.push(...paths)),
    ])
  })

  const encapsulatingFiles = Promise.all(cssFiles.map(async (cssFile) => {
    const filename = `${config.output.public}/${cssFile.name}`
    const css = encapsulateCSS(cssFile.content.toString(), config.source)
    await mkdirp(path.dirname(filename))
    await fs.writeFile(filename, css)
    return filename
  })).then((paths) => outputFiles.push(...paths))

  await Promise.all([
    writingFiles,
    encapsulatingFiles,
  ])

  // Write the migration state file with the list of generated files.
  // This will be read by the next migration to identify old files.
  await writeJson(config.output.migration, {
    version,
    exportDate,
    migrationDate: new Date(),
    generatedFiles: outputFiles
      .map((file) => path.relative(path.dirname(config.output.migration),
                                   file).replace(/\\/g, '/'))
      .sort(),
  }, { spaces: 2 })
  outputFiles.push(config.output.migration)

  // Stage all created/modified/deleted files
  await git.add([
    ...deletedFiles,
    ...outputFiles,
  ])
  // We could commit the changes but we leave it up to the user
  //await git.commit('appfairy: Migrate')
  await git.status()
}

const transpileHTMLFile = async (
  config,
  htmlFile,
  scriptWriter,
  styleWriter,
) => {
  const html = htmlFile.content.toString()
  const $ = cheerio.load(html)
  const $head = $('head')
  const $body = $('body')
  const dataAttrs = $(':root').data()

  const viewWriter = new ViewWriter({
    folder: path.dirname(htmlFile.name),
    name: path.basename(htmlFile.name).split('.').slice(0, -1).join('.'),
    baseUrl: config.input,
    source: config.source,
    encapsulateCSS: config.encapsulateCSS,
  })

  setScripts(scriptWriter, $head, $)
  setStyles(viewWriter, styleWriter, $head, $)
  setHTML(viewWriter, $body, $)
  setWfData(viewWriter, dataAttrs)

  return viewWriter
}

const setScripts = (scriptWriter, $head) => {
  const $scripts = $head.find('script[type="text/javascript"]')

  $scripts.each((i, script) => {
    const $script = $head.find(script)

    scriptWriter.setScript($script.attr('src'), $script.html(), {
      isAsync: !!$script.attr('async'),
    })
  })
}

const setStyles = (viewWriter, styleWriter, $head) => {
  let $styles

  $styles = $head.find('link[rel="stylesheet"][type="text/css"]')

  $styles.each((i, style) => {
    const $style = $head.find(style)

    viewWriter.setStyle($style.attr('href'), $style.html())
    styleWriter.setStyle($style.attr('href'), $style.html())
  })

  $styles = $head.find('style')

  $styles.each((i, style) => {
    const $style = $head.find(style)

    viewWriter.setStyle($style.attr('href'), $style.html())
    styleWriter.setStyle($style.attr('href'), $style.html())
  })
}

const setHTML = (viewWriter, $body, $) => {
  // Create a wrap around $body so we can inherit its style without actually
  // using a <body> tag
  const $div = $('<div>')
  $div.html($body.html())
  $div.attr($body.attr())
  viewWriter.html = $.html($div)
}

const setWfData = (viewWriter, dataAttrs) => {
  viewWriter.wfData = dataAttrs
}
