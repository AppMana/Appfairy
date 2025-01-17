import findRoot from "find-root";
import fs from "fs";
import minimist from "minimist";
import path from "path";
import { transpile } from "./index.js";

const root = findRoot(process.cwd());

const args = minimist(process.argv.slice(2), {
  string: ["output", "input", "source", "config"],
  boolean: ["clean", "prefetch", "encapsulate-css", "help"],
  alias: {
    in: "input",
    out: "output",
    src: "source",
    cfg: "config",
  },
  default: {
    clean: false,
    prefetch: false,
    "encapsulate-css": false,
    help: false,
    input: `${root}/webflow.zip`,
    output: root,
    source: "",
  },
  unknown: (name) => {
    console.error("unrecognized argument:", name);
    process.exit(-1);
  },
});

let { input, output, source, config, clean, prefetch, help } = args;
let encapsulateCSS = args["encapsulate-css"];

if (help) {
  console.log(`
usage: appfairy [--help] [--in | --input <path>] [--out | --output <path>]
                [--src | --source <name>] [--cfg | --config <path>] [--clean]
                [--prefetch] [--encapsulate-css] [--typescript--ext]

After exporting your Webflow project into a zip file, simply place it in the root of your project as
\`webflow.zip\` and run \`$ appfairy\`.

The changes consist of the following files (regardless if they were added, modified or deleted):

- public/ (public assets which should be served by our app's server)

  - images/

  - fonts/

  - css/

- src/

  - scripts/ (scripts that should be imported in index.js)

  - styles/ (css files that should be imported in index.js)

  - views/

The output can be controlled using a config file named \`af_config.js\` which should be located in
the root of the project. The config file may (or may not) include some of the following options:

- prefetch (boolean) - Prefetch the styles and scripts which are necessary for the design to work.
  If not specified, the scripts and styles will be fetched during runtime.

- encapsulateCSS (boolean) - Encapsulate all CSS in af-classes. If not specified, CSS will not be
  encapsulated.

- source (source) - Can either be set to \`webflow\`, \`sketch\` and represents the studio name that
  generated the basic CSS and HTML assets. If not set there will be little to no difference in the
  transpilation process but it will however make the CSS encapsulation more accurate.

- input (string) - The input zip file exported from Webflow. Defaults to \`webflow.zip\` in the
  root of the project.

- output (string/object) - If a string was provided, the output will be mapped to the specified dir.
  If an object, each key in the object will map its asset type to the specified dir in the value.
  The object has the following schema:

  - public (string) - Public dir. Defaults to \`public\`.

  - src (string/object) - Source dir. If a string is provided, all its content will be mapped to the
    specified dir, otherwise the mapping will be done according to the following object:

    - scripts (string) - Scripts dir. Defaults to \`src/scripts\`.

    - styles (string) - Styles dir. Defaults to \`src/styles\`.

    - views (string) - Views dir. Defaults to \`src/views\`.

Alternatively, you may provide (extra) options through the command line like the following:

    $ appfairy [...options]

The CLI tool supports the following options:

- --clean

- --prefetch

- --encapsulate-css

- --source/--src

- --input/--in

- --output/--out

- --config
`);

  process.exit(0);
}

if (config) {
  config = path.resolve(process.cwd(), config);
} else
  try {
    fs.statSync(`${root}/af_config.js`);
    config = `${root}/af_config.js`;
  } catch (e) {
    // File in default path not exist
  }

const configBase = {
  input,
  output,
  source,
  prefetch,
  encapsulateCSS,
  // Preserve original path
  __dirname: config ? path.dirname(config) : process.cwd(),
};

if (config) {
  // Will throw an error if file not exist
  config = Object.assign(configBase, require(config));
} else {
  config = configBase;
}

config.clean = clean;

// Validate config.output schema
if (typeof config.prefetch != "boolean") {
  throw TypeError("config.prefetch must be a boolean");
}
if (typeof config.encapsulateCSS != "boolean") {
  throw TypeError("config.encapsulateCSS must be a boolean");
}
if (typeof config.input != "string") {
  throw TypeError("config.input must be a string");
}
if (typeof config.output == "string") {
  config.output = {
    public: `${config.output}/public`,
    src: `${config.output}/src`,
    migration: `${config.output}/.af_migration.json`,
  };
}
if (typeof config.output != "object") {
  throw TypeError("config.output must be an object");
}
if (typeof config.output.public != "string") {
  throw TypeError("config.output.public must be a string");
}
if (typeof config.output.src == "string") {
  config.output.src = {
    scripts: `${config.output.src}/scripts`,
    styles: `${config.output.src}/styles`,
    views: `${config.output.src}/views`,
  };
}
if (typeof config.output.src != "object") {
  throw TypeError("config.output.src must be an object or a string");
}
if (typeof config.output.src != "object") {
  throw TypeError("config.output.src must be an object");
}
if (typeof config.output.src.scripts != "string") {
  throw TypeError("config.output.src.scripts must be a string");
}
if (typeof config.output.src.styles != "string") {
  throw TypeError("config.output.src.styles must be a string");
}
if (typeof config.output.src.views != "string") {
  throw TypeError("config.output.src.views must be a string");
}
if (typeof config.output.migration != "string") {
  throw TypeError("config.output.migration must be a string");
}
if (typeof config.source != "string") {
  throw TypeError("config.source must be a string");
}

config.input = path.resolve(config.__dirname, config.input);
config.output = {
  public: path.resolve(config.__dirname, config.output.public),
  src: {
    scripts: path.resolve(config.__dirname, config.output.src.scripts),
    styles: path.resolve(config.__dirname, config.output.src.styles),
    views: path.resolve(config.__dirname, config.output.src.views),
  },
  migration: path.resolve(config.__dirname, config.output.migration),
};

transpile(config).catch((errs) => {
  errs = [].concat(errs);

  errs.forEach((err) => {
    console.error(err);
  });
});
