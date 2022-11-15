/* eslint-disable */

import React from 'react'

const scriptStore = {}

const transformProxies = (children = []) => {
  children = [].concat(children).filter(Boolean)

  const proxies = {}

  React.Children.forEach(children, (child) => {
    const props = Object.assign({}, child.props)
    Object.defineProperty(props, '_af_visit', {
      value: false,
      writable: true,
    })

    const name = (props['af-sock'] || child.type).trim().replace(/_/g, '-')
    delete props['af-sock']

    if (!proxies[name]) {
      proxies[name] = props
    }
    else if (!(proxies[name] instanceof Array)) {
      proxies[name] = [proxies[name], props]
    }
    else {
      proxies[name].push(props)
    }

    if (child.key != null) {
      props.key = child.key
    }

    if (child.ref != null) {
      props.ref = child.ref
    }
  })

  return proxies
}

export const createScope = (children, callback) => {
  const proxies = transformProxies(children)

  const result = callback((name, repeat, callback) => {
    const props = proxies[name]
  
    if (props == null) {
      // no proxy - use default unless repeat is "?" or "*"
      if (/^[?*]$/.test(repeat)) return null
      return callback({})
    }

    const visit = (props) => {
      // mark proxy as used
      props._af_visit = true
      return callback(props)
    }

    if (!(props instanceof Array)) return visit(props)
    // 2 or more proxies - error unless repeat is "+" or "*"
    if (/^[+*]$/.test(repeat)) return props.map(visit)

    throw new Error(`too many (${props.length}) '${name}' proxies`)
  })

  // print warnings about unused proxies
  Object.entries(proxies).forEach(([name, props]) => {
    ((props instanceof Array) ? props : [props]).forEach((props) => {
      if (!props._af_visit) {
        console.warn(`Warning: proxy '${name}' defined but not used`)
      }
    })
  })

  return result
}

export const prefetch = (script) => {
  if (script.body) return Promise.resolve(script.body)
  if (!script.src) return Promise.resolve('')

  if (!scriptStore[script.src]) {
    scriptStore[script.src] = fetch(script.src).then(r => r.text())
  }
  return scriptStore[script.src]
}

export const loadScripts = (scripts) => {
  const result = scripts.concat(null).reduce((active, next) =>
    Promise.resolve(active).then((active) => {
      const loading = prefetch(active).then((script) => {
        new Function(`
          with (this) {
            eval(arguments[0])
          }
        `).call(window, script)

        return next
      })

      return active.isAsync ? next : loading
    })
  )

  return Promise.resolve(result)
}

/*
 * Helper function to re-init the webflow.js code.
 *
 * This re-attaches event listeners to all elements
 * with animation triggers, among other things.
 * 
 * It might've to be called when a view is re-rendered after
 * new proxies have been added for animated elements.
 * Event listeners aren't attached to new elements automatically.
 */
export const reinitWebflow = () => {
  // Unregister event listeners of IX2
  window.Webflow?.require('ix2')?.destroy()

  // Re-initialize Webflow
  return loadScripts([
    { src: '/js/webflow.js', isAsync: false },
  ])
}

/* eslint-enable */
