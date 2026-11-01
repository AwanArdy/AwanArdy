import { ArticleItem } from '../types/portfolio';

export const ARTICLES_DATA: ArticleItem[] = [
  {
    id: "ART-01",
    slug: "full-setup-ubuntu-after-install",
    title: "Panduan Lengkap Setup Ubuntu After Install: Dari Desktop Hingga Production-Ready Stack",
    subtitle: "SISTEM UPDATE, GNOME TWEAKS, EXTENSION MANAGER, PYTHON, TYPESCRIPT, SERTA TUTORIAL LENGKAP POSTGRESQL & MYSQL",
    category: "LINUX & DEVELOPER WORKSTATION",
    readTime: "15 MIN READ",
    date: "NOVEMBER 2026",
    author: "Muhammad Awan Ardy Firmansyah",
    tags: [
      "Ubuntu",
      "Linux",
      "Gnome",
      "Python",
      "TypeScript",
      "PostgreSQL",
      "MySQL",
      "DevOps"
    ],
    summary:
      "Panduan komprehensif setelah instalasi bersih Ubuntu untuk kebutuhan software engineering. Mencakup update sistem, instalasi GNOME Tweaks & Extension Manager, konfigurasi runtime Python dan TypeScript/Node.js, serta tutorial konfigurasi database PostgreSQL dan MySQL siap pakai.",
    sections: [
      {
        id: "step-1-system-update",
        title: "01 // System Update, Mirror & Essential Build Packages",
        subsections: [
          {
            title: "Pembaruan Indeks Paket & Kernel",
            lead: "Langkah pertama yang mutlak dilakukan setelah booting pertama ke Ubuntu adalah menyinkronkan repositori apt dan memperbarui seluruh library sistem ke versi paling stabil.",
            paragraphs: [
              "Sebelum menginstal aplikasi apa pun, pastikan package manager Anda memiliki daftar versi terbaru dari server mirror. Mengabaikan langkah ini dapat menyebabkan konflik dependensi paket (broken packages) di kemudian hari."
            ],
            codeBlocks: [
              {
                filename: "terminal — update & upgrade",
                language: "bash",
                code: "sudo apt update && sudo apt upgrade -y\nsudo apt autoremove -y && sudo apt autoclean",
                description: "Menyinkronkan repositori, memperbarui paket sistem, serta membersihkan file instalasi usang."
              }
            ]
          },
          {
            title: "Instalasi Build Essentials & Core Utilities",
            lead: "Sebagai developer, Anda memerlukan compiler C/C++, header library, serta utilitas jaringan untuk mengompilasi dependensi native (seperti paket npm atau pip C-extensions).",
            paragraphs: [
              "Instal paket-paket fundamental berikut agar build tools seperti make, gcc, g++, curl, dan git langsung tersedia di terminal Anda."
            ],
            codeBlocks: [
              {
                filename: "terminal — essential packages",
                language: "bash",
                code: "sudo apt install -y build-essential curl wget git \\\n  software-properties-common apt-transport-https ca-certificates \\\n  gnupg lsb-release htop unzip psmisc net-tools",
                description: "Paket dasar compiler, TLS certs, utilitas diagnostik, dan file handling."
              }
            ],
            callout: {
              type: "tip",
              text: "Jika Anda menggunakan Ubuntu untuk keperluan multimedia sehari-hari, Anda juga dapat menginstal 'sudo apt install -y ubuntu-restricted-extras' untuk mendapatkan codec video proprietary dan font standar."
            }
          }
        ]
      },
      {
        id: "step-2-gnome-desktop",
        title: "02 // Desktop Enhancement: GNOME Tweaks & Extension Manager",
        subsections: [
          {
            title: "Instalasi GNOME Tweaks",
            lead: "Secara default, menu pengaturan bawaan Ubuntu cukup terbatas. GNOME Tweaks memberikan kontrol penuh atas manajemen font, window buttons, top bar, dan workspace behavior.",
            paragraphs: [
              "Dengan GNOME Tweaks, Anda dapat mengatur perilaku klik touchpad, memindahkan tombol kontrol jendela (minimize/maximize) ke sisi kiri atau kanan, serta mengaktifkan dark mode menyeluruh untuk legacy GTK apps."
            ],
            codeBlocks: [
              {
                filename: "terminal — install gnome-tweaks",
                language: "bash",
                code: "sudo apt install -y gnome-tweaks",
                description: "Instalasi antarmuka modifikasi mendalam desktop environment GNOME."
              }
            ]
          },
          {
            title: "Instalasi GNOME Shell Extension Manager",
            lead: "Alih-alih menginstal ekstensi melalui browser yang sering mengalami masalah integrasi NPAPI/host connector, gunakan 'Extension Manager' (native GTK4/libadwaita).",
            paragraphs: [
              "Aplikasi ini memungkinkan Anda mencari, menginstal, mengonfigurasi, dan memperbarui ekstensi GNOME Shell secara langsung dari desktop tanpa perlu addon browser pihak ketiga."
            ],
            codeBlocks: [
              {
                filename: "terminal — install extension-manager",
                language: "bash",
                code: "sudo apt install -y gnome-shell-extension-manager",
                description: "Instalasi Extension Manager resmi dari repositori universe Ubuntu."
              }
            ]
          },
          {
            title: "Rekomendasi Ekstensi Esensial untuk Produktivitas Developer",
            lead: "Buka Extension Manager (ketik 'Extension Manager' di Application Drawer) lalu cari dan pasang ekstensi berikut:",
            list: [
              "Dash to Dock: Mengubah Ubuntu dock default menjadi dock dinamis seperti macOS atau panel minimalis yang autohide.",
              "AppIndicator and KStatusNotifierItem Support: Menampilkan system tray icon untuk Slack, Discord, Steam, atau Docker Desktop.",
              "Clipboard Indicator: Menyimpan riwayat salin/tempel (copy-paste) di panel atas, sangat krusial saat coding dan refactoring.",
              "Blur my Shell: Menambahkan efek blur modern estetis pada top bar, lock screen, dan app overview.",
              "User Themes: Mengizinkan pemakaian tema GNOME Shell custom pihak ketiga dari folder ~/.themes."
            ]
          },
          {
            title: "Instalasi Font Coding (JetBrains Mono & Fira Code)",
            lead: "Tingkatkan kenyamanan membaca kode dengan font monospace profesional berfitur programming ligatures.",
            codeBlocks: [
              {
                filename: "terminal — install fonts",
                language: "bash",
                code: "# Instalasi Fira Code via apt\nsudo apt install -y fonts-firacode\n\n# Atau install JetBrains Mono\nsudo apt install -y fonts-jetbrains-mono",
                description: "Font langsung terdaftar di sistem dan siap dipilih pada VS Code atau Terminal."
              }
            ]
          }
        ]
      },
      {
        id: "step-3-programming-stack",
        title: "03 // Programming Environment: Python & TypeScript/Node.js",
        subsections: [
          {
            title: "Setup Python Development Environment",
            lead: "Ubuntu menyertakan Python 3 secara sistemik, namun Anda dilarang melakukan pip install secara global (PEP 668: externally-managed-environment). Anda harus menggunakan virtual environments.",
            paragraphs: [
              "Instal dependensi Python development, modul venv, pip, serta compiler header untuk library data science dan web framework (FastAPI/Django/Flask):"
            ],
            codeBlocks: [
              {
                filename: "terminal — setup python",
                language: "bash",
                code: "# Instalasi pip, venv, dan compiler header\nsudo apt install -y python3-pip python3-venv python3-dev\n\n# Verifikasi versi\npython3 --version\npip3 --version",
                description: "Menyiapkan fondasi Python 3 modern pada Ubuntu."
              },
              {
                filename: "terminal — workflow virtual environment",
                language: "bash",
                code: "# Membuat folder proyek dan virtual environment\nmkdir -p ~/projects/my-python-app && cd ~/projects/my-python-app\npython3 -m venv .venv\n\n# Aktivasi environment\nsource .venv/bin/activate\n\n# Sekarang Anda dapat menginstal dependensi dengan aman tanpa merusak sistem\npip install --upgrade pip\npip install fastapi uvicorn requests\n\n# Keluar dari environment\ndeactivate",
                description: "Praktik terbaik isolasi paket proyek Python menggunakan standard venv."
              }
            ],
            callout: {
              type: "tip",
              text: "Pro-tip: Coba pasang 'uv' (paket manager berbasis Rust super cepat) dengan perintah: curl -LsSf https://astral.sh/uv/install.sh | sh. Kecepatan instalasi dependensi pip menjadi 10-100x lebih instan."
            }
          },
          {
            title: "Setup Node.js & TypeScript via NVM",
            lead: "Hindari menginstal Node.js dari repositori apt default karena versinya sering tertinggal. Gunakan Node Version Manager (NVM) agar bebas berganti versi Node kapan saja tanpa memerlukan sudo.",
            paragraphs: [
              "Jalankan script instalasi NVM resmi, lalu muat konfigurasi shell dan instal versi Long Term Support (LTS) terbaru:"
            ],
            codeBlocks: [
              {
                filename: "terminal — instalasi nvm & node",
                language: "bash",
                code: "# Unduh dan pasang NVM\ncurl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash\n\n# Muat NVM ke session bash saat ini\nexport NVM_DIR=\"$HOME/.nvm\"\n[ -s \"$NVM_DIR/nvm.sh\" ] && \\. \"$NVM_DIR/nvm.sh\"\n\n# Pasang Node.js LTS terbaru\nnvm install --lts\nnvm use --lts\n\n# Verifikasi versi node dan npm\nnode -v\nnpm -v",
                description: "Instalasi Node.js LTS terisolasi di user space tanpa akses root."
              },
              {
                filename: "terminal — instalasi typescript & package managers",
                language: "bash",
                code: "# Instal TypeScript compiler, tsx (runner runtime modern), pnpm, dan yarn secara global\nnpm install -g typescript tsx pnpm yarn\n\n# Verifikasi TypeScript\ntsc --version\ntsx --version",
                description: "Menyiapkan tooling ekosistem TypeScript modern."
              }
            ]
          }
        ]
      },
      {
        id: "step-4-postgresql-setup",
        title: "04 // Tutorial Setup PostgreSQL: Dari Instalasi Hingga Hak Akses Role",
        subsections: [
          {
            title: "Instalasi & Verifikasi Service PostgreSQL",
            lead: "PostgreSQL adalah standar emas untuk relational database production dengan konsistensi ACID tinggi dan dukungan JSONB yang sangat kuat.",
            paragraphs: [
              "Instal paket postgresql beserta postgresql-contrib yang menyertakan ekstensi berguna seperti uuid-ossp, pgcrypto, dan hstore."
            ],
            codeBlocks: [
              {
                filename: "terminal — instalasi postgresql",
                language: "bash",
                code: "sudo apt install -y postgresql postgresql-contrib\n\n# Aktifkan service systemd agar otomatis berjalan saat boot\nsudo systemctl enable postgresql\nsudo systemctl start postgresql\n\n# Periksa status layanan\nsudo systemctl status postgresql --no-pager",
                description: "Menginstal PostgreSQL engine dan mengaktifkan daemon background."
              }
            ]
          },
          {
            title: "Konfigurasi Role Developer & Database",
            lead: "Secara default, PostgreSQL di Ubuntu menggunakan autentikasi 'peer', yang berarti hanya pengguna OS Linux bernama 'postgres' yang dapat mengakses database 'postgres'. Kita akan membuat role developer terdedikasi dengan password.",
            codeBlocks: [
              {
                filename: "terminal — masuk ke psql prompt",
                language: "bash",
                code: "# Berpindah ke akun sistem postgres bawaan\nsudo -i -u postgres\n\n# Buka PostgreSQL interactive terminal\npsql",
                description: "Masuk ke command line administrative PostgreSQL."
              },
              {
                filename: "psql (interactive console)",
                language: "sql",
                code: "-- 1. Buat role pengguna baru dengan password\nCREATE ROLE devuser WITH LOGIN PASSWORD 'SuperDevPassword2026!';\n\n-- 2. Berikan izin membuat database dan status superuser untuk local dev\nALTER ROLE devuser CREATEDB SUPERUSER;\n\n-- 3. Buat database utama untuk workspace development Anda\nCREATE DATABASE dev_workspace OWNER devuser;\n\n-- 4. Berikan seluruh hak akses ke database tersebut\nGRANT ALL PRIVILEGES ON DATABASE dev_workspace TO devuser;\n\n-- 5. Periksa daftar database dan user yang baru dibuat\n\\l\n\\du\n\n-- 6. Keluar dari psql console\n\\q",
                description: "Membuat role user, password, dan database khusus development."
              },
              {
                filename: "terminal — kembali ke akun biasa",
                language: "bash",
                code: "# Keluar dari shell pengguna 'postgres'\nexit",
                description: "Kembali ke user Ubuntu biasa Anda."
              }
            ]
          },
          {
            title: "Uji Koneksi Localhost & Konfigurasi Autentikasi (pg_hba.conf)",
            lead: "Uji koneksi ke database menggunakan akun dan password yang baru saja Anda buat:",
            codeBlocks: [
              {
                filename: "terminal — test koneksi postgres",
                language: "bash",
                code: "# Koneksi via host TCP 127.0.0.1 (meminta password)\npsql -h 127.0.0.1 -U devuser -d dev_workspace -W\n\n# Di dalam prompt database, coba jalankan query sederhana:\nSELECT version();\nSELECT current_user, current_database();\n\\q",
                description: "Verifikasi autentikasi kredensial lokal PostgreSQL."
              }
            ],
            callout: {
              type: "note",
              text: "Catatan konfigurasi: Jika Anda perlu mengubah mode autentikasi atau mengizinkan koneksi jaringan, file konfigurasi terletak di '/etc/postgresql/<versi>/main/pg_hba.conf' dan 'postgresql.conf'. Jangan lupa jalankan 'sudo systemctl restart postgresql' setelah mengedit konfigurasi."
            }
          }
        ]
      },
      {
        id: "step-5-mysql-setup",
        title: "05 // Tutorial Setup MySQL Server: Security Hardening & User Privileges",
        subsections: [
          {
            title: "Instalasi MySQL Server",
            lead: "MySQL adalah sistem manajemen database relasional yang paling banyak digunakan di web, andal untuk arsitektur monolithic maupun microservices.",
            codeBlocks: [
              {
                filename: "terminal — instalasi mysql",
                language: "bash",
                code: "sudo apt install -y mysql-server\n\n# Pastikan daemon MySQL berjalan dan aktif saat boot\nsudo systemctl enable mysql\nsudo systemctl start mysql\n\n# Cek status layanan\nsudo systemctl status mysql --no-pager",
                description: "Instalasi MySQL Server daemon versi resmi."
              }
            ]
          },
          {
            title: "Menjalankan MySQL Secure Installation",
            lead: "Amankan instalasi MySQL baru dengan menghapus user anonymous, mengunci database test, dan menonaktifkan remote root login.",
            paragraphs: [
              "Jalankan utilitas keamanan terpadu berikut di terminal:"
            ],
            codeBlocks: [
              {
                filename: "terminal — secure installation",
                language: "bash",
                code: "sudo mysql_secure_installation",
                description: "Wizard pengamanan MySQL server."
              }
            ],
            callout: {
              type: "tip",
              text: "Panduan menjawab prompt wizard: (1) VALIDATE PASSWORD COMPONENT: Pilih 'Y' jika ingin kebijakan password ketat, atau 'N' jika untuk local development santai. (2) Change Root Password: Boleh dilewati jika menggunakan sudo auth_socket. (3) Remove anonymous users: Jawab 'Y'. (4) Disallow root login remotely: Jawab 'Y'. (5) Remove test database: Jawab 'Y'. (6) Reload privilege tables now: Jawab 'Y'."
            }
          },
          {
            title: "Membuat User Developer Baru & Database dengan UTF8MB4",
            lead: "Di Ubuntu, akun root MySQL diatur menggunakan plugin 'auth_socket' (hanya bisa login dengan sudo mysql). Praktik terbaik adalah membuat user developer dengan autentikasi native/caching_sha2_password untuk dihubungkan ke framework (Node/Express, Django, Laravel, dll).",
            codeBlocks: [
              {
                filename: "terminal — masuk ke mysql root",
                language: "bash",
                code: "sudo mysql",
                description: "Masuk ke MySQL command prompt menggunakan akses socket sudo."
              },
              {
                filename: "mysql (interactive shell)",
                language: "sql",
                code: "-- 1. Buat user developer dengan password kuat\nCREATE USER 'devuser'@'localhost' IDENTIFIED BY 'StrongMySQLPass2026!';\n\n-- 2. Berikan hak akses penuh ke seluruh database lokal\nGRANT ALL PRIVILEGES ON *.* TO 'devuser'@'localhost' WITH GRANT OPTION;\n\n-- 3. Muat ulang privilege cache\nFLUSH PRIVILEGES;\n\n-- 4. Buat database default dengan charset full UTF-8 (support emoji & multilingual)\nCREATE DATABASE dev_workspace CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;\n\n-- 5. Cek database dan user\nSHOW DATABASES;\nSELECT user, host, plugin FROM mysql.user;\n\n-- 6. Keluar dari MySQL\nEXIT;",
                description: "Perintah SQL untuk membuat user developer dan database utf8mb4."
              },
              {
                filename: "terminal — test login mysql",
                language: "bash",
                code: "# Uji koneksi tanpa menggunakan sudo:\nmysql -u devuser -p dev_workspace\n\n# Masukkan password: StrongMySQLPass2026!\n# Jalankan query status:\nSTATUS;\nSELECT CURRENT_USER(), DATABASE();\nEXIT;",
                description: "Login menggunakan akun developer reguler tanpa privilese root."
              }
            ]
          }
        ]
      },
      {
        id: "step-6-pro-dev-tools",
        title: "06 // Final Touches: Git Configuration, SSH Key & VS Code",
        subsections: [
          {
            title: "Konfigurasi Identitas Git & Generate SSH Key",
            lead: "Siapkan kredensial git global dan generate kunci SSH Ed25519 modern untuk push/pull tanpa repot password ke GitHub / GitLab.",
            codeBlocks: [
              {
                filename: "terminal — git config",
                language: "bash",
                code: "# Identitas Git Global\ngit config --global user.name \"Muhammad Awan Ardy Firmansyah\"\ngit config --global user.email \"muhammadawan46@gmail.com\"\ngit config --global init.defaultBranch main\ngit config --global core.editor nano\n\n# Generate Modern Ed25519 SSH Key\nssh-keygen -t ed25519 -C \"muhammadawan46@gmail.com\"\n\n# Tampilkan public key untuk ditempelkan ke GitHub Settings -> SSH Keys\ncat ~/.ssh/id_ed25519.pub",
                description: "Konfigurasi Git author dan enkripsi SSH."
              }
            ]
          },
          {
            title: "Instalasi Visual Studio Code & Docker Engine",
            lead: "Lengkapi workstation Anda dengan IDE utama dan container runtime standar industri.",
            codeBlocks: [
              {
                filename: "terminal — install vscode & docker",
                language: "bash",
                code: "# Instal VS Code via Snap resmi (classic confinement)\nsudo snap install --classic code\n\n# Instal Docker Engine & Docker Compose plugin\nsudo apt install -y docker.io docker-compose-plugin\n\n# Izinkan user Anda menjalankan docker tanpa sudo\nsudo usermod -aG docker $USER\nnewgrp docker\n\n# Verifikasi docker\ndocker --version && docker compose version",
                description: "Instalasi VS Code dan permission Docker tanpa sudo."
              }
            ],
            callout: {
              type: "tip",
              text: "Ubuntu Anda kini telah bertransformasi 100% menjadi workstation software engineering level production yang bersih, cepat, stabil, dan siap menangani proyek skala besar!"
            }
          }
        ]
      }
    ]
  }
];
