/* Auto-generated using Appfairy.  DO NOT EDIT! */
/* eslint-disable */

import React from "react";

import { loadScripts } from "../scripts/helpers";
import { loadStyles } from "../styles/helpers";

export class RenderError extends Error {
  constructor(message) {
    super(message);
    this.name = "RenderError";
  }
}

const defaultViewContext = Object.freeze({
  hatch: "",
  namespace: "",
  template: null,
  plugs: null,
  used: null,
  parent: null,
});

const ViewContext = React.createContext(defaultViewContext);

export const View = ({ scripts, styles, wfData, noWebflow, ...props }) => {
  const [loaded, setLoaded] = React.useState(false);

  React.useEffect(() => {
    Promise.all([loadScripts(scripts), loadStyles(styles)]).then(() => {
      setLoaded(true);
    });
  }, [scripts, styles]);

  React.useLayoutEffect(() => {
    const htmlEl = document.querySelector("html");
    // Save and later restore previous values in case the view is a popup.
    const prevData = {};
    for (const [attr, value] of Object.entries(wfData)) {
      prevData[attr] = htmlEl.dataset[attr];
      htmlEl.dataset[attr] = value;
    }
    return () => {
      for (const [attr, value] of Object.entries(prevData)) {
        htmlEl.dataset[attr] = value;
      }
    };
  }, [wfData]);

  React.useLayoutEffect(() => {
    const Webflow = window.Webflow;
    if (!noWebflow && Webflow && loaded) {
      Webflow.ready();
      Webflow.require("ix2")?.init();
    }
  }, [loaded, noWebflow]);

  const context = {
    ...defaultViewContext,
    namespace: resolveSock(props.namespace),
    template: props.children,
  };

  return loaded ? (
    <ViewContext.Provider value={context}>{props.content}</ViewContext.Provider>
  ) : (
    <>{props.fallback}</>
  );
};

export const Render = (props) => {
  const context = React.useContext(ViewContext);
  const namespace = resolveSock(props.namespace) || context.namespace;

  const plugs = React.useMemo(() => {
    const plugs = {};
    React.Children.forEach(props.children, (child) => {
      if (child) {
        const item = transformPlug(child, namespace);

        if (!plugs[item.sock]) plugs[item.sock] = [item];
        else plugs[item.sock].push(item);
      }
    });
    return plugs;
  }, [props.children, namespace]);

  const used = React.useRef({});
  const keys = React.useMemo(() => Object.keys(plugs), [plugs]);

  React.useEffect(() => {
    for (const sock of keys) {
      if (!used.current[sock]) {
        console.warn(`${namespace}: unused plug "${sock}"`);
      }
    }
  }, [keys, namespace]);

  const childContext = {
    ...defaultViewContext,
    namespace,
    template: props.element ? context.template : null,
    plugs,
    used: used.current,
    parent: context,
  };

  return (
    <ViewContext.Provider value={childContext}>
      {props.element || context.template}
    </ViewContext.Provider>
  );
};

export const Hatch = (props) => {
  const context = React.useContext(ViewContext);
  const key = `${context.namespace}.${props.sock}`;
  const template = props.children; // single

  const rendered = findPlugs(context, props.sock)
    ?.map((item) => renderPlug(item, template))
    .filter(Boolean);

  const childContext = {
    ...defaultViewContext,
    hatch: props.sock,
    namespace: key,
    template: template.props.children,
    parent: context,
  };

  return (
    <ViewContext.Provider value={childContext}>
      {rendered?.length === 1 ? rendered[0] : rendered || template}
    </ViewContext.Provider>
  );
};

export const Plug = () => {
  throw new RenderError("<Plug> can only be used in <Render>");
};

export const Swap = () => {
  throw new RenderError("<Swap> can only be used in <Render>");
};

export const Proxy = () => {
  throw new RenderError("<Proxy> can only be used in <Render>");
};

function transformPlug(plug, ns) {
  if (
    !React.isValidElement(plug) ||
    (plug.type !== Plug && plug.type !== Swap && plug.type !== Proxy)
  ) {
    throw new RenderError(`${ns}: <Render> can only contain <Plug|Swap|Proxy>`);
  }

  const item = {
    type: plug.type,
    sock: resolveSock(plug.props.sock),
    content: plug.props.children,
    key: plug.key,
  };

  if (!item.sock) {
    throw new RenderError(`${ns}: missing sock= on <${item.type.name}>`);
  }

  const p = `<${item.type.name} sock="${item.sock}">`;
  item.sock = relativeSock(item.sock, ns) || relativeSock(item.sock, "");
  if (!item.sock) {
    throw new RenderError(`${p} is not valid in "${ns}" namespace`);
  }

  if (item.type !== Proxy) {
    // plug|swap
    const text = plug.props.text;
    if (["string", "number"].includes(typeof text)) {
      item.content = text;
    } else if (text) {
      throw new RenderError(`text= on ${p} must be a string or a number`);
    }
  }

  const element = plug.props.element;
  if (React.isValidElement(element)) {
    item.content = element;
  } else if (element) {
    throw new RenderError(`element= on ${p} must be an element`);
  }

  if (
    item.type === Proxy &&
    item.content != null && // coerces undefined
    !React.isValidElement(item.content)
  ) {
    throw new Error(`${p} requires a single child element or null`);
  }

  return item;
}

function findPlugs(context, sock) {
  while (context) {
    if (context.plugs) {
      const plugs = context.plugs[sock];
      if (plugs) {
        if (context.used) {
          context.used[sock] = true;
        }
        return plugs;
      }
    }
    if (context.hatch) {
      sock = `${context.hatch}.${sock}`;
    }
    context = context.parent;
  }
  return null;
}

function renderPlug(item, template) {
  if (item.type === Plug) {
    // place plug content inside template element
    return (
      <template.type
        {...mergeProps(template.props, item.key ? { key: item.key } : null, {
          children: item.content,
        })}
      />
    );
  } else if (item.type === Swap) {
    // replace everything with the plug content
    return item.content;
  } else if (item.type !== Proxy) {
    // should never get here
    throw "invalid plug type";
  } else if (React.isValidElement(item.content)) {
    // merge proxy element with template element
    const proxy = item.content;
    return (
      <proxy.type
        {...mergeProps(
          template.props,
          item.key ? { key: item.key } : null,
          proxy.props,
          proxy.key ? { key: proxy.key } : null,
          proxy.ref ? { ref: proxy.ref } : null,
        )}
      />
    );
  } else {
    // merge null - return just the template
    return (
      <template.type
        {...mergeProps(template.props, item.key ? { key: item.key } : null)}
      />
    );
  }
}

const mergeProps = (...props) => {
  const out = props.reduce((prev, curr) => ({ ...prev, ...curr }), {});
  if (out.className) {
    out.className = props
      .map((curr) => curr?.className)
      .filter(Boolean)
      .join(" ");
  }
  return out;
};

export function defineSock(name, spec) {
  return Object.freeze(
    Object.fromEntries(
      Object.entries(spec)
        .map(([k, v]) => {
          const fn = `${name}.${k}`;
          return [k, v ? defineSock(fn, v) : fn];
        })
        .concat([["", name]]),
    ),
  );
}

export function resolveSock(sock) {
  return sock ? (typeof sock === "string" ? sock : sock[""]) : "";
}

function relativeSock(sock, ns) {
  return sock.startsWith(`${ns}.`) ? sock.slice(ns.length + 1) : "";
}
