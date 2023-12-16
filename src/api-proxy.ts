const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (req, res) {
	const apiProxy = createProxyMiddleware({
		target: 'https://gh-fe-exercise-api-4f80a724b506.herokuapp.com',
		changeOrigin: true,
	})

	apiProxy(req, res)
}
