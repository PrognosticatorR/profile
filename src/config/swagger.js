const Package = require('../../package.json')
require('dotenv').config()

exports.options = {
    routePrefix: '/docs',
    exposeRoute: true,
    swagger: {
        info: {
            title: Package.name,
            description: Package.description,
            version: Package.version
        },
        host: `${process.env.SWAGGER_IP || process.env.HOST}:${process.env
            .PORT || '3000'}`,
        schemes: ['http'],
        consumes: ['application/x-www-form-urlencoded', 'application/json'],
        produces: ['application/json']
    }
}
