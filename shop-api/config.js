const CONF = {
	port: '3000',
	sessionConfig: {
		key: 'SESSION',
		maxAge: 1000 * 60 * 60 * 2 * 1,
		overwrite: true,
		httpOnly: true,
		signed: true,
		rolling: false,
		renew: false,
	},
	compressConfig: {
		threshold: 2048
	},
	db: 'mongodb://localhost:27017/admin',
}

module.exports = CONF