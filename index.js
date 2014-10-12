var fs = require('fs');
var pathHelpers = require('path');


var configHelpers = {
  addApp: function (app, manifest) {
    var config = module.exports.config;

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
      module.exports.configPath, JSON.stringify(config, null, 2));
  },

  addPlugin: function (plugin, manifest) {
    var config = module.exports.config;

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
      module.exports.configPath, JSON.stringify(config, null, 2));
  }
}


var installDev = function (path) {
  var manifestPath = pathHelpers.join(path, 'package.json');
  var manifest = require(manifestPath);
  console.log('Installing application ' + app + '...');
  configHelpers.addApp(path, manifest);
  var target = pathHelpers.join(
      module.exports.home, 'node_modules', manifest.name);
  fs.symlinkSync(path, target);
  console.log(app + ' installed. Enjoy!');
}


var addPluginDev = function (path) {
  var manifestPath = pathHelpers.join(path, 'package.json');
  var manifest = require(manifestPath);
  console.log('Installing plugin ' + plugin + '...');
  configHelpers.addPlugin(path, manifest);
  var target = pathHelpers.join(
      module.exports.home, 'node_modules', manifest.name);
  fs.symlinkSync(path, target);
  console.log(app + ' installed. Enjoy!');
}


module.exports.configure = function (options, config, program) {
  module.exports.config = config;
  module.exports.home = options.home;
  module.exports.configPath = options.config_path;

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
