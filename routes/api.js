const express = require('express');
const apiRouter = express.Router();

const jsonwebtoken = require('jsonwebtoken');
const db = require('../config/db');

const jwtkey = process.env.JWTTOKEN

const {
    hashSync,
    genSaltSync,
    compareSync
} = require("bcrypt");
const cookieParser = require('cookie-parser');

const adminrouter = require('./admin');
const userRouter = require('./user');


apiRouter.use(cookieParser());

apiRouter.post('/register', async (req, res, next) => {
    try {
        const username = req.body.username;
        const email = req.body.email;
        const phone = req.body.phone;
        let password = req.body.password;

        checkUsername = await db.getUserByUsername(username);
        checkEmail = await db.getUserByEmail(email);
        checkPhone = await db.getUserByPhone(phone);


        if (!username || !email || !password || !phone) {
            return res.sendStatus(400);
        } else if (checkUsername || checkEmail || checkPhone) {
            return res.status(400).json({
                status: "400",
                message: "Username/email/phone has been taken"
            })
        }

        const salt = genSaltSync(10);
        password = hashSync(password, salt);

        //const user = await db.insertUser(username, email, password, phone);
        await db.insertUser(username, email, password, phone);

        res.status(200).json({
            status: "200",
            message: "User created"
        });

        //return res.redirect('/mainpage');

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

apiRouter.post('/login', async (req, res, next) => {
    try {


        const phone = req.body.phone;
        const password = req.body.password;
        user = await db.getUserByPhone(phone);

        if (!user) {
            return res.status(401).json({
                status: "401",
                message: "Invalid phone number or password"
            })
        }

        const isValidPassword = compareSync(password, user.password);
        if (isValidPassword) {
            user.password = undefined;
            const jsontoken = jsonwebtoken.sign({
                user: user
            }, jwtkey, {
                expiresIn: '30m'
            });

            res.status(200).json({
                status: "200",
                token: jsontoken
            });

        } else {
            return res.status(401).json({
                status: "401",
                message: "Invalid phone number or password"
            });
        }

    } catch (e) {
        console.log(e);
    }
});

apiRouter.get('/product', async (req, res, next) => {
    try {

        product = await db.listAllProduct()

        res.status(200).json({
            status: "200",
            product: product
        });

    } catch (e) {
        console.log(e);
    }
});

apiRouter.get('/search', async (req, res, next) => {
    try {
        let namee = req.body.booktitle
        let authorr = req.body.author
        const name = namee.toLowerCase()
        const author = authorr.toLowerCase()

        if (!name && !author) {
            res.status(400).json({
                status: "400",
                message: "Fill book title/author first!"
            });
        }
        else if (!author) {
            const product = await db.listProductbyName(name);

            res.status(200).json({
                status: "200",
                product: product
            });
        }
        else if (!name) {
            const product = await db.listProductbyAuthor(author);

            res.status(200).json({
                status: "200",
                product: product
            });
        }
        else {
            const product = await db.listProductbynameandauthor(name, author);

            res.status(200).json({
                status: "200",
                product: product
            });
        }

    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

//  Verify Token
async function verifyTokenAdmin(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === undefined) {

        return res.status(401).json({
            status: "401",
            message: "Access Denied! Unauthorized User"
        });
    } else {

        jsonwebtoken.verify(token, jwtkey, (err, authData) => {
            if (err) {
                res.status(401).json({
                    status: "401",
                    message: "Invalid Token..."
                });

            } else {

                const role = authData.user.role;
                if (role === "admin") {
                    next();
                } else {
                    return res.status(403).json({
                        status: "403",
                        message: "Access Denied!"
                    });

                }
            }
        })
    }
}

async function verifyToken(req, res, next) {

    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]

    if (token === undefined) {

        return res.status(401).json({
            status: "401",
            message: "Access Denied! Unauthorized User"
        });
    } else {

        jsonwebtoken.verify(token, jwtkey, (err, authData) => {
            if (err) {
                res.status(401).json({
                    status: "401",
                    message: "Invalid Token..."
                });

            } else {

                const role = authData.user.role;
                if (role === "user") {
                    next();
                } else {
                    return res.status(403).json({
                        status: "403",
                        message: "Access Denied!"
                    });

                }
            }
        })
    }
}

apiRouter.use('/admin', verifyTokenAdmin, adminrouter);

apiRouter.use('/user', verifyToken, userRouter);


module.exports = apiRouter;