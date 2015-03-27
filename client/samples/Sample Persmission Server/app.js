var DocumentDBClient = require("documentdb").DocumentClient
  , DocumentBase = require("documentdb").DocumentBase
  , http = require('http');

var masterKey = "your master key";
var host = "your endpoint";

var resourcesCreated = false;
var collectionId = "Data";
var databaseId = "Samples";
var userId = "WebApplicationUser";
var permissionId = "ReadWritePermission";

var cachedCollection, cachedUser, cachedPermission;

var client = new DocumentDBClient(host, { masterKey: masterKey });

// if the database does not exist, then create it, else return the database object
var readOrCreateDatabase = function (callback) {
    client.queryDatabases('SELECT * FROM root r WHERE r.id="' + databaseId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            // indicating no database exists matching the query            
            client.createDatabase({ id: databaseId }, function (err, createdDatabase) {
                callback(createdDatabase);
            });
        } else {
            // we found a database
            callback(results[0]);
        }
    });
};

// if the collection does not exist for the database provided, create it, else return the collection object
var readOrCreateCollection = function (database, callback) {
    client.queryCollections(database._self, 'SELECT * FROM root r WHERE r.id="' + collectionId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            //indicating no collection exists in the provided database matching the query
            client.createCollection(database._self, { id: collectionId }, function (err, createdCollection) {
                callback(createdCollection);
            });
        } else {
            // we found a collection
            callback(results[0]);
        }
    });
};

// if the user does not exist for the database provided, create it, else return the user object
var readOrCreateUser = function (database, callback) {
    client.queryUsers(database._self, 'SELECT * FROM root r WHERE r.id="' + userId + '"').toArray(function (err, results) {
        if (err) {
            // some error occured, rethrow up
            throw (err);
        }
        if (!err && results.length === 0) {
            // no error occured, but there were no results returned 
            //indicating no user exists in the provided database matching the query
            client.createUser(database._self, { id: userId }, function (err, createdUser) {
                callback(createdUser);
            });
        } else {
            // we found a user
            callback(results[0]);
        }
    });
};

function createResourcesIfNotExists(callback) {
    if (resourcesCreated) callback();
    readOrCreateDatabase(function (db) {
        console.log('read or create database complete');
        readOrCreateCollection(db, function (coll) {
            console.log('read or create collection complete');
            cachedCollection = coll;
            readOrCreateUser(db, function (user) {
                console.log('read or create user complete');
                cachedUser = user;
                resourcesCreated = true;
                callback();
            });
        });
    });
}

function deletePermissionIfExists(callback) {
    client.queryPermissions(cachedUser._self, 'SELECT * FROM root r WHERE r.id="' + permissionId + '"').toArray(function (err, results) {
        if (err) {
            console.log('failed to create permission');
            console.log(error);
            throw (err);
        }
        if (!err && results.length === 1) {
            cachedPermission = results[0];
            client.deletePermission(cachedPermission._self, function (err, result) {
                console.log('permission delete complete');
                callback();
            });
        } else {
            callback();
        }
    });
}

function createPermission(callback) {
    client.createPermission(cachedUser._self, { id: permissionId, permissionMode: DocumentBase.PermissionMode.All, resource: cachedCollection._self }, function (error, permission) {
        if (error) {
            console.log('failed to create permission');
            console.log(error);
            callback(null, error);
        } else {
            console.log('created permission: ' + permission.id);
            cachedPermission = permission;
            callback(permission, null);
        }
    });
}

http.createServer(function (req, res) {
    console.log('Request received');

    createResourcesIfNotExists(function () {
        // If the permission already exists, refresh it.
        deletePermissionIfExists(function () {
            createPermission(function (permission, error) {
                if (error) {
                    res.writeHead(500);
                    console.log('error processing the request');
                    res.end('Error processing the request');
                } else {
                    res.writeHead(200);
                    var response = {};
                    response['permission id'] = permission.id;
                    response['token'] = permission._token;
                    response['collection'] = cachedCollection._self;
                    res.end(JSON.stringify(response));
                }
            });
        });
    });
}).listen(8080);
