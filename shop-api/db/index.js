// let config = require("../config")
// let MongoClient = require('mongodb').MongoClient;
// let DB_CONN = config.db
module.exports.connect = function(MongoClient, DB_CONN, func, params) {
	MongoClient.connect(DB_CONN, function (err, db) {
		if (err) {
			console.log(err);
			return;
		}
		func(db, params)
	})
}
// collection,data,callback
module.exports.insertData = function(db, others) {
	const mydb = db.db('admin');
	let collection = mydb.collection(others.collection)
	let data = others.data
	collection.insert(data, function (err, result) {
		if (err) {
			console.log('Error:' + err);
			// others.errCallback(err, db);
			return;
		}
		others.callback(result, db);
	});
}
// collection,query,callback
module.exports.selectData = function(db, others) {
	const mydb = db.db('admin');
	let collection = mydb.collection(others.collection)
	let query = others.query
	let queryCondition = {}
	if(others.skip) {
		queryCondition.skip = others.skip
	}
	if(others.limit) {
		queryCondition.limit = others.limit
	}
	// console.log("others.count", others.count)
	if(others.count == "true") {
		collection.find(query).count(function (err, result) {
			if (err) {
			  console.log('Error:' + err);
			  return;
			}
			others.callback(result, db);
		});
	}else {
		collection.find(query, queryCondition).toArray(function (err, result) {
			if (err) {
			  console.log('Error:' + err);
			  return;
			}
			others.callback(result, db);
		});
	}
}
// collection,query,data,callback
module.exports.updateData = function(db, others) {
	const mydb = db.db('admin');
	let collection = mydb.collection(others.collection)
	let query = others.query
	let data = others.data
	collection.update(query, data, function (err, result) {
		if (err) {
			console.log('Error:' + err);
			return;
		}
		others.callback(result, db);
	});
}
// collection,query,callback
module.exports.deleteData = function(db, others) {
	const mydb = db.db('admin');
	let collection = mydb.collection(others.collection)
	let query = others.query
	collection.remove(query, function (err, result) {
		if (err) {
			console.log('Error:' + err);
			return;
		}
		others.callback(result, db);
	});
}
