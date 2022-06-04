const express = require('express');
const db = require('../config/db');
const userRouter = express.Router();
const apiRouter = require('./api');
const axios = require('axios').default;

const {
    hashSync,
    genSaltSync,
    compareSync
} = require("bcrypt");

userRouter.get('/profile', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const iduser = response.user.id_user;

        if (!iduser) {
            return res.sendStatus(400);
        }
        else {
            data = await db.getUserProfile(iduser)

            res.status(200).json({
                status: "200",
                data: data
            });
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.put('/profile', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const username = req.body.newusername;
        const email = req.body.newemail;
        const phone = req.body.newphone;
        let password = req.body.newpassword;
        const iduser = response.user.id_user

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
        } else {
            const salt = genSaltSync(10);
            password = hashSync(password, salt);

            await db.updateUser(username, email, password, phone, iduser);

            res.status(200).json({
                status: "200",
                message: "Profile updated"
            });
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.post('/addproduct', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const name = req.body.booktitle;
        const author = req.body.author;
        const price = req.body.price;
        const qty = req.body.stock;
        const phone = response.user.phone;

        if (!name || !author || !price || !qty) {
            res.status(400).json({
                status: "400",
                message: "Please fill in the parameters first"
            });
        }
        else {
            await db.addproduct(phone, name, author, price, qty)

            res.status(200).json({
                status: "200",
                message: "Product successfully added"
            });
        }

    } catch (e) {
        console.log(e);
    }
});

userRouter.put('/updateproduct', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const idproduct = req.body.id_product
        const newprice = req.body.newprice
        const newstock = req.body.newstock
        const phone = response.user.phone

        const checkSeller = await db.checksellerphone(idproduct)

        if (checkSeller == phone) {
            if (!idproduct) {
                res.status(400).json({
                    status: "400",
                    message: "Please fill in the ID Product first"
                });
            }
            else {
                if (!newprice && !newstock) {
                    res.status(400).json({
                        status: "400",
                        message: "Please fill in the parameters first"
                    });
                }
                else if (!newprice) {
                    await db.updateProductStock(newstock, phone, idproduct)

                    res.status(200).json({
                        status: "200",
                        message: "Your product stock has been successfully updated"
                    });
                }
                else if (!newstock) {
                    await db.updateProductPrice(newprice, phone, idproduct);

                    res.status(200).json({
                        status: "200",
                        message: "Your product price has been successfully updated"
                    });
                }
                else {
                    await db.updateProduct(newprice, newstock, phone, idproduct);

                    res.status(200).json({
                        status: "200",
                        message: "Your product has been successfully updated"
                    });
                }
            }

        } else {
            res.status(400).json({
                status: "400",
                message: "You are not a seller of this product"
            });
        }
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});

userRouter.delete('/product', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const phone = response.user.phone
        const idproduct = req.body.id_product

        if (!idproduct) {
            res.status(400).json({
                status: "400",
                message: "Please fill in the parameters first"
            });
        }
        else {
            const check = await db.getSellerPhone2(idproduct)

            if (phone == check) {
                await db.deleteProduct(idproduct)
                res.status(200).json({
                    status: "200",
                    message: "Product deleted"
                });
            }
            else {
                res.status(400).json({
                    status: "400",
                    message: "You're not a seller of this product"
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.get('/listproduct', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const phone = response.user.phone

        const product = await db.listUserProduct(phone)

        res.status(200).json({
            status: "200",
            product: product
        });

    } catch (e) {
        console.log(e);
    }
});

userRouter.post('/order', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const idproduct = req.body.idproduct
        const qty = req.body.quantity
        const phone = response.user.phone

        const stock = await db.checkStock(idproduct)
        const booktitle = await db.getBookTitle(idproduct)
        const price = await db.getProductPrice(idproduct)
        const total = qty * price

        const sellerphone = await db.checksellerphone(idproduct)

        if (!idproduct || !qty) {
            res.status(400).json({
                status: "400",
                message: "Please fill in the parameters first"
            });
        }
        else {
            if (sellerphone == phone) {
                res.status(400).json({
                    status: "400",
                    message: "You can't buy your own product"
                });
            }
            else {
                if (qty > stock) {
                    res.status(400).json({
                        status: "400",
                        message: "Your order exceeds the available product stock"
                    });
                }
                else {


                    await db.addorder(idproduct, booktitle, qty, total, phone, sellerphone, "Waiting for payment", "Pending")
                    await db.deductstok(idproduct, qty)

                    res.status(200).json({
                        status: "200",
                        message: "Order added successfully, please make a payment"
                    });
                }
            }
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.get('/order', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const phone = response.user.phone
        const order = await db.getAllOrder(phone)

        res.status(200).json({
            status: "200",
            order: order
        });
    } catch (e) {
        console.log(e);
    }
});

userRouter.get('/myorder', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const phone = response.user.phone

        const order = await db.getUserOrder(phone)

        res.status(200).json({
            status: "200",
            your_order: order
        });
    } catch (e) {
        console.log(e);
    }
});

userRouter.get('/incomingorder', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const phone = response.user.phone

        const order = await db.getSellerOrder(phone)

        res.status(200).json({
            status: "200",
            incoming_order: order
        });
    } catch (e) {
        console.log(e);
    }
});

