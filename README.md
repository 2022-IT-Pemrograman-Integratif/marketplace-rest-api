# marketplace-kelompok-6

## Kelompok 6:  
Rachmita Annisa Aulia - 5027201032  
Afrida Rohmatin Nuriyah - 5027201037  
Shafira Khaerunnisa Latif - 5027201072  

## Nama marketplace: BaBoo

## Dokumentasi API:  

| Endpoint | Autentikasi | Deskripsi | 
| ----------- | ----------- | ----------- | 
| register | Admin dan user | API untuk membuat akun baru agar dapat login  |  
| login | Admin dan user | API untuk masuk ke akun dan dapat mengakses BaBoo |  
| getallproduct | Admin dan user | API untuk mengambil data semua produk|  
| searchproduct | Admin dan user | API untuk mencari produk |  
| getalluser | Admin | API untuk mengambil data semua user|  
| getoneuser | Admin | API untuk mengambil data satu user|  
| deleteuser | Admin | API untuk menghapus user |  
| addproduct | User | API untuk menambahkan produk yang dijual |  
| updateproduct | User | API untuk memperbarui data produk yang dijual |  
| getmyproduct | User | API untuk menampilkan produk yang dijual oleh user |  
| deleteproduct | User | API untuk menghapus produk yang dijual oleh user |  
| incomingorder | User | API untuk menampilkan pesanan atas produk yang dijual oleh user |  
| sendorder | User | API untuk mengirimkan pesanan agar diproses |  
| withdraw | User | API untuk menarik saldo dari e-money pembeli |  
| order | User | API untuk melakukan pesanan oleh user |  
| payment | User | API untuk melakukan pembayaran oleh user |  
| confirm | User | API untuk mengonfirmasi pesanan oleh user |  
| myorder | User | API untuk menampilkan rincian pesanan user |  
| getprofile | User | API untuk menampilkan profil dari user |  
| updateprofile | User | API untuk memperbarui profil dari user |  
| getallorder | User | API untuk menampilkan seluruh pesanan yang dilakukan user |  

### register
 * Method : `POST`
 * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/register
 * Autentikasi : -
 * Parameter :

| Parameter | Description | 
| ----------- | ----------- | 
| username | Berupa string dan tidak boleh sama dengan user lain |
| email | Berupa email user dengan format menggunakan @ dan belum pernah digunakan untuk register sebelumnya |
| password | Bebas berupa string atau angka dan tidak ada ketentuan |
| phone | Berupa nomor hp user dengan panjang max. 15 char dan belum pernah digunakan untuk register sebelumnnya |

### login
* Method : `POST`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/login
* Autentikasi : -
* Parameter :

| Parameter | Description |  
| ----------- | ----------- | 
| phone | Berupa nomor hp yang sudah terdaftar saat register |
| password | Berupa string yang sudah terdaftar saat register |

### searchproduct
* Method : `GET`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/search
* Autentikasi : -
* Parameter :

| Parameter | Description |  
| ----------- | ----------- | 
| booktitle | Bebas berupa string atau angka dan tidak ada ketentuan |
| author | Bebas berupa string atau angka dan tidak ada ketentuan |

### getallproduct
* Method : `GET`
* Alamat URL : 
* Autentikasi : -
* Parameter : -

### getalluser
* Method : `GET`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/admin
* Autentikasi : Admin
* Parameter : -

### getoneuser
* Method : `GET`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/admin/:id
* Autentikasi : Admin
* Parameter : -

### deleteuser
* Method : `DEL`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/admin/:id
* Autentikasi : Admin
* Parameter : -

### addproduct
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| booktitle | Bebas berupa string atau angka dan tidak ada ketentuan |
| author | Bebas berupa string atau angka dan tidak ada ketentuan |
| price | Berupa float |
| stock | Berupa apa |

 * Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/user/product
Parameter
```
{
    "booktitle": "dilan 2002",
    "author": "vidi jahad",
    "price": "50000",
    "stock": "3"
}
```
Respons

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/user/product
Parameter
```
{
    "booktitle": "to all the boys i hate",
    "author": "peter",
    "price": "100000",
    "stock": "2"
}
```
Respons


### updateproduct
  * Method : `PUT`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ------ |
| newprice | Berupa harga baru yang dipasang pada suatu produk dalam float |
| newstock | Berupa stok baru yang dipasang untuk suatu produk dalam integer |

* Contoh 1

`PUT` https://baboo-kelompok6.herokuapp.com/api/user/product
Parameter
```
{
    "id_product": "3",
    "newprice": "30000",
    "newstock": "5"
}
```
Respons

* Contoh 2

`PUT` https://baboo-kelompok6.herokuapp.com/api/user/product
Parameter
```
{
    "id_product": "4",
    "newprice": "10000",
    "newstock": "1"
}
```
Respons

### getmyproduct
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter : -

* Contoh 1

`GET` https://baboo-kelompok6.herokuapp.com/api/user/product
Respons
  
### deleteproduct
  * Method : `DELETE`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |

### incomingorder
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/incomingorder
  * Autentikasi : User
  * Parameter : -

### sendorder
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/send
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |

### withdraw
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/withdraw
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| amount | Berupa angka dalam float yang akan ditarik untuk proses pembayaran |
| emoney | Berupa nama emoney yang digunakan |
| phone_emoney | Berupa nomor hp dari akun emoney yang digunakan |

### order
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/order
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| idproduct | Berupa integer sebagai identifikasi produk |
| quantity | Berupa integer untuk menjelaskan jumlah suatu produk |

### payment
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/payment
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |
| emoney | Berupa nama emoney yang digunakan |
| username_emoney | Berupa nama user pada akun emoney yang digunakan |
| phone_emoney | Berupa nomor hp dari akun emoney yang digunakan |
| password_emoney | Berupa password pada akun emoney yang digunakan |
| email_emoney | Berupa email pada akun emoney yang digunakan |

### confirmorder
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/confirm
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |

### myorder
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/myorder
  * Autentikasi : User
  * Parameter : -

### getprofile
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/profile
  * Autentikasi : User
  * Parameter : -

### updateprofile
  * Method : `PUT`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/profile
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| newusername | Berupa nama baru pada profil yang ingin diperbarui |
| newemail | Berupa email baru pada profil yang ingin diperbarui |
| newphone | Berupa nomor hp baru pada profil yang ingin diperbarui |
| newpassword | Berupa password baru pada profil yang ingin diperbarui |

### getallorder
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/order
  * Autentikasi : User
  * Parameter : -


