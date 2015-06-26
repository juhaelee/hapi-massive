# hapi-massive
Hapi plugin for [massive.js 2.0](https://github.com/robconery/massive-js)

## Install
```javascript
var plugin = {
  register: require("hapi-massive"),
  options: {
    connectionString: "postgres://username:password@localhost/database"
  }
};

server.register(plugin, function(error){
  if(error){
    console.error("failed to load plugin: ", err);
  }
}
```

hapi-massive comes free with promises! Promises wrap all your sql files as well as the [relational bits](https://github.com/robconery/massive-js#helpful-relational-bits) 

## Examples
Clean code! (Say that you have a table named user and a sql file named createUser.sql that returns a user object upon creation)
```javascript
var db = request.plugins["hapi-massive"].db;
var userdeets = [...userinfo];
db.createUserAsync().then(function(user){
  console.log("woot! user created. ", user); 
});
```
Or go crazy with generators! (using [co.js](https://github.com/tj/co))
```javascript
var db = request.plugins["hapi-massive"].db;
co(function*(){
  var userdeets = [...userinfo];
  var user = yield db.createUserAsync(userdeets); // wow does this look like its in sync or what?
  console.log(user);
}).catch(function(err){
  console.log("there can't be errors in an example!");
});
```

#### Special thanks
Heavily inspired by [hapi-node-postgres](https://github.com/jedireza/hapi-node-postgres).

Promises brought to you by [bluebird](https://github.com/petkaantonov/bluebird)
