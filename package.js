var path = Npm.require("path");

Package.describe({
  summary: "JavaScript ES6 - Harmony to ES5 compiler",
  version: "0.0.66",
  name: "tomi:es6",
  git: "https://github.com/mquandalle/meteor-harmony.git"
});

Package._transitional_registerBuildPlugin({
  name: "compileEs6Harmony",
  use: [],
  sources: [
    "compiler.js"
  ],
  npmDependencies: {
    "traceur": "0.0.66"
  }
});

Package.onUse(function (api) {
  api.addFiles(".npm/plugin/compileEs6Harmony/node_modules/traceur/bin/traceur-runtime.js");
  api.imply('mrt:exports@1.0.0');
});

Package.onTest(function (api) {
  api.use(['tomi:es6', 'tinytest']);
  api.addFiles([
    'tests/harmony_test_setup.js',
    'tests/harmony_tests.js',
    'tests/harmony_test_setup.next.js',
    'tests/harmony_tests.next.js'
  ]);
});
