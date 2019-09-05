let config = require("../config")
let MongoClient = require('mongodb').MongoClient;
let DB_CONN = config.db
let { connect, selectData, insertData } = require("./index")
module.exports.getAllUserInfo = function(isCount) {
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, selectData, {
			collection: "user",
			query: {},
			count: isCount,
			callback: function(result, db) {
				db.close()
				resolve(result)
			}
		})
	})
}
module.exports.getUserInfo = function(data) {
	let query = {}
	if(data.id) {
		query.id = data.id
	}
	if(data.username) {
		query.username = data.username
	}
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, selectData, {
			collection: "user",
			query: query,
			callback: function(result, db) {
				db.close()
				resolve(result)
			}
		})
	})
}
module.exports.registerUser = function(data) {
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, insertData, {
			collection: "user",
			data: data,
			callback: function(result, db) {
				db.close()
				resolve(result)
			},
			errCallback: function(err, db) {
				db.close()
				reject(err)
			}
		})
	})
}
