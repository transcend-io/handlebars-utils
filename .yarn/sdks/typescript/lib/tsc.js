#!/usr/bin/env node

const {existsSync} = require(`fs`);
<<<<<<< HEAD
const {createRequire} = require(`module`);
=======
const {createRequire, createRequireFromPath} = require(`module`);
>>>>>>> main
const {resolve} = require(`path`);

const relPnpApiPath = "../../../../.pnp.cjs";

const absPnpApiPath = resolve(__dirname, relPnpApiPath);
<<<<<<< HEAD
const absRequire = createRequire(absPnpApiPath);
=======
const absRequire = (createRequire || createRequireFromPath)(absPnpApiPath);
>>>>>>> main

if (existsSync(absPnpApiPath)) {
  if (!process.versions.pnp) {
    // Setup the environment to be able to require typescript/lib/tsc.js
    require(absPnpApiPath).setup();
  }
}

// Defer to the real typescript/lib/tsc.js your application uses
module.exports = absRequire(`typescript/lib/tsc.js`);
