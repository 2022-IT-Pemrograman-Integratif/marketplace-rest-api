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
| addproduct | User | API untuk menambahkan produk yang dijual) |  
| updateproduct | User | API untuk memperbarui data produk yang dijual |  
| getmyproduct | User | API untuk menampilkan produk yang dijual oleh user |  
| deleteproduct | User | API untuk menghapus produk yang dijual oleh user |  
| incomingorder | User | API untuk menampilkan pesanan atas produk yang dijual oleh user |  
| sendorder | User | API untuk mengirimkan pesanan agar diproses |  
| withdraw | User | API untuk menarik saldo dari e-money pembeli |  
| order | User | API untuk melakukan pesanan oleh user |  
| payment | User | API untuk melakukan pembayaran oleh user) |  
| confirm | User | API untuk mengonfirmasi pesanan oleh user) |  
| myorder | User | API untuk menampilkan rincian pesanan user |  
| getprofile | User | API untuk menampilkan profil dari user |  
| updateprofile | User | API untuk memperbarui profil dari user |  
| getallorder | User | API untuk menampilkan seluruh pesanan yang dilakukan user |  

### register










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

### updateproduct
  * Method : `PUT`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ------ |
| newprice | Berupa harga baru yang dipasang pada suatu produk dalam float |
| newstock | Berupa angka yang mengisi stok dalam integer |

### getmyproduct
  * Method : `GET`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter : -
  
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
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter : -

### sendorder
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| id_order | Berupa integer sebagai identifikasi order |

### withdraw
  * Method : `POST`
  * Alamat URL : https://baboo-kelompok6.herokuapp.com/api/user/product
  * Autentikasi : User
  * Parameter :
  
| Parameter | Description | 
| ----------- | ----------- | 
| amount | Berupa angka dalam float yang akan ditarik untuk proses pembayaran |
| emoney | Berupa nama emoney yang digunakan |
| phone_emoney | Berupa nomor hp dari akun emoney yang digunakan |


