# 3D Articulated Model App
>Implementasi WebGL dalam bentuk program 3D untuk memanipulasi _articulated model_ <br>
>Tugas Besar III IF3260 Grafika Komputer Sem. 2 2022/2023

## Requirements
1. _Web browser_ favorit Anda
2. **[RECOMMENDED]** _Extension_ **_Live Server_** pada _Visual Studio Code_

## Cara Menjalankan
_Fork_ repository ini ke komputer Anda terlebih dahulu. Ada 3 cara untuk menjalankan aplikasi:
1. **Membuka file index.html**
2. **Menggunakan Visual Studio Code**

### Membuka `index.html`
1. Pastikan _repository_ ini sudah di-fork
2. Buka direktori `src`, lalu buka file `index.html` pada _browser_ Anda

### Menggunakan Visual Studio Code
1. Pastikan _extension_ **_Live Server_** sudah terpasang
> Klik menu '_Extensions_' > cari **_Live Server_** > klik _Install_
2. Buka dokumen `index.html` dari _Visual Studio Code_
3. Klik kanan, lalu pilih opsi '**_Open with Live Server_**
4. Akan muncul _link_ menuju aplikasi (biasanya akan di-_redirect_ atau Anda dapat membuka langsung _link tersebut_)

## Cara Menggunakan Aplikasi
<h3>Tampilan</h3>
<p>
    Terdapat dua buah <i>canvas</i> di program. <i>Canvas</i> kiri
    adalah <b>canvas untuk keseluruhan objek</b>, sedangkan
    <i>canvas</i> kanan adalah canvas untuk komponen tertentu.
    Komponen dapat dipilih melalui <i>tab component tree</i> yang ada
    di sebelah kiri <i>canvas</i> komponen.
</p>
<ul>
    <li>
    Pengguna dapat mengaktifkan <i>lighting</i> menggunakan
    <i>checkbox</i>
    <ul>
        <li>
        Pada tekstur <i>bump & reflective</i>, tampilan tanpa
        <i>lighting</i> akan menghasilkan permukaan datar
        </li>
    </ul>
    </li>
    <li>
    Pengguna dapat menyalakan animasi yang sudah dibuat menggunakan
    <i>checkbox</i> animasi
    </li>
    <li>
    Pengguna dapat mengganti mode tampilan menggunakan
    <i>dropdown</i> proyeksi. Proyeksi yang dapat digunakan adalah
    <i>perspective projection, oblique, & orthographic</i>
    </li>
</ul>
<h3>Transformasi</h3>

<ul>
    <li>
    Pengguna dapat melakukan rotasi, translasi, dan
    <i>scaling</i> searah sumbu X, Y, dan Z menggunakan
    <i>slider</i>
    </li>
    <li>
    Pengguna dapat menggerakan jarak kamera menggunakan
    <i>camera distance slider</i>
    </li>
    <li>
    Pengguna dapat mengatur posisi kamera menggunakan
    <i>horizontal slider</i> dan <i>vertical slider</i>
    </li>
    <li>
    Pengguna dapat mengatur FOV kamera dengan <i>FOV slider</i>
    </li>
</ul>

Transformasi juga dapat dilakukan pada <i>component canvas</i>,
dengan beberapa hal berikut:
<ul>
    <li>
    Transformasi dari <i>component canvas</i> bersifat
    <i>stacking</i>, sehingga dapat berdampak pada canvas utama
    </li>
    <li>
    Manipulasi transformasi pada komponen <i>parent</i> akan
    menghasilkan transformasi mirip pada canvas utama, karena
    seluruh komponen ikut dimanipulasi
    </li>
    <li>
    Rotasi per komponen spesifik akan dilakukan pada titik pusat
    yang sudah ditentukan
    </li>
</ul>
<h3>Texture</h3>
Terdapat tiga buah mode tekstur yang dapat digunakan:
<ul>
    <li>
    <b>Standard</b> - Tekstur yang digunakan adalah tekstur
    <i>default</i> dari objek
    </li>
    <li>
    <b>Bump</b> - Tekstur yang digunakan adalah tekstur
    <i>bump</i> yang mensimulasikan <i>parallax mapping</i>
    </li>
    <li>
    <b>Reflection</b> - Tekstur yang digunakan adalah tekstur
    <i>reflection</i> yang mensimulasikan <i>reflection mapping</i>
    </li>
</ul>

Untuk mengganti tipe tekstur, pengguna dapat menggunakan
<i>dropdown</i>
di sebelah
<i>dropdown</i>
proyeksi. Tekstur dapat dibedakan pada canvas utama dan
<i>component canvas.</i> Pengguna juga dapat meng-<i>upload</i>
gambar tekstur menggunakan tombol <i>Upload Custom Texture</i>
<ul>
    <li><b>Whole</b> untuk mengubah tekstur pada kedua canvas</li>
    <li>
    <b>Subtree</b> untuk mengubah tekstur hanya pada objek terpilih
    dan subtree pada <i>component canvas</i>
    </li>
</ul>
<b>[IMPORTANT]</b> Karena keterbatasan JavaScript yang tidak bisa menyimpan <i>absolute path</i>, maka <i> path </i> untuk <i>custom texture</i> akan berupa URL yang dibuat dari objek gambar saat <i>runtime</i>, sehingga apabila di-save dan di-load, maka gambar tidak akan muncul. Akan tetapi, untuk penggunaan gambar di folder <b>js/model/texture</b> akan tersimpan dan digunakan secara <i>default</i>

<h3>Kontrol Kamera</h3>
<ul>
    <li>
    Pengguna dapat mengatur jarak kamera dari objek menggunakan
    <i>slider</i> <b>"Camera distance"</b>
    </li>
    <li>
    Pengguna dapat menggerakan kamera mengelilingi objek secara
    horizontal menggunakan <i>slider</i> <b>"Horizontal position</b>
    </li>
    <ul>
    <li>
        Pergerakan dilakukan sejauh <b>maksimal 180 derajat</b> dari
        posisi awal kamera
    </li>
    </ul>
    <li>
    Pengguna dapat menggerakan kamera mengelilingi objek secara
    vertical menggunakan <i>slider</i> <b>"Vertical position</b>
    </li>
    <ul>
    <li>
        Pergerakan dilakukan sejauh <b>maksimal 90 derajat</b> dari
        posisi awal kamera
    </li>
    </ul>
    <li>
    Khusus proyeksi <i>perspective</i> dan <i>oblique</i>, pengguna
    dapat mengubah sudut tampilan dengan <i>FOV slider</i>
    </li>
</ul>

<h3>Lain-lain</h3>
<ul>
    <li>
    Pengguna dapat me-reset parameter transformasi menggunakan
    tombol <b>Reset</b>
    </li>
    <li>
    Pengguna dapat melakukan <i>loading</i> objek yang sudah
    disimpan selanjutnya dengan tombol <b>Load Model</b>
    </li>
    <li>
    Pengguna dapat melakukan <i>save</i> objek yang telah dibuat
    dengan mengisikan nama <i>file</i> di sebelah tombol
    <b>Save Model</b>, lalu menekan tombol <b>Save Model</b>
    </li>
    <ul>
    <li>
        Transformasi pada canvas komponen dan canvas utama akan
        dipisahkan dan akan di-<i>load</i> secara terpisah
    </li>
    </ul>
</ul>