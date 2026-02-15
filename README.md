# WAFA Leads

Aplikasi manajemen leads untuk WAFA Indonesia terdiri dari Landing Page publik untuk pendaftaran pengunjung dan Admin Dashboard untuk pengelolaan data leads.
## Fitur

### Landing Page (Publik)
- Form pendaftaran: **Nama**, **No. WhatsApp**, **Email**, **Nama Lembaga**
- Validasi input real-time
- Halaman **Terima Kasih** setelah submit berhasil

### Admin Panel
- **Login** dengan JWT Authentication
- **Dashboard** — CRUD data leads (lihat, cari, tambah, edit, hapus)
- **Activity Logs** — riwayat aktivitas admin (login, tambah, edit, hapus, logout) dengan filter
- **Logout**

---

## Instalasi & Setup

### Prasyarat
- PHP >= 8.2
- Composer
- Node.js >= 18
- npm

### 1. Clone Repository
```bash
git clone <repository-url>
cd Leads
```

### 2. Setup Backend
```bash
cd backend
composer install
cp .env.example .env
php artisan key:generate
php artisan jwt:secret
php artisan migrate --seed
php artisan serve
```
Backend berjalan di `http://127.0.0.1:8000`

### 3. Setup Frontend
```bash
cd frontend
npm install
npm run dev
```
Frontend berjalan di `http://localhost:5173`

### 4. Akun Admin Default
```
Email   : admin1@wafa.co.id
Password: password123
```

## Struktur Halaman


`/`              Landing Page — form pendaftaran          
`/login`         Halaman login admin                      
`/dashboard`     Dashboard — kelola data leads (CRUD)     
`/activity-logs` Log aktivitas admin dengan filter        

---

## Screenshot

### Landing Page (Form Pendaftaran)
<img width="1270" height="733" alt="Screenshot_2026-02-15_08-42-48" src="https://github.com/user-attachments/assets/a7dcd54f-1165-498c-865f-3ed985960431" />

> Halaman publik untuk pengunjung mendaftar dengan form: Nama, No. WA, Email, Nama Lembaga.
> Setelah submit berhasil, tampil halaman "Terima Kasih".

### Login Page
<img width="1280" height="585" alt="Screenshot_2026-02-15_08-42-38" src="https://github.com/user-attachments/assets/52e3f921-66aa-4c09-a7d6-72cc5fa0e61e" />

> Halaman login untuk admin dengan field email dan password.

### Dashboard
<img width="1280" height="585" alt="Screenshot_2026-02-15_08-42-15" src="https://github.com/user-attachments/assets/8ff3ec53-45cf-4976-a5d3-73c539a55138" />

> Halaman utama admin menampilkan tabel data leads dengan fitur tambah, edit, hapus, dan pencarian.

### Activity Logs
<img width="1270" height="604" alt="Screenshot_2026-02-15_08-47-22" src="https://github.com/user-attachments/assets/e21b467a-23f4-46f1-a748-9eaf2d6f1af0" />


> Catatan aktivitas admin: login, logout. Dilengkapi filter dan pencarian.
---

