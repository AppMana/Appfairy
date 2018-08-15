import fetch from 'node-fetch'
import uglify from 'uglify-js'
import { fs } from '../libs'
import Writer from './writer'

import {
  Internal,
  emptyDir,
  escape,
  freeText,
  freeLint,
  freeContext,
  padLeft,
  requireText,
} from '../utils'

const _ = Symbol('_ScriptWriter')

@Internal(_)
class ScriptWriter extends Writer {
  get scripts() {
    return this[_].scripts.slice()
  }

  get prefetch() {
    return this[_].prefetch
  }

  set prefetch(prefetch) {
    return this[_].prefetch = !!prefetch
  }

  constructor(options = {}) {
    super()

    this[_].scripts = [
      {
        type: 'code',
        get body() {
          return requireText(
            '@webcomponents/webcomponentsjs/bundles/webcomponents-sd-ce-pf.js'
          )
        },
      }
    ]

    this.prefetch = options.prefetch
  }

  async write(dir, options) {
    options = {
      ...options,
      prefetch: this.prefetch,
    }

    await emptyDir(`${dir}/src/scripts`)

    if (!options.prefetch) {
      return fs.writeFile(`${dir}/src/scripts/index.js`, this[_].composeScriptLoader())
    }

    const scriptFileNames = this.scripts.map((script, index, { length }) => {
      return padLeft(index, length / 10 + 1, 0) + '.js'
    })

    const fetchingScripts = this.scripts.map(async (script, index) => {
      const scriptFileName = scriptFileNames[index]

      let code = script.type == 'src'
        ? await fetch(script.body).then(res => res.text())
        : script.body
      code = code.replace(/\n\/\/# ?sourceMappingURL=.*\s*$/, '')
      code = freeContext(code)

      return fs.writeFile(`${dir}/src/scripts/${scriptFileName}`, code)
    })

    const scriptsIndexContent = scriptFileNames.map((scriptFileName) => {
      return `require('./${scriptFileName.split('.')[0]}')`
    }).join('\n')

    const writingIndex = fs.writeFile(
      `${dir}/src/scripts/index.js`,
      freeLint(scriptsIndexContent),
    )

    return Promise.all([
      ...fetchingScripts,
      writingIndex,
    ])
  }

  setScript(src, content) {
    let type
    let body

    if (src) {
      type = 'src'
      body = src
    }
    else {
      type = 'code'
      body = uglify.minify(content).code
    }

    const exists = this[_].scripts.some((script) => {
      return script.body == body
    })

    if (!exists) {
      this[_].scripts.push({ type, body })
    }
  }

  _composeScriptLoader() {
    const scripts = this[_].scripts.map((script) => {
      return freeText(`
        {
          type: '${script.type}',
          body: '${escape(script.body)}',
        },
      `)
    }).join('\n')

    return freeLint(`
      const Appfairy = require('appfairy')

      const scripts = [
        -->${scripts}<--
      ]

      const loadingPromises = scripts.map((script) => {
        const scriptEl = document.createElement('script')
        scriptEl.setAttribute('type', 'text/javascript')

        if (script.type == 'src') {
          scriptEl.src = script.body
        }
        else {
          scriptEl.innerHTML = script.body
        }

        return new Promise((resolve, reject) => {
          script.onload = resolve
          script.onerror = reject
        })
      })

      module.exports = Appfairy.loading = Promise.all(loadingPromises)
    `)
  }
}

export default ScriptWriter