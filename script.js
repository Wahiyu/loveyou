let highestZ = 1;

class Paper {
  holdingPaper = false;
  startX = 0;
  startY = 0;
  currentX = 0;
  currentY = 0;
  offsetX = 0;
  offsetY = 0;

  init(paper) {
    const movePaper = (e) => {
      if (!this.holdingPaper) return;

      const touch = e.touches ? e.touches[0] : e;
      this.currentX = touch.clientX - this.offsetX;
      this.currentY = touch.clientY - this.offsetY;

      paper.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
    };

    const stopDragging = () => {
      this.holdingPaper = false;
    };

    paper.addEventListener("mousedown", (e) => this.startDrag(e, paper));
    paper.addEventListener("touchstart", (e) => this.startDrag(e.touches[0], paper));

    document.addEventListener("mousemove", movePaper);
    document.addEventListener("touchmove", movePaper);

    document.addEventListener("mouseup", stopDragging);
    document.addEventListener("touchend", stopDragging);
  }

  startDrag(e, paper) {
    this.holdingPaper = true;
    const rect = paper.getBoundingClientRect();

    this.offsetX = e.clientX - rect.left;
    this.offsetY = e.clientY - rect.top;

    paper.style.zIndex = highestZ++;
    paper.style.transition = "none";
  }
}

// Inisialisasi elemen paper
const papers = Array.from(document.querySelectorAll(".paper.image"));
papers.forEach((paper) => new Paper().init(paper));

// Double-tap untuk video
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  let lastTapTime = 0;

  document.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastTapTime < 300) {
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
    lastTapTime = currentTime;

    // Aktifkan suara jika masih mute
    video.muted = false;
  });

  // Tampilkan lirik satu per satu
  const lyrics = [
    { text: "MENCINTAIMU", delay: 14000 },
    { text: "DAN HATIKU", delay: 17000 },
    { text: "HANYA UNTUKMU", delay: 20500 },
    { text: "TAK AKAN MENYERAH", delay: 24000 },
    { text: "DAN TAKAN BERHENTI", delay: 27000 },
    { text: "MENCINTAIMU", delay: 31000 },
  ];

  const lyricsElement = document.getElementById("lyrics");

  async function displayLyrics() {
    for (const { text, delay } of lyrics) {
      await new Promise((resolve) => setTimeout(resolve, delay));

      // Hapus lirik sebelumnya
      lyricsElement.textContent = "";

      // Tampilkan lirik satu per satu
      for (const char of text) {
        const charElement = document.createElement("span");
        charElement.textContent = char;
        charElement.style.animation = "glow 2s ease-in-out";
        charElement.style.fontSize = "30px";
        lyricsElement.appendChild(charElement);

        await new Promise((resolve) => setTimeout(resolve, 100)); // Kecepatan karakter muncul
      }
    }
  }

  displayLyrics();
});
