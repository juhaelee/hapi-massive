var Hoek = require("hoek");
var massive = require("massive");
var Promise = require("bluebird");

var DEFAULTS = {
  connectionString: "postgres://localhost/"
};

exports.register = function(server, options, next){
  var config = Hoek.applyToDefaults(DEFAULTS, options);

  massive.connect({
    connectionString: config.connectionString
  }, function(err, db){
    if(err){ return next(err); }

    // wrap with bluebird for promise support
    Promise.promisifyAll(db);
    for(var prop in db){
      if(db[prop] instanceof Object && !(db[prop] instanceof Array) && !(db[prop] instanceof Function)){
        Promise.promisifyAll(db[prop]);
      }
    }

    // make available in hapi application
    server.expose("db", db);
    // Let the caller know the db is ready...
    return next();
  });
};

exports.register.attributes = {
  pkg: require("./package.json")
};
