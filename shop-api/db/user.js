let config = require("../config")
let MongoClient = require('mongodb').MongoClient;
let DB_CONN = config.db
let { connect, selectData } = require("./index")
module.exports.getAllUserInfo = function() {
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, selectData, {
			collection: "user",
			data: {},
			callback: function(result, db) {
				db.close()
				resolve(result)
			}
		})
	})
}
module.exports.getUserInfo = function(id) {
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, selectData, {
			collection: "user",
			query: {"id": id},
			callback: function(result, db) {
				db.close()
				resolve(result)
			}
		})
	})
}
