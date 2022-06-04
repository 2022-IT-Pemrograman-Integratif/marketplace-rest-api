const { reject } = require('bcrypt/promises');
const mysql = require('mysql');



const pool = mysql.createPool({
    connectionLimit: "10", // the number of connections node.js will hold open to our database
    password: "",
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT

});


let db = {};

// ***Requests to the User table ***

db.allUser = (role) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE role = ?', [role], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users);
        });
    });
};

db.oneUser = (iduser) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE id_user = ?', [iduser], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users);
        });
    });
};


db.getUserByUsername = (username) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE username = ?', [username], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};

db.getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE email = ?', [email], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};

db.getUserByPhone = (phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM users WHERE phone = ?', [phone], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users[0]);
        });
    });
};

db.insertUser = (username, email, password, phone) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO users (username, email, password, phone) VALUES (?, ?, ?, ?)', [username, email, password, phone], (error, result) => {
            if (error) {
                return reject(error);
            }

            return resolve(result.insertId);
        });
    });
};


db.updateUser = (username, email, password, phone, id_user) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET username = ?, email= ?, password=?, phone=? WHERE id_user = ?', [username, email, password, phone, id_user], (error) => {
            if (error) {
                return reject(error);
            }

            return resolve();
        });
    });
};

db.deleteUser = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM users WHERE id_user = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.deleteProduct = (id) => {
    return new Promise((resolve, reject) => {
        pool.query('DELETE FROM product WHERE id_product = ?', [id], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.updateHistory = (type, nominal, phone_sender, phone_receiver, emoney) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO history (type, amount, phone_sender, phone_receiver, emoney) VALUES (?, ?, ?, ?, ?)', [type, nominal, phone_sender, phone_receiver, emoney], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.getHistory = (phone, admin) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT type, phone_receiver, emoney, amount, timestamp FROM history WHERE phone_receiver = ? OR phone_sender = ? ', [phone, phone], (error, history) => {
            if (error) {
                return reject(error);
            }
            return resolve(history);
        });
    });
};

db.listAllProduct = () => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM product', (error, product) => {
            if (error) {
                return reject(error);
            }
            return resolve(product);
        });
    });
};

db.listUserProduct = (phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM product WHERE seller_phone = ?', [phone], (error, product) => {
            if (error) {
                return reject(error);
            }
            return resolve(product);
        });
    });
};

db.listProductbyName = (name) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM product WHERE LOWER(book_title) = ?', [name], (error, product) => {
            if (error) {
                return reject(error);
            }
            return resolve(product);
        });
    });
};

db.listProductbyAuthor = (author) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM product WHERE LOWER(author) = ?', [author], (error, product) => {
            if (error) {
                return reject(error);
            }
            return resolve(product);
        });
    });
};

db.listProductbynameandauthor = (name, author) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM product WHERE LOWER(author) = ? AND LOWER(book_title) = ?', [author, name], (error, product) => {
            if (error) {
                return reject(error);
            }
            return resolve(product);
        });
    });
};

db.addproduct = (phone, name, author, price, qty) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO product (seller_phone, book_title, author, product_price, product_stock) VALUES (?, ?, ?, ?, ?)', [phone, name, author, price, qty], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.deductstok = (idproduct, qty) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE product SET product_stock = product_stock - ? WHERE id_product = ?', [qty, idproduct], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.checkStock = (idproduct) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT product_stock FROM product WHERE id_product = ?', [idproduct], (error, product_stock) => {
            if (error) {
                return reject(error);
            }
            return resolve(product_stock[0].product_stock)
        });
    });
};

db.checkPrice = (idproduct) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT product_price FROM product WHERE id_product = ?', [idproduct], (error, product_price) => {
            if (error) {
                return reject(error);
            }
            return resolve(product_price[0].product_price)
        });
    });
};

db.updateProductStock = (newstock, phone, id_product) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE product SET product_stock = ? WHERE seller_phone = ? AND id_product = ?', [newstock, phone, id_product], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.updateProductPrice = (newprice, phone, id_product) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE product SET product_price = ? WHERE seller_phone = ? AND id_product = ?', [newprice, phone, id_product], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.updateProduct = (newprice, newstock, phone, id_product) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE product SET product_price = ?, product_stock = ? WHERE seller_phone = ? AND id_product = ?', [newprice, newstock, phone, id_product], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.checksellerphone = (id_product) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT seller_phone FROM product WHERE id_product = ?', [id_product], (error, seller_phone) => {
            if (error) {
                return reject(error);
            }
            return resolve(seller_phone[0].seller_phone)
        });
    });
};

