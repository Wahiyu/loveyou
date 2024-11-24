let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  currentPaperX = 0;
  currentPaperY = 0;

  init(paper) {
    const updatePosition = () => {
      paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px)`;
      paper.style.zIndex = highestZ++;
    };

    paper.addEventListener("touchstart", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      this.holdingPaper = true;
      this.touchStartX = touch.clientX - this.currentPaperX;
      this.touchStartY = touch.clientY - this.currentPaperY;
      paper.style.transition = "none"; // Disable smooth transition
    });

    paper.addEventListener("touchmove", (e) => {
      if (!this.holdingPaper) return;
      const touch = e.touches[0];
      this.currentPaperX = touch.clientX - this.touchStartX;
      this.currentPaperY = touch.clientY - this.touchStartY;
      requestAnimationFrame(updatePosition); // Optimize for smooth movement
    });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper.image"));
papers.forEach((paper) => new Paper().init(paper));

// Kontrol Video dengan Double-Tap
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  let lastTapTime = 0;

  document.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastTapTime < 300) {
      // Deteksi Double-Tap
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
    lastTapTime = currentTime;

    // Aktifkan suara video jika dimute
    video.muted = false;
  });

  const lyrics = [
    { text: " ", delay: 14000 },
    { text: " ", delay: 17000 },
    { text: " ", delay: 20500 },
    { text: " ", delay: 24000 },
    { text: " ", delay: 27000 },
    { text: " ", delay: 31000 },
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
