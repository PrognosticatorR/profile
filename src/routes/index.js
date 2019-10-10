'use strict'

const profileController = require('../controllers/profileController')
const profileSpec = require('./documentation/profileApi')

const routes = [
    {
        method: 'POST',
        url: '/api/profile',
        handler: profileController.addProfile,
        schema: profileSpec.addProfile
    },
    {
        method: 'PUT',
        url: '/api/profile/wallet',
        handler: profileController.updateWallet,
        schema: profileSpec.updateWallet
    },
    {
        method: 'GET',
        url: '/api/profile/:userId',
        handler: profileController.getProfile,
        schema: profileSpec.getProfile
    },
    {
        method: 'GET',
        url: '/api/profile/wallet/duplicate/:walletAddress',
        handler: profileController.isDuplicateWallet,
        schema: profileSpec.isDuplicateWallet
    }
]

module.exports = routes
