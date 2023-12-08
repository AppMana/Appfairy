Changes made in this fork:

- Takes a zip file as input (no need to unzip manually)
- Render in multiple stages using React components
- Flexible view API removing the need for `af-el`
- More reliable migration files tracking using a state file instead of git directly
- Support for page folders
- Support for TypeScript
- Uses function components instead of class components
- Encapsulation of CSS disabled by default
- Bugfixes

This version is published in the `@awahlig` scope and can be installed using:

    $ npm install @awahlig/appfairy -g

Original README.md (outdated):

# Appfairy

<p align="center"><img src="https://user-images.githubusercontent.com/7648874/45173702-8e98e700-b23b-11e8-96c7-2426ab03abe0.png" alt="appfairy"></p>

I'm just tired going through a design and translating it into React components. Appfairy is a CLI tool that does that for you - by running a single command the design will be transpiled into React components. As for now Appfairy works with Webflow only for web React apps, but the near future plans are to have that compatible with Sketch and React Native.

## Methodology

Since machine generated assets aren't very easy to maintain due to their complexity, Appfairy takes on an old school approach where a single component is made out of a view and a controller. The view is automatically generated by Appfairy and shouldn't be changed, we treat it as a black box. The controller however is user defined. Every element within the controller is a proxy to an element within the view.

Here's an example of a possible controller:

```js
import { useState } from "react";
import { ConsultFormView, sock } from "../views/ConsultFormView";

const ConsultFormController = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [description, setDescription] = useState("");

  const submit = () => {
    alert(`
      ${name}
      ${phone}
      ${email}
      ${description}
    `);
  };

  return (
    <ConsultFormView>
      <input af-sock={sock.name} onChange={(e) => setName(e.target.value)} />
      <input af-sock={sock.phone} onChange={(e) => setPhone(e.target.value)} />
      <input af-sock={sock.email} onChange={(e) => setEmail(e.target.value)} />
      <input
        af-sock={sock.description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input af-sock={sock.submit} onClick={submit} />
    </ConsultFormView>
  );
};

export default ConsultFormController;
```

This way the view can be changed without us worrying about re-binding the event listeners and props.

For an in-depth explanation regards Appfairy be sure to check-out the following:

- [Medium blog post](https://medium.com/@eytanmanor/how-to-create-a-react-app-out-of-a-webflow-project-309b696a0533) - An introduction to Appfairy and the motives behind it.

- [YouTube video](https://www.youtube.com/watch?v=6hJe6pZld0o) - I walk through Appfairy and an implementation of an example app.

- [Example app](https://github.com/DAB0mB/Appfairy/tree/master/examples/prefetch) - An example for a simple app which uses Appfairy.

## Docs

Appfairy is a CLI tool that can be installed using NPM:

    $ npm install @awahlig/appfairy -g

After exporting your Webflow project into a zip file, simply place it in the root of your project as `webflow.zip` and run `$ appfairy`. After doing so you'll notice that new files have been created in your project and that they have been automatically staged for a git commit. At this point feel free to commit those changes.

The commit consists of the following files (regardless if they were added, modified or deleted):

- **public/** (public assets which should be served by our app's server)

  - **images/**

  - **fonts/**

  - **css/**

- **src/**

  - **scripts/** (scripts that should be imported in index.js)

  - **styles/** (css files that should be imported in index.js)

  - **views/** (contains ConsultFormView - further explanation below)

The output can be controlled using a config file named `af_config.js` which should be located in the root of the project. The config file may (or may not) include some of the following options:

- **prefetch (boolean)** - Prefetch the styles and scripts which are necessary for the design to work. If not specified, the scripts and styles will be fetched during runtime. An example app with prefetching enabled can be found [here](https://github.com/DAB0mB/Appfairy/tree/master/examples/prefetch).

- **encapsulateCSS (boolean)** - Encapsulate all CSS in af-classes. If not specified, CSS will not be encapsulated.

- **source (source)** - Can either be set to `webflow`, `sketch` and represents the studio name that generated the basic CSS and HTML assets. If not set there will be little to no difference in the transpilation process but it will however make the CSS encapsulation more accurate. Examples for Webflow and Sketch apps can be found [here](https://github.com/DAB0mB/Appfairy/tree/master/examples).

- **input (string)** - The input zip file exported from Webflow. Defaults to `webflow.zip` in the root of the project.

- **output (string/object)** - If a string was provided, the output will be mapped to the specified dir. If an object, each key in the object will map its asset type to the specified dir in the value. The object has the following schema:

  - **public (string)** - Public dir. Defaults to `public`.

  - **src (string/object)** - Source dir. If a string is provided, all its content will be mapped to the specified dir, otherwise the mapping will be done according to the following object:

    - **scripts (string)** - Scripts dir. Defaults to `src/scripts`.

    - **styles (string)** - Scripts dir. Defaults to `src/styles`.

    - **views (string)** - Scripts dir. Defaults to `src/views`.

Alternatively, you may provide (extra) options through the command line like the following:

    $ appfairy [...options]

The CLI tool supports the following options:

- **--clean**

- **--prefetch**

- **--encapsulate-css**

- **--source/--src**

- **--input/--in**

- **--output/--out**

- **--config**

The behavior of Appfairy will change according to the specified options as detailed above, and the rest is self explanatory.

## LICENSE

MIT
