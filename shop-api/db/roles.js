let config = require("../config")
let MongoClient = require('mongodb').MongoClient;
let DB_CONN = config.db
let { connect, selectData } = require("./index")
module.exports.getRolesInfo = function() {
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, selectData, {
			collection: "roles",
			data: {},
			callback: function(result, db) {
				db.close()
				resolve(result)
			}
		})
	})
}
module.exports.getPermission = function(roleAlias) {
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, selectData, {
			collection: "roles",
			query: { role: roleAlias },
			callback: function(result, db) {
				db.close()
				resolve(result)
			}
		})
	})
}
