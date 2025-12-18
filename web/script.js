// ==========================================
// 1. DAFTAR NAMA FOTO ANDA (SUDAH DIRAPIKAN)
// ==========================================
const daftarFoto = [
    "WhatsApp Image 2025-12-18 at 17.47.21 (1).jpeg",
    "WhatsApp Image 2025-12-18 at 17.47.21.jpeg",
    "WhatsApp Image 2025-12-18 at 17.47.50.jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.20 (1).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.20.jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.21 (1).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.21 (2).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.21.jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.22 (1).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.22 (2).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.22 (3).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.22.jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.23 (1).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.23.jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.23 (2).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.24 (1).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.24 (2).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.24 (3).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.24.jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.25.jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.25 (2).jpeg",
    "WhatsApp Image 2025-12-18 at 18.00.25 (1).jpeg"
];

// ==========================================
// 2. PESAN & KONFIGURASI
// ==========================================
const pesanCinta = "Terima kasih sudah memilih untuk menetap. Hidup tidak selalu mudah, tapi bersamamu, segala sesuatunya terasa jauh lebih berharga untuk dijalani. Mari kita terus saling menjaga, belajar, dan tumbuh lebih baik lagi setiap harinya.";

const loveQuotes = [
    "Di antara miliaran kemungkinan, aku bersyukur kita saling menemukan. ❤️",
    "Melewati waktu bersamamu adalah cara terbaikku memahami makna rumah.",
    "Menua bersamamu adalah satu-satunya rencana yang paling ingin aku wujudkan.",
    "Aku menghargai caramu mencintaiku dengan caramu sendiri.",
    "Mari kita jaga apa yang sudah kita bangun dengan susah payah ini."
];

// Inisialisasi Element
const giftBox = document.getElementById('giftBox');
const opening = document.getElementById('opening');
const mainPage = document.getElementById('mainPage');
const mySong = document.getElementById('mySong');
const typingText = document.getElementById('typingText');

// ==========================================
// 3. FUNGSI PEMUAT FOTO OTOMATIS
// ==========================================
function loadPhotos() {
    const stack = document.getElementById('photoStack');
    if(!stack) return;
    
    daftarFoto.forEach((namaFile) => {
        const card = document.createElement('div');
        card.className = 'photo-card';
        card.innerHTML = `<img src="assets/images/${namaFile}" alt="Memory">`;
        stack.appendChild(card);
    });
}

// Jalankan pemuat foto segera
loadPhotos();

// ==========================================
// 4. LOGIKA INTERAKSI & ANIMASI
// ==========================================

// Buka Kado
giftBox.onclick = () => {
    opening.style.transition = "opacity 0.8s ease";
    opening.style.opacity = "0";
    setTimeout(() => {
        opening.classList.add('hidden');
        mainPage.classList.remove('hidden');
        document.getElementById('musicToggle').classList.remove('hidden');
        
        mySong.currentTime = 70; // Lompat ke Reff
        mySong.play();
        
        startTyping();
        setupStack(); 
    }, 800);
};

// Efek Mengetik
function startTyping() {
    let charIndex = 0;
    typingText.innerHTML = ""; 
    function type() {
        if (charIndex < pesanCinta.length) {
            typingText.innerHTML += pesanCinta.charAt(charIndex);
            charIndex++;
            setTimeout(type, 50);
        }
    }
    type();
}

// Countdown ke 19 Desember 2026
function updateCountdown() {
    const now = new Date();
    let target = new Date(2026, 11, 19); 
    
    const diff = target - now;

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);

    document.getElementById('days').innerText = d.toString().padStart(2, '0');
    document.getElementById('hours').innerText = h.toString().padStart(2, '0');
    document.getElementById('minutes').innerText = m.toString().padStart(2, '0');
    document.getElementById('seconds').innerText = s.toString().padStart(2, '0');
}
setInterval(updateCountdown, 1000);

// Logika Tumpukan Foto
function setupStack() {
    const stack = document.getElementById('photoStack');
    const cards = Array.from(stack.querySelectorAll('.photo-card'));
    
    cards.forEach((card, index) => {
        card.style.zIndex = index;
        card.onclick = function() {
            if (this.classList.contains('moving')) return;
            
            const currentCard = this;
            currentCard.classList.add('moving');
            
            setTimeout(() => {
                const currentCards = Array.from(stack.querySelectorAll('.photo-card'));
                currentCards.forEach(c => {
                    c.style.zIndex = parseInt(c.style.zIndex) + 1;
                });
                currentCard.style.zIndex = "0";
                currentCard.classList.remove('moving');
            }, 600);
        };
    });
}

// Modal & Musik Control
document.getElementById('sayLoveBtn').onclick = () => {
    const randomMsg = loveQuotes[Math.floor(Math.random() * loveQuotes.length)];
    document.getElementById('randomLoveMessage').innerText = randomMsg;
    document.getElementById('loveModal').classList.remove('hidden');
};

document.querySelector('.close-modal').onclick = () => {
    document.getElementById('loveModal').classList.add('hidden');
};

document.getElementById('musicToggle').onclick = () => {
    if (mySong.paused) { 
        mySong.play(); 
        document.querySelector('.music-visualizer').style.opacity = "1"; 
    } else { 
        mySong.pause(); 
        document.querySelector('.music-visualizer').style.opacity = "0.3"; 
    }
};