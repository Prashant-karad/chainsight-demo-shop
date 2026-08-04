// Build step: precompile the e-mail templates (handlebars runs only at build time).
const fs = require("fs");
const Handlebars = require("handlebars");

const receipt = "<h2>Receipt #{{id}}</h2><ul>{{#each items}}<li>{{name}}: Rs {{price}}</li>{{/each}}</ul>";
fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/receipt.js", "module.exports = " + Handlebars.precompile(receipt));
