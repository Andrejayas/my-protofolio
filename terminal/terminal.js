/* =============================================
   terminal.js — Silver Wolf Terminal Intro
   Honkai: Star Rail Theme 💜
   =============================================

   File ini khusus untuk logika terminal Silver Wolf.
   Terpisah dari script.js (portfolio) supaya lebih rapi.

   📖 Konsep JS yang dipelajari di file ini:
   - const / let            → variabel
   - Array [] & Object {}   → struktur data
   - function               → fungsi
   - setTimeout / setInterval → timer & delay 
   - getElementById         → ambil elemen HTML
   - createElement          → buat elemen baru
   - appendChild            → tambah elemen ke halaman
   - classList.add          → tambah class CSS via JS
*/

/* ─────────────────────────────────────────────
   BAGIAN 1: SCRIPT TERMINAL (DATA)
   ─────────────────────────────────────────────
   Array ini berisi semua baris yang akan muncul.
   Setiap item adalah object dengan:
   - text  : teks yang ditampilkan
   - type  : jenis warna (lihat terminal.css)
   - delay : jeda dalam milidetik
   - typed : ketik satu-satu (true) atau langsung (false)
*/
const terminalScript = [
  { text: "", type: "blank", delay: 300 },
  { text: "  ██████  █████  ██   ██ ██████  ██      ██ ██████  ██████     ██     ██  ██████  ██      ███████", type: "purple", delay: 0 },
  { text: "  ██      ██  ██ ██   ██ ██   ██ ██      ██  ██  ██     ██    ██     ██  ██    ██ ██      ██", type: "purple", delay: 0 },
  { text: "  ███████ ██  ██ ██   ██ ██████  ██      ██  ██  ██    ██    ██ ██ ██   ██    ██ ██      █████", type: "cyan", delay: 0 },
  { text: "       ██ ██  ██ ██   ██ ██   ██ ██      ██  ██  ██   ██    ████████   ██    ██ ██      ██", type: "purple", delay: 0 },
  { text: "  ██████  █████  ████████ ██   ██ ██████ ██ ██████   ██   ██      ██   ██████  ██████  ██", type: "purple", delay: 0 },
  { text: "", type: "blank", delay: 200 },
  { text: "Initializing Quantum Breach Protocol....", type: "info", delay: 600, typed: true },
  { text: "", type: "blank", delay: 0 },

  { text: "SW@HACK:~$ ./scan_target --host portfolio.andrean.dev", type: "cmd", delay: 400, typed: true },
  { text: "  [>] Scanning target host.............. FOUND", type: "info", delay: 300 },
  { text: "  [>] OS Detection...................... Windows / Laragon Stack", type: "info", delay: 200 },
  { text: "  [>] Security Layer................... Active (3 layers)", type: "warning", delay: 200 },
  { text: "  [>] Encryption Protocol.............. AES-256 + Quantum Shield", type: "warning", delay: 200 },
  { text: "", type: "blank", delay: 0 },

  { text: "SW@HACK:~$ ./exploit --method quantum_entangle --target ARW_system", type: "cmd", delay: 500, typed: true },
  { text: "  [*] Loading Silver Wolf exploit kit v7.3...", type: "info", delay: 400 },
  { text: "  [*] Injecting quantum bypass tokens........", type: "info", delay: 300 },
  { text: "  [!] Security Layer 1 ................. BYPASSED ✓", type: "success", delay: 500 },
  { text: "  [!] Security Layer 2 ................. BYPASSED ✓", type: "success", delay: 400 },
  { text: "  [!] Security Layer 3 ................. CRACKING...", type: "warning", delay: 600 },
  { text: "  [!] Security Layer 3 ................. BYPASSED ✓", type: "success", delay: 800 },
  { text: "", type: "blank", delay: 0 },

  { text: "SW@HACK:~$ cat /sys/portfolio/owner.info", type: "cmd", delay: 400, typed: true },
  { text: "  ┌─────────────────────────────────────┐", type: "cyan", delay: 200 },
  { text: "  │  NAME    : Andrean Rayhan Wijaya     │", type: "cyan", delay: 100 },
  { text: "  │  ROLE    : Creative Designer         │", type: "cyan", delay: 100 },
  { text: "  │  STATUS  : ACTIVE ● Online           │", type: "cyan", delay: 100 },
  { text: "  │  SCHOOL  : SMK Telkom Purwokerto     │", type: "cyan", delay: 100 },
  { text: "  └─────────────────────────────────────┘", type: "cyan", delay: 100 },
  { text: "", type: "blank", delay: 0 },

  { text: "SW@HACK:~$ ./authenticate --override --force", type: "cmd", delay: 500, typed: true },
  { text: "  [*] Verifying identity hash...", type: "info", delay: 600 },
  { text: "  [*] Cross-referencing biometric data...", type: "info", delay: 500 },
  { text: "  [✓] Identity confirmed: Silver Wolf clearance", type: "success", delay: 700 },
  { text: "", type: "blank", delay: 0 },
  { text: "  ⚡ QUANTUM AUTHENTICATION: PASSED", type: "success", delay: 400 },
  { text: "", type: "blank", delay: 0 },

  { text: "ACCESS_GRANTED", type: "ACCESS_GRANTED", delay: 600 },
];


