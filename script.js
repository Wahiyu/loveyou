let highestZ = 1;

class Paper {
  holdingPaper = false;
  mouseTouchX = 0;
  mouseTouchY = 0;
  mouseX = 0;
  mouseY = 0;
  prevMouseX = 0;
  prevMouseY = 0;
  velX = 0;
  velY = 0;
  rotation = Math.random() * 30 - 15;
  currentPaperX = 0;
  currentPaperY = 0;
  rotating = false;

  init(paper) {
    document.addEventListener("mousemove", (e) => {
      if (!this.rotating) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;

        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;
      }

      const dirX = e.clientX - this.mouseTouchX;
      const dirY = e.clientY - this.mouseTouchY;
      const dirLength = Math.sqrt(dirX * dirX + dirY * dirY);
      const dirNormalizedX = dirX / dirLength;
      const dirNormalizedY = dirY / dirLength;

      const angle = Math.atan2(dirNormalizedY, dirNormalizedX);
      let degrees = (180 * angle) / Math.PI;
      degrees = (360 + Math.round(degrees)) % 360;
      if (this.rotating) {
        this.rotation = degrees;
      }

      if (this.holdingPaper) {
        if (!this.rotating) {
          this.currentPaperX += this.velX;
          this.currentPaperY += this.velY;
        }
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;

        paper.style.transform = `translateX(${this.currentPaperX}px) translateY(${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }
    });

    paper.addEventListener("mousedown", (e) => {
      if (this.holdingPaper) return;
      this.holdingPaper = true;

      paper.style.zIndex = highestZ;
      highestZ += 1;

      if (e.button === 0) {
        this.mouseTouchX = this.mouseX;
        this.mouseTouchY = this.mouseY;
        this.prevMouseX = this.mouseX;
        this.prevMouseY = this.mouseY;
      }
      if (e.button === 2) {
        this.rotating = true;
      }
    });
    window.addEventListener("mouseup", () => {
      this.holdingPaper = false;
      this.rotating = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));

papers.forEach((paper) => {
  const p = new Paper();
  p.init(paper);
});
document.addEventListener("DOMContentLoaded", function () {
  const lyrics = [
    { text: "KARENA AKU", time: 11000 }, // 11 detik
    { text: "MENCINTAIMU", time: 14000 }, // 14 detik
    { text: "DAN HATIKU", time: 17000 }, // 17 detik
    { text: "HANYA UNTUKMU", time: 19000 }, // 20,5 detik
    { text: "TAK AKAN MENYERAH", time: 22000 }, // 24 detik
    { text: "DAN TAKAN BERHENTI", time: 27000 }, // 27 detik
    { text: "MENCINTAIMU", time: 31000 }, // 31 detik
  ];

  const videoDuration = 37000; // Durasi video dalam milidetik (37 detik)
  const lyricsElement = document.getElementById("lyrics");
  const backgroundElement = document.getElementById("background"); // Anggap background memiliki id 'background'
  let videoPlaying = true; // Flag untuk memeriksa status video
  let videoTimeout;

  // Fungsi untuk menampilkan lirik
  async function displayLyrics() {
    let previousTime = 0;
    while (videoPlaying) {
      for (const { text, time } of lyrics) {
        const delay = time - previousTime; // Hitung delay antara lirik sebelumnya dan lirik yang sedang diproses
        previousTime = time;

        // Tunggu delay sesuai waktu yang ditentukan
        await new Promise((resolve) => setTimeout(resolve, delay));

        // Tampilkan karakter satu per satu
        lyricsElement.textContent = ""; // Kosongkan teks sebelumnya
        for (const char of text) {
          const charElement = document.createElement("span");
          charElement.textContent = char;
          charElement.style.animation = "glow 2s ease-in-out";
          charElement.style.fontSize = "30px";
          lyricsElement.appendChild(charElement);

          // Delay untuk setiap karakter (misalnya 50ms)
          await new Promise((resolve) => setTimeout(resolve, 50));
          charElement.style.animation = ""; // Reset animasi
        }

        lyricsElement.appendChild(document.createElement("br")); // Baris baru setelah setiap lirik
      }

      // Tunggu durasi video sebelum mengulang (loop)
      if (videoPlaying) {
        await new Promise((resolve) => setTimeout(resolve, videoDuration - previousTime));
      }
    }
  }

  // Fungsi untuk menghentikan video dan lirik ketika background ditekan
  backgroundElement.addEventListener("click", function () {
    videoPlaying = false; // Hentikan video dan lirik
    clearTimeout(videoTimeout); // Hentikan timeout video jika ada
  });

  // Fungsi untuk memulai video dan lirik saat halaman dimuat
  function startVideoAndLyrics() {
    displayLyrics(); // Mulai menampilkan lirik
    // Simulasi pemutaran video (misalnya dengan HTML5 video)
    // Letakkan kode video Anda di sini, jika perlu (misalnya video.play() jika menggunakan <video>)
  }

  startVideoAndLyrics(); // Panggil fungsi untuk memulai
});
