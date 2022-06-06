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

 * Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/register


Parameter
```
{
    "username": "hecani",
    "password": "hecani",
    "email": "hecani@gmail.com",
    "phone": "081289034450"
}
```
Respons

![register1](https://user-images.githubusercontent.com/76768695/172153763-da412510-497d-4560-b034-3db272b97ef1.PNG)

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/register


Parameter
```
{
    "username": "hecani",
    "password": "hecani",
    "email": "hecani@gmail.com",
    "phone": "081289034450"
}
```
Respons

![register2](https://user-images.githubusercontent.com/76768695/172153765-a09807e4-f8a1-4c78-8772-6e40be96e9b3.PNG)

### login
* Method : `POST`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/login
* Autentikasi : -
* Parameter :

| Parameter | Description |  
| ----------- | ----------- | 
| phone | Berupa nomor hp yang sudah terdaftar saat register |
| password | Berupa string yang sudah terdaftar saat register |

 * Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/login


Parameter
```
{
    "phone": "081289034450",
    "password": "hecani"
}
```
Respons

![login1](https://user-images.githubusercontent.com/76768695/172153759-b7453898-293a-40fe-bfdb-6856b03878ed.PNG)

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/login


Parameter
```
{
    "phone": "081289034450",
    "password": "hecani"
}
```
Respons

![login2](https://user-images.githubusercontent.com/76768695/172153761-9bdea434-f87b-424d-b2d7-57f1b58e15b0.PNG)

### searchproduct
* Method : `GET`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/search
* Autentikasi : -
* Parameter :

| Parameter | Description |  
| ----------- | ----------- | 
| booktitle | Bebas berupa string atau angka dan tidak ada ketentuan |
| author | Bebas berupa string atau angka dan tidak ada ketentuan |

 * Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/search


Parameter
```
{
  "booktitle": "dilan 2002",
    "author": "vidi jahad"
}
```
Respons

![search1](https://user-images.githubusercontent.com/76768695/172153769-3a4d5487-bd8b-4bf6-8ffc-8b20a5beeba7.PNG)

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/search


Parameter
```
{
  "booktitle": "milea",
    "author": "vidi baik"
}
```
Respons

![search2](https://user-images.githubusercontent.com/76768695/172153771-d2d018be-f315-4374-bc5d-75c43eaafa0b.PNG)

### getallproduct
* Method : `GET`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/product
* Autentikasi : -
* Parameter : -

 * Contoh 

`GET` https://baboo-kelompok6.herokuapp.com/api/product

Respons

![getallpro1](https://user-images.githubusercontent.com/76768695/172153804-e519efac-761d-488f-9e94-8d65dcade486.PNG)

### getalluser
* Method : `GET`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/admin
* Autentikasi : Admin
* Parameter : -
 * Contoh 1

`GET` https://baboo-kelompok6.herokuapp.com/api/admin

Respons

![getalluser1](https://user-images.githubusercontent.com/76768695/172266248-bacad71a-f768-4a40-b378-5ebd9499bc24.PNG)

* Contoh 2

`GET` https://baboo-kelompok6.herokuapp.com/api/admin

Respons

![getalluser2](https://user-images.githubusercontent.com/76768695/172266251-acdcd404-a726-4182-a509-85f2cb1ef30c.PNG)

### getoneuser
* Method : `GET`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/admin/:id
* Autentikasi : Admin
* Parameter : -
 * Contoh 1

`GET` https://baboo-kelompok6.herokuapp.com/api/admin/:id

Respons

![getoneuser1](https://user-images.githubusercontent.com/76768695/172266255-3b0740cd-fc98-4fb6-86ef-cd181d4c5682.PNG)

* Contoh 2

`GET` https://baboo-kelompok6.herokuapp.com/api/admin/:id

Respons

![getoneuser2](https://user-images.githubusercontent.com/76768695/172266257-19510b96-2edb-473d-809b-7d7b309b6e66.PNG)

### deleteuser
* Method : `DEL`
* Alamat URL : https://baboo-kelompok6.herokuapp.com/api/admin/:id
* Autentikasi : Admin
* Parameter : -
* Contoh 1

`DEL` https://baboo-kelompok6.herokuapp.com/api/admin/:id

Respons

![deleteprof1](https://user-images.githubusercontent.com/76768695/172266153-df06d0e6-e3ee-43c7-b0d2-7db5dcb11929.PNG)

* Contoh 2

`DEL` https://baboo-kelompok6.herokuapp.com/api/admin/:id

Respons

![getoneuser2](https://user-images.githubusercontent.com/76768695/172266257-19510b96-2edb-473d-809b-7d7b309b6e66.PNG)

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
| stock | Berupa integer untuk mengetahui banyaknya stok |

 * Contoh 

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

![addpro1](https://user-images.githubusercontent.com/76768695/172153796-5786d434-695f-49d5-9441-3cc9e5ce97c5.PNG)

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

![updatepro1](https://user-images.githubusercontent.com/76768695/172153782-7ae75ff6-2cf2-409d-bab2-34ce6ed89330.PNG)

* Contoh 2

`PUT` https://baboo-kelompok6.herokuapp.com/api/user/product


Parameter
```
{
    "id_product": "9",
    "newprice": "30000",
    "newstock": "5"
}
```
Respons

![updatepro2](https://user-images.githubusercontent.com/76768695/172153792-a60429b7-5cc5-4ba7-8b2d-7b93fc7d3181.PNG)

### getmyproduct
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter : -

* Contoh 

`GET` https://baboo-kelompok6.herokuapp.com/api/user/product

Respons

![getmypro1](https://user-images.githubusercontent.com/76768695/172153752-037b1448-fb86-4958-bf7e-9fb4b34add36.PNG)
  
### deleteproduct
  * Method : `DELETE`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |

* Contoh 

`DEL` https://baboo-kelompok6.herokuapp.com/api/user/product


Parameter
```
{
    "id_product": "3"
}
```
Respons

![deletepro1](https://user-images.githubusercontent.com/76768695/172153800-731b7338-e41b-43c3-a1b2-177c8f850e01.PNG)

### incomingorder
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/incomingorder
  * Autentikasi : User
  * Parameter : -
  * Contoh 

`GET` https://baboo-kelompok6.herokuapp.com/api/user/incomingorder

Respons

![incoming1](https://user-images.githubusercontent.com/76768695/172262854-ee71111d-e6a8-4e52-91ed-5bed0290694e.PNG)

Respons

![incoming2](https://user-images.githubusercontent.com/76768695/172262867-e1593c2b-d65f-4a8d-aee4-21d89ee77bf1.PNG)

### sendorder
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/send
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |

* Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/user/send


Parameter
```
{
    "id_order": "4"
}
```
Respons

![sendorder1](https://user-images.githubusercontent.com/76768695/172263509-1a26fd52-b981-4ae3-8d07-0c6a097820cb.PNG)

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/user/send


Parameter
```
{
    "id_order": "4"
}
```
Respons

![sendorder3](https://user-images.githubusercontent.com/76768695/172263514-ec57b3e3-25e6-4291-9170-c10fe4229938.PNG)

* Contoh 3

`POST` https://baboo-kelompok6.herokuapp.com/api/user/send


Parameter
```
{
    "id_order": "4"
}
```
Respons

![sendorder2](https://user-images.githubusercontent.com/76768695/172263513-399be9db-8245-4f99-a593-9a5f0af8e7c7.PNG)

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

* Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/user/order


Parameter
```
{
    "id_product": "6",
    "quantity": "2"
}
```
Respons

![order1](https://user-images.githubusercontent.com/76768695/172213144-5d2315e0-d23b-441d-b800-8b260e6800ca.PNG)

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/user/order


Parameter
```
{
    "id_product": "6",
    "quantity": "2"
}
```
Respons

![order2](https://user-images.githubusercontent.com/76768695/172213789-caa91d6c-52c1-4dc2-8bdc-e54911c334e9.PNG)
a.PNG)

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

* Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/user/payment


Parameter
```
{
    "id_order": "2",
    "emoney": "payfresh",
    "username_emoney": "moneyz",
    "phone_emoney": "081547123869",
    "password_emoney": "moneyz123",
    "email_emoney": "moneyz@gmail.com"
}
```
Respons

![pay1](https://user-images.githubusercontent.com/76768695/172262150-7504b288-3a4d-4db7-adec-6bbc8039819a.PNG)

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/user/payment


Parameter
```
{
    "id_order": "2",
    "emoney": "payfresh",
    "username_emoney": "moneyz",
    "phone_emoney": "081547123869",
    "password_emoney": "moneyz123",
    "email_emoney": "moneyz@gmail.com"
}
```
Respons

![pay3](https://user-images.githubusercontent.com/76768695/172262584-740bf6a5-867f-413e-843e-dd809f0eea40.PNG)

* Contoh 3

`POST` https://baboo-kelompok6.herokuapp.com/api/user/payment


Parameter
```
{
    "id_order": "2",
    "emoney": "payfresh",
    "username_emoney": "moneyz",
    "phone_emoney": "081547123869",
    "password_emoney": "moneyz123",
    "email_emoney": "moneyz@gmail.com"
}
```
Respons

![pay2](https://user-images.githubusercontent.com/76768695/172262140-54b1142a-becd-4c75-8b15-24fbf3be2a92.PNG)

### confirmorder
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/confirm
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |

* Contoh 1

`POST` https://baboo-kelompok6.herokuapp.com/api/user/confirm


Parameter
```
{
    "id_order": "4",
}
```
Respons

![confirm1](https://user-images.githubusercontent.com/76768695/172264349-45b2b231-1734-47ff-9de0-c3606e8b6ea6.PNG)

* Contoh 2

`POST` https://baboo-kelompok6.herokuapp.com/api/user/confirm


Parameter
```
{
    "id_order": "4"
}
```
Respons

![confirm3](https://user-images.githubusercontent.com/76768695/172264355-1de57faa-6dec-4c8e-aaae-de742bca221e.PNG)

* Contoh 3

`POST` https://baboo-kelompok6.herokuapp.com/api/user/confirm


Parameter
```
{
    "id_order": "4"
}
```
Respons

![confirm2](https://user-images.githubusercontent.com/76768695/172264352-b81646d7-599b-4a15-94fa-e6f3779bd399.PNG)

### myorder
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/myorder
  * Autentikasi : User
  * Parameter : -
* Contoh 

`GET` https://baboo-kelompok6.herokuapp.com/api/user/myorder

Respons

![myorder1](https://user-images.githubusercontent.com/76768695/172263230-b93b347a-aa12-4d60-a2e5-601a06fad0bd.PNG)

Respons

![myorder2](https://user-images.githubusercontent.com/76768695/172263232-047877ac-f2cc-4e07-8a17-94b797248224.PNG)

### getprofile
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/profile
  * Autentikasi : User
  * Parameter : -
* Contoh 

`GET` https://baboo-kelompok6.herokuapp.com/api/user/profile

Respons

![getprof1](https://user-images.githubusercontent.com/76768695/172260984-2cc36ea3-cf99-425f-8806-73ab71b94234.PNG)


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

* Contoh 1

`PUT` https://baboo-kelompok6.herokuapp.com/api/user/profile


Parameter
```
{
    "newusername": "dokumentasibaru",
    "newemail": "dokumbaru@gmail.com",
    "newphone": "0812345",
    "newpassword": "baru123"
}
```
Respons

![updateprof1](https://user-images.githubusercontent.com/76768695/172260991-a849cdf6-3d1a-4068-aef9-85aa0386234b.PNG)


### getallorder
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/order
  * Autentikasi : User
  * Parameter : -
* Contoh 

`GET` https://baboo-kelompok6.herokuapp.com/api/user/order

Respons

![getallorder](https://user-images.githubusercontent.com/76768695/172266829-56499407-bcc8-4340-b740-cb33ee80dbb3.PNG)