userRouter.post('/payment', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const phonePenampung = "085851873052"

        const idorder = req.body.id_order
        const emoney = req.body.emoney
        const username = req.body.username_emoney
        const telp = req.body.phone_emoney
        const password = req.body.password_emoney
        const email = req.body.email_emoney

        const phone = response.user.phone
        const validphone = await db.getCustomerPhone(idorder)
        const status = await db.getStatusOrder(idorder)

        if (!idorder || !emoney || !username || !telp || !password || !email) {
            res.status(400).json({
                status: "400",
                message: "Please fill in the parameters first"
            });
        }
        else {
            if (phone == validphone) {
                if (status == "Waiting for payment") {
                    const totalPrice = await db.getTotalPrice(idorder)

                    // ========================> MoneyZ <==========================
                    if (emoney == "MoneyZ") {
                        const resp = await axios
                            .post("https://moneyz-kelompok6.herokuapp.com/api/login", {
                                phone: telp,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data.token;

                        await axios
                            .post(
                                "https://moneyz-kelompok6.herokuapp.com/api/user/transfer", {
                                nomortujuan: phonePenampung,
                                nominal: totalPrice,
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data; // => the response payload
                                if (response.data.status == 200) {
                                    db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                    return res.status(200).json({
                                        status: "200",
                                        message: "Payment success"
                                    });
                                }// => the response payload
                                else {
                                    return res.send(hasil).status(400);
                                }

                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                    }
                    // ========================> MoneyZ END HERE<==========================

                    // ========================> BuskiCoins <==========================
                    else if (emoney == "BuskiCoins") {
                        var formData = new URLSearchParams();
                        formData.append("username", username);
                        formData.append("password", password);
                        var resp = await axios
                            .post(
                                "https://arielaliski.xyz/e-money-kelompok-2/public/buskidicoin/publics/login",
                                formData
                            )
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        var tokentransfer = resp.data.message.token;

                        var formData = new URLSearchParams();
                        formData.append("nomer_hp", telp);
                        formData.append("nomer_hp_tujuan", phonePenampung);
                        formData.append("e_money_tujuan", "MoneyZ");
                        formData.append("amount", totalPrice);
                        await axios
                            .post(
                                "https://arielaliski.xyz/e-money-kelompok-2/public/buskidicoin/admin/transfer",
                                formData, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data; // => the response payload
                                if (response.data.status == 201) {
                                    db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                    return res.status(200).json({
                                        status: "200",
                                        message: "Payment success"
                                    });

                                }// => the response payload
                                else {
                                    return res.send(hasil).status(400);
                                }
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                    }
                    // ========================> BuskiCoins END HERE<==========================

                    // ========================> PeacePay <==========================
                    if (emoney == "PeacePay") {
                        const resp = await axios
                            .post("https://e-money-kelompok-12.herokuapp.com/api/login", {
                                number: telp,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data.token;

                        await axios
                            .post(
                                "https://e-money-kelompok-12.herokuapp.com/api/moneyz", {
                                tujuan: phonePenampung,
                                amount: totalPrice,
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data; // => the response payload
                                if (response.data.status == 200) {
                                    db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                    return res.status(200).json({
                                        status: "200",
                                        message: "Payment success"
                                    });
                                }// => the response payload
                                else {
                                    return res.send(hasil).status(400);
                                }

                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                    }
                    // ========================> PeacePay END HERE<==========================

                    // ========================> Payfresh <==========================
                    else if (emoney == "PayFresh") {
                        const resp = await axios
                            .post("https://payfresh.herokuapp.com/api/login", {
                                email: email,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data.token;

                        await axios
                            .post(
                                "https://payfresh.herokuapp.com/api/user/moneyz", {
                                nomortujuan: phonePenampung,
                                nominal: totalPrice,
                                id: ""
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data;// => the response payload
                                db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                return res.status(200).json({
                                    status: "200",
                                    message: "Payment success"
                                });
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });

                    }
                    //========================> Payfresh END HERE <==========================

                    //========================> CuanIND END HERE <==========================
                    else if (emoney == "CuanIND") {
                        const resp = await axios
                            .post("https://e-money-kelompok5.herokuapp.com/cuanind/user/login", {
                                notelp: telp,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data;

                        await axios
                            .post(
                                "https://e-money-kelompok5.herokuapp.com/cuanind/transfer/moneyz", {
                                target: phonePenampung,
                                amount: totalPrice,
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data; // => the response payload
                                db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                return res.status(200).json({
                                    status: "200",
                                    message: "Payment success"
                                });
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                    }
                    //========================> CuanIND END HERE <==========================

                    //========================> Gallecoins END HERE <==========================
                    else if (emoney == "Gallecoins") {
                        const resp = await axios
                            .post("https://gallecoins.herokuapp.com/api/users", {
                                username: username,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data.token;
                        console.log(tokentransfer)

                        await axios
                            .post(
                                "https://gallecoins.herokuapp.com/api/transfer/moneyz", {
                                amount: totalPrice,
                                description: "BaBoo Payment",
                                phone_target: phonePenampung,
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data;
                                if (response.data.status == 1) {
                                    db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                    return res.status(200).json({
                                        status: "200",
                                        message: "Payment success"
                                    });
                                }// => the response payload
                                else {
                                    return res.send(hasil).status(400);
                                }

                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });

                    }
                    //========================> Gallecoins END HERE <==========================

                    // ========================> PayPhone <==========================
                    else if (emoney == "PayPhone") {
                        var formData = new URLSearchParams();
                        formData.append("telepon", telp);
                        formData.append("password", password);
                        var resp = await axios
                            .post(
                                "http://fp-payphone.herokuapp.com/public/api/login",
                                formData
                            )
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        var tokentransfer = resp.data.token;

                        var formData = new URLSearchParams();
                        formData.append("telepon", phonePenampung);
                        formData.append("jumlah", totalPrice);
                        formData.append("emoney", "moneyz");
                        await axios
                            .post(
                                "http://fp-payphone.herokuapp.com/public/api/transfer",
                                formData, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data;
                                // => the response payload
                                if (response.data.status == "200") {
                                    db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                    return res.status(200).json({
                                        status: "200",
                                        message: "Payment success"
                                    });
                                }
                                else {
                                    return res.status(400).send(hasil)
                                }
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                    }
                    //========================> PayPhone END HERE <======================

                    // ========================> KCN Pay <==========================
                    else if (emoney == "KCN Pay") {
                        const resp = await axios
                            .post("https://kecana.herokuapp.com/login", {
                                email: email,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data

                        const resp2 = await axios
                            .get(
                                "https://kecana.herokuapp.com/me", {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const iduser = resp2.data.id


                        await axios
                            .patch(
                                "https://kecana.herokuapp.com/transferemoneylain", {
                                id: iduser,
                                nohp: phonePenampung,
                                nominaltransfer: totalPrice,
                                emoneytujuan: "MoneyZ"
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data; // => the response payload
                                db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                return res.status(200).json({
                                    status: "200",
                                    message: "Payment success"
                                });
                                console.log(hasil)
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });

                    }
                    //========================> KCN Pay END HERE <======================

                    // ========================> ECoin <==========================
                    else if (emoney == "ECoin") {
                        const resp = await axios
                            .post("https://ecoin10.my.id/api/masuk", {
                                phone: telp,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data.token;
                        //console.log(resp)

                        await axios
                            .post(
                                "http://ecoin10.my.id/api/transfer", {
                                amount: totalPrice,
                                dest_emoney: "MoneyZ",
                                phone2: phonePenampung,
                                description: "BaBoo Payment",
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data; // => the response payload
                                if (response.data.message == "Transfer success") {
                                    db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                    return res.status(200).json({
                                        status: "200",
                                        message: "Payment success"
                                    });
                                }// => the response payload
                                else {
                                    return res.send(hasil).status(400);
                                }
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                    }
                    //========================> ECoin END HERE <==========================

                    // ========================> PadPay <==========================
                    else if (emoney == "PadPay") {
                        const resp = await axios
                            .post("https://mypadpay.xyz/padpay/api/login.php", {
                                email: email,
                                password: password,
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                        const tokentransfer = resp.data.Data.jwt;

                        await axios
                            .put(
                                "https://mypadpay.xyz/padpay/api/coin/moneyz.php", {
                                email: email,
                                password: password,
                                jwt: tokentransfer,
                                tujuan: phonePenampung,
                                jumlah: totalPrice
                            }, {
                                headers: {
                                    Authorization: "Bearer " + tokentransfer,
                                },
                            }
                            )
                            .then((response) => {
                                const hasil = response.data; // => the response payload
                                db.updateStatusOrder(idorder, "Paid", "Waiting for shipment")
                                return res.status(200).json({
                                    status: "200",
                                    message: "Payment success"
                                });
                                return res.send(hasil);
                            })
                            .catch((error) => {
                                if (error.response) {
                                    const err = error.response.data; // => the response payload
                                    return res.send(err);
                                }
                            });
                    }
                    //========================> PadPay END HERE <==========================
                    else {
                        return res.status(400).json({
                            message: "Emoney Tidak tersedia, Coba ulang dengan nama Emoney yang benar (case sensitive)",
                            daftarEmoney: [
                                "Buski Coins",
                                "KCN Pay",
                                "Gallecoins",
                                "CuanIND",
                                "Payfresh",
                                "PadPay",
                                "PayPhone",
                                "ECoin",
                                "Talangin",
                                "PeacePay",
                            ],
                        });
                    }

                } else {
                    return res.status(400).json({
                        status: "400",
                        message: "This order has been paid"
                    });
                }
            }
            else {
                return res.status(400).json({
                    status: "400",
                    message: "You're not a customer of this order"
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.post('/send', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const id_order = req.body.id_order

        const seller_phone = await db.getSellerPhone(id_order)
        const phone = response.user.phone
        const status = await db.getStatusOrder2(id_order)
        console.log(status)

        if (phone == seller_phone) {
            if (status == "Waiting for shipment") {
                await db.updateStatusOrder(id_order, "In delivery", "In delivery")
                res.status(200).json({
                    status: "200",
                    message: "Successfully sent this order"
                });
            }
            else {
                res.status(400).json({
                    status: "400",
                    message: "This order is not in waiting for shipment status"
                });
            }
        }
        else {
            res.status(400).json({
                status: "400",
                message: "You're not a seller of this order"
            });
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.post('/send', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const id_order = req.body.id_order

        if (!idorder) {
            res.status(400).json({
                status: "400",
                message: "Please fill in the parameters first"
            });
        }
        else {
            const seller_phone = await db.getSellerPhone(id_order)
            const phone = response.user.phone
            const status = await db.getStatusOrder2(id_order)

            if (phone == seller_phone) {
                if (status == "Waiting for shipment") {
                    await db.updateStatusOrder(id_order, "In delivery", "In delivery")
                    res.status(200).json({
                        status: "200",
                        message: "Successfully sent this order"
                    });
                }
                else {
                    res.status(400).json({
                        status: "400",
                        message: "This order is not in waiting for shipment status"
                    });
                }
            }
            else {
                res.status(400).json({
                    status: "400",
                    message: "You're not a seller of this order"
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.post('/confirm', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const id_order = req.body.id_order

        if (!id_order) {
            res.status(400).json({
                status: "400",
                message: "Please fill in the parameters first"
            });
        }
        else {
            const cust_phone = await db.getCustomerPhone(id_order)
            const phone = response.user.phone
            const status = await db.getStatusOrder(id_order)
            const totalPrice = await db.getTotalPrice(id_order)
            const seller_phone = await db.getSellerPhone(id_order)

            if (phone == cust_phone) {
                if (status == "In delivery") {
                    await db.updateStatusOrder(id_order, "Received", "Confirmed by customer")
                    db.addIncome(seller_phone, totalPrice)
                    db.addIncome2(seller_phone, totalPrice)
                    res.status(200).json({
                        status: "200",
                        message: "Order received successfully"
                    });
                }
                else {
                    res.status(400).json({
                        status: "400",
                        message: "This order is not in delivery status"
                    });
                }
            }
            else {
                res.status(400).json({
                    status: "400",
                    message: "You're not a customer of this order"
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});

userRouter.post('/withdraw', async (req, res, next) => {
    try {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]

        const payload = token.split('.')[1]
        const decoded = Buffer.from(payload, 'base64').toString()
        var response = JSON.parse(decoded)

        const phonePenampung = "085851873052"
        const passwordPenampung = "baboo123"

        const amount = req.body.amount
        const emoney = req.body.emoney
        const telp = req.body.phone_emoney
        console.log(amount)

        if (!amount || !emoney || !telp) {
            res.status(400).json({
                status: "400",
                message: "Please fill in the parameters first"
            });
        }
        else {
            const iduser = response.user.id_user
            income = await db.checkIncome(iduser)
            console.log(income)

            if (amount <= income) {
                // ========================> MoneyZ <==========================
                if (emoney == "MoneyZ") {
                    const resp = await axios
                        .post("https://moneyz-kelompok6.herokuapp.com/api/login", {
                            phone: phonePenampung,
                            password: passwordPenampung,
                        })
                        .catch((error) => {
                            if (error.response) {
                                const err = error.response.data; // => the response payload
                                return res.send(err);
                            }
                        });
                    const tokentransfer = resp.data.token;

                    await axios
                        .post(
                            "https://moneyz-kelompok6.herokuapp.com/api/user/transfer", {
                            nomortujuan: telp,
                            nominal: amount,
                        }, {
                            headers: {
                                Authorization: "Bearer " + tokentransfer,
                            },
                        }
                        )
                        .then((response) => {
                            const hasil = response.data; // => the response payload
                            if (response.data.status == 200) {
                                db.deductIncome(iduser, amount)
                                return res.status(200).json({
                                    status: "200",
                                    message: "Withdraw success"
                                });
                            }// => the response payload
                            else {
                                return res.send(hasil).status(400);
                            }

                        })
                        .catch((error) => {
                            if (error.response) {
                                const err = error.response.data; // => the response payload
                                return res.send(err);
                            }
                        });
                }
                // ========================> MoneyZ END HERE<==========================
                else if (emoney == "Buski Coins" || emoney == "KCN Pay" || emoney == "Gallecoins" || emoney == "CuanIND" || emoney == "Payfresh" || emoney == "PadPay" || emoney == "PayPhone" || emoney == "ECoin" || emoney == "Talangin" || emoney == "PeacePay") {
                    const resp = await axios
                        .post("https://moneyz-kelompok6.herokuapp.com/api/login", {
                            phone: phonePenampung,
                            password: passwordPenampung,
                        })
                        .catch((error) => {
                            if (error.response) {
                                const err = error.response.data; // => the response payload
                                return res.send(err);
                            }
                        });
                    const tokentransfer = resp.data.token;

                    await axios
                        .post(
                            "https://moneyz-kelompok6.herokuapp.com/api/user/transferTo", {
                            tujuan: telp,
                            amount: amount,
                            emoney: emoney
                        }, {
                            headers: {
                                Authorization: "Bearer " + tokentransfer,
                            },
                        }
                        )
                        .then((response) => {
                            const hasil = response.data; // => the response payload
                            if (response.data.status == 200) {
                                db.deductIncome(iduser, amount)
                                return res.status(200).json({
                                    status: "200",
                                    message: "Withdraw success"
                                });
                            }// => the response payload
                            else {
                                return res.send(hasil).status(400);
                            }

                        })
                        .catch((error) => {
                            if (error.response) {
                                const err = error.response.data; // => the response payload
                                return res.send(err);
                            }
                        });
                }
                else {
                    return res.status(400).json({
                        message: "Emoney Tidak tersedia, Coba ulang dengan nama Emoney yang benar (case sensitive)",
                        daftarEmoney: [
                            "Buski Coins",
                            "KCN Pay",
                            "Gallecoins",
                            "CuanIND",
                            "Payfresh",
                            "PadPay",
                            "PayPhone",
                            "ECoin",
                            "Talangin",
                            "PeacePay",
                        ],
                    });
                }
            } else {
                res.status(400).json({
                    status: "400",
                    message: "Your amount exceeds the remain income"
                });
            }
        }
    } catch (e) {
        console.log(e);
    }
});

module.exports = userRouter;