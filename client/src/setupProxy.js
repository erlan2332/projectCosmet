const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:5001', // Укажите адрес вашего сервера
            changeOrigin: true,
        })
    );
};
