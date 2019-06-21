const CONF = {
	port: '3000',
	sessionConfig: {
		key: 'SESSION',
		maxAge: 1000 * 60 * 60 * 24 * 3,
		overwrite: true,
		httpOnly: true,
		signed: true,
		rolling: false,
		renew: false,
	},
	compressConfig: {
		threshold: 2048
	},
}

module.exports = CONF