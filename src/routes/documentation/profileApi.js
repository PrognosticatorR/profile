const joi = require('joi')
const convert = require('joi-to-json-schema')
const { ProfileSchema } = require('payload-validator')

const profileValidationSchema = joi.object(ProfileSchema)
const createprofileSchema = convert(profileValidationSchema)

const accessCodeSpec = joi.object({
    userId: joi
        .string()
        .min(3)
        .required()
        .description('User ID'),
    wallet: joi
        .string()
        .regex(/^0x[a-fA-F0-9]{40}$/)
        .required()
        .description('Wallet address')
})
const walletSpecSchema = convert(accessCodeSpec)

exports.addProfile = {
    description: 'Add a profile to database',
    tags: ['Profile'],
    consumes: ['application/x-www-form-urlencoded', 'application/json'],
    summary: 'Add a profile to database',
    body: createprofileSchema,
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                userId: { type: 'string' },
                _id: { type: 'string' },
                sessionKey: { type: 'string' },
                expiryTime: { type: 'string' }
            }
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
}

exports.getProfile = {
    description: 'Retreive a profile using profileId',
    tags: ['Profile'],
    summary: 'Retreive a profile',
    params: {
        type: 'object',
        in: 'path',
        properties: {
            userId: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                valid: { type: 'boolean' }
            }
        },
        400: {
            description: 'No such user found',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
}

exports.updateWallet = {
    description: 'Update users wallet to the profile',
    tags: ['Profile', 'Wallet'],
    summary: 'Update user wallet',
    body: walletSpecSchema,
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                valid: { type: 'boolean' }
            }
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
}

exports.isDuplicateWallet = {
    description: 'Check for duplicate wallets',
    tags: ['Profile', 'Wallet'],
    summary: 'Check for duplicate wallets',
    params: {
        type: 'object',
        in: 'path',
        properties: {
            walletAddress: { type: 'string' }
        }
    },
    response: {
        200: {
            description: 'Successful response',
            type: 'object',
            properties: {
                message: { type: 'string' }
            }
        },
        400: {
            description: 'Wallet already in database',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        },
        500: {
            description: 'Internal Server Error',
            type: 'object',
            properties: {
                statusCode: { type: 'number' },
                error: { type: 'string' },
                message: { type: 'string' }
            }
        }
    }
}
