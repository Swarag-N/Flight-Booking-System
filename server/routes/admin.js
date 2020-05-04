const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const express = require('express');

const Flight = require('../models/Flight')

AdminBro.registerAdapter(AdminBroMongoose)
const adminBro = new AdminBro({
        resources: [
            {
                resource: Flight,
                options: {
                    listProperties: [
                        "from",
                        "to",
                        "time"
                    ]
                }
            },
        ],
        softwareBrothers: false,
        branding: {
            companyName: 'LenderReader'
        },
    }
);

// const router = adminBroExpress.buildRouter(adminBro);
// module.exports = router;

const adminRouter = express.Router();
const Admin = {
    email: process.env.EMAIL_OF_ADMIN || 'example@lendread.com',
    password: process.env.PASSWORD_OF_ADMIN || 'reading'
};

AdminBroExpress.buildAuthenticatedRouter(
    adminBro,
    {
        authenticate: async (email, password) => {
            if (email === Admin.email && password === Admin.password) {
                return Admin
            }
            return null
        },
        cookieName: process.env.COOKIE_ADMIN_NAME || 'LR',
        cookiePassword: process.env.COOKIE_ADMIN_PASSWORD || 'admin-bro',
    },
    adminRouter,
    {
        resave: true,
        saveUninitialized: true
    }
);
module.exports = adminRouter;