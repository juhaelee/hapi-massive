var Hoek = require("hoek");
var massive = require("massive");

var DEFAULTS = {
  connectionString: "postgres://localhost/"
};

exports.register = function(server, options, next){
  var config = Hoek.applyToDefaults(DEFAULTS, options);

  massive.connect({
    connectionString: config.connectionString
  }, function(err, db){
    if(err){ return next(err); }
    // make available in hapi application
    server.expose("db", db);
    // Let the caller know the db is ready...
    return next();
  });
};

exports.register.attributes = {
  pkg: require("./package.json")
};
