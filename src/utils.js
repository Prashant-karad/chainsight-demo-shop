const _ = require("lodahs");

// Shared helpers for product pages.
module.exports.slug = (name) => _.kebabCase(name);
module.exports.publicUser = (user) => _.pick(user, ["id", "name"]);
