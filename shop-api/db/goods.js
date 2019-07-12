let config = require("../config")
let MongoClient = require('mongodb').MongoClient;
let DB_CONN = config.db
let { connect, selectData } = require("./index")
module.exports.getGoodsInfo = function() {
	return new Promise(function(resolve, reject) {
		connect(MongoClient, DB_CONN, selectData, {
			collection: "goods",
			data: {},
			callback: function(result, db) {
				db.close()
				resolve(result)
			}
		})
	})
}