db.getBookTitle = (id_product) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT book_title FROM product WHERE id_product = ?', [id_product], (error, book_title) => {
            if (error) {
                return reject(error);
            }
            return resolve(book_title[0].book_title)
        });
    });
};

db.getProductPrice = (id_product) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT product_price FROM product WHERE id_product = ?', [id_product], (error, product_price) => {
            if (error) {
                return reject(error);
            }
            return resolve(product_price[0].product_price)
        });
    });
};


db.addorder = (idproduct, book_title, qty, total, phone, sellerphone, status, status2) => {
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO `order` (id_product, book_title, quantity, total_order, customer_phone, seller_phone, orderstatus_forcustomer, orderstatus_forseller) VALUES (?, ?, ?, ?, ?, ?, ?, ?) ', [idproduct, book_title, qty, total, phone, sellerphone, status, status2], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve()
        });
    });
};

db.getUserOrder = (phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id_order, book_title, quantity, total_order, seller_phone, orderstatus_forcustomer AS status FROM `order` WHERE customer_phone = ?', [phone], (error, order) => {
            if (error) {
                return reject(error);
            }
            return resolve(order)
        });
    });
};

db.getAllOrder = (phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM `order` WHERE customer_phone = ? OR seller_phone = ?', [phone, phone], (error, order) => {
            if (error) {
                return reject(error);
            }
            return resolve(order)
        });
    });
};

db.getSellerOrder = (phone) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id_order, book_title, quantity, total_order, customer_phone, orderstatus_forseller AS status FROM `order` WHERE seller_phone = ?', [phone], (error, order) => {
            if (error) {
                return reject(error);
            }
            return resolve(order)
        });
    });
};

db.updateStatusOrder = (idorder, stts1, stts2) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE `order` SET orderstatus_forcustomer = ?, orderstatus_forseller = ? WHERE id_order = ?', [stts1, stts2, idorder], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.getTotalPrice = (id_order) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT total_order FROM `order` WHERE id_order = ?', [id_order], (error, total_order) => {
            if (error) {
                return reject(error);
            }
            return resolve(total_order[0].total_order)
        });
    });
};

db.getCustomerPhone = (id_order) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT customer_phone FROM `order` WHERE id_order = ?', [id_order], (error, customer_phone) => {
            if (error) {
                return reject(error);
            }
            return resolve(customer_phone[0].customer_phone)
        });
    });
};

db.getStatusOrder = (id_order) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT orderstatus_forcustomer FROM `order` WHERE id_order = ?', [id_order], (error, orderstatus_forcustomer) => {
            if (error) {
                return reject(error);
            }
            return resolve(orderstatus_forcustomer[0].orderstatus_forcustomer)
        });
    });
};

db.getUserProfile = (id_user) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT id_user, username, email, phone, income_total AS total_income, sisa_income FROM users WHERE id_user = ?', [id_user], (error, users) => {
            if (error) {
                return reject(error);
            }
            return resolve(users)
        });
    });
};

db.addIncome = (phone, income) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET income_total = income_total + ? WHERE phone = ?', [income, phone], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.addIncome2 = (phone, income) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET sisa_income = sisa_income + ? WHERE phone = ?', [income, phone], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve();
        });
    });
};

db.checkIncome = (id_user) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT sisa_income FROM users WHERE id_user = ?', [id_user], (error, sisa_income) => {
            if (error) {
                return reject(error);
            }
            return resolve(sisa_income[0].sisa_income)
        });
    });
};

db.deductIncome = (id_user, amount) => {
    return new Promise((resolve, reject) => {
        pool.query('UPDATE users SET sisa_income = sisa_income - ? WHERE id_user = ?', [amount, id_user], (error) => {
            if (error) {
                return reject(error);
            }
            return resolve()
        });
    });
};

db.getSellerPhone = (id_order) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT seller_phone FROM `order` WHERE id_order = ?', [id_order], (error, seller_phone) => {
            if (error) {
                return reject(error);
            }
            return resolve(seller_phone[0].seller_phone)
        });
    });
};

db.getSellerPhone2 = (id_product) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT seller_phone FROM product WHERE id_product = ?', [id_product], (error, seller_phone) => {
            if (error) {
                return reject(error);
            }
            return resolve(seller_phone[0].seller_phone)
        });
    });
};


db.getStatusOrder2 = (id_order) => {
    return new Promise((resolve, reject) => {
        pool.query('SELECT orderstatus_forseller FROM `order` WHERE id_order = ?', [id_order], (error, orderstatus_forseller) => {
            if (error) {
                return reject(error);
            }
            return resolve(orderstatus_forseller[0].orderstatus_forseller)
        });
    });
};

module.exports = db