var fs = require('fs');
var pathHelpers = require('path');


var configHelpers = {
  addApp: function (app, manifest) {
    var config = module.config;

    if(manifest.type === undefined) {
      manifest.type = "classic";
    }

    config.apps[app] = {
      name: manifest.name,
      displayName: manifest.displayName,
      version: manifest.version,
      description: manifest.description,
      type: manifest.type
    };
    fs.writeFileSync(
      module.configPath, JSON.stringify(config, null, 2));
  },

  addPlugin: function (plugin, manifest) {
    var config = module.config;

    if(config.plugins === undefined) {
      config.plugins = {};
    };

    config.plugins[plugin] = {
      name: manifest.name,
      displayName: manifest.displayName,
      version: manifest.version,
      description: manifest.description
    };
    fs.writeFileSync(
      module.configPath, JSON.stringify(config, null, 2));
  }
}


var installDev = function (path) {
  var manifestPath = pathHelpers.join(path, 'package.json');
  var manifest = require(manifestPath);
  console.log('Installing application ' + app + '...');
  configHelpers.addApp(path, manifest);
  var target = pathHelpers.join(
      module.home, 'node_modules', manifest.name);
  fs.symlinkSync(path, target);
  console.log(app + ' installed. Enjoy!');
}


var addPluginDev = function (path) {
  var manifestPath = pathHelpers.join(path, 'package.json');
  var manifest = require(manifestPath);
  configHelpers.addPlugin(path, manifest);
  var target = pathHelpers.join(
      module.home, 'node_modules', manifest.name);
  fs.symlinkSync(path, target);
  console.log(manifest.name + ' installed. Enjoy!');
}


module.exports.configure = function (options, config, program) {
  module.config = config;
  module.home = options.home;
  module.configPath = options.configPath;

  program
    .command('install-dev <path>')
    .description('Add a symlink to your app folder and update ' +
                 'configuration file like the application was installed.')
    .action(installDev);

  program
    .command('add-plugin-dev <path>')
    .description('Add a symlink to your plugin folder and update ' +
                 'configuration file like the application was installed.')
    .action(addPluginDev);
}
