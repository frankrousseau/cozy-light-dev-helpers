var fs = require('fs');


var installDev = function (apppath) {
  console.log('installDev');
}

var addPluginDev = function (apppath) {
  console.log('add plugin');
}


module.exports.configure = function (options, config, program) {
  module.exports.config = config;
  module.exports.configPath = options.config_path;

  program
    .command('install-dev <apppath>')
    .description('Add a symlink to your app folder and update ' +
                 'configuration file like the application was installed.')
    .action(installDev);

  program
    .command('add-plugin-dev <apppath>')
    .description('Add a symlink to your plugin folder and update ' +
                 'configuration file like the application was installed.')
    .action(addPluginDev);
};