/* ─────────────────────────────────────────────
   BAGIAN 2: JALANKAN TERMINAL
   Fungsi utama — dipanggil saat halaman load.
*/
function runTerminal() {
  createParticles();

  const output   = document.getElementById('sw-output');
  const inputLine = document.getElementById('sw-input-line');
  let totalDelay = 0;

  terminalScript.forEach(function(item) {
    totalDelay += item.delay;
    const currentDelay = totalDelay;

    setTimeout(function() {
      if (item.type === 'ACCESS_GRANTED') {
        showAccessGranted();
        return;
      }

      const line = document.createElement('div');
      line.className = 'sw-line ' + item.type;

      if (item.typed && item.text) {
        typeText(line, item.text);
      } else {
        line.textContent = item.text;
      }

      output.appendChild(line);
      output.scrollTop = output.scrollHeight;

    }, currentDelay);
  });
}


/* ─────────────────────────────────────────────
   BAGIAN 3: EFEK MENGETIK SATU PER SATU
   Menulis teks karakter per karakter.
*/
function typeText(element, text) {
  let i = 0;
  const interval = setInterval(function() {
    element.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(interval);
  }, 28);
}


/* ─────────────────────────────────────────────
   BAGIAN 4: TAMPILKAN ACCESS GRANTED
   Muncul setelah semua hack selesai.
*/
function showAccessGranted() {
  const terminal  = document.getElementById('sw-terminal');
  const glitch    = document.getElementById('sw-glitch');
  const inputLine = document.getElementById('sw-input-line');
  const status    = document.getElementById('sw-status');

  inputLine.style.display = 'none';
  glitch.classList.add('active');

  const banner = document.createElement('div');
  banner.className = 'sw-access-banner';
  banner.innerHTML = `
    <div class="sw-access-text">ACCESS GRANTED</div>
    <div class="sw-access-sub">LOADING PORTFOLIO SYSTEM...</div>
  `;
  terminal.appendChild(banner);

  setTimeout(function() { banner.classList.add('show'); }, 100);

  if (status) {
    status.textContent = '● GRANTED';
    status.style.color = '#39ff14';
  }

  setTimeout(transitionToPortfolio, 2500);
}


/* ─────────────────────────────────────────────
   BAGIAN 5: TRANSISI KE PORTFOLIO
   Fade out terminal, lalu hilangkan dari layar.
*/
function transitionToPortfolio() {
  const terminal = document.getElementById('sw-terminal');
  terminal.classList.add('hiding');
  setTimeout(function() {
    terminal.classList.add('gone');
    document.body.style.overflow = '';
  }, 800);
}


/* ─────────────────────────────────────────────
   BAGIAN 6: SKIP — dipanggil dari tombol HTML
*/
function skipTerminal() {
  transitionToPortfolio();
}


/* ─────────────────────────────────────────────
   BAGIAN 7: BUAT PARTIKEL MELAYANG
*/
function createParticles() {
  const container = document.getElementById('sw-particles');
  const colors    = ['#9d4edd', '#00d4ff', '#c77dff', '#39ff14'];

  for (let i = 0; i < 40; i++) {
    const p    = document.createElement('div');
    p.className = 'sw-particle';
    const size  = Math.random() * 3 + 2;
    const color = colors[Math.floor(Math.random() * colors.length)];

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${Math.random() * 100}%;
      bottom: -10px;
      background: ${color};
      box-shadow: 0 0 ${size * 2}px ${color};
      animation-duration: ${Math.random() * 6 + 6}s;
      animation-delay: ${Math.random() * 8}s;
    `;
    container.appendChild(p);
  }
}


/* ─────────────────────────────────────────────
   BAGIAN 8: INISIALISASI — jalan otomatis
*/
(function init() {
  document.body.style.overflow = 'hidden';
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', runTerminal);
  } else {
    runTerminal();
  }
})();
