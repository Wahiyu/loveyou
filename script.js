let highestZ = 1;

class Paper {
  holdingPaper = false;
  touchStartX = 0;
  touchStartY = 0;
  currentPaperX = 0;
  currentPaperY = 0;
  lastTouchTime = 0;

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
      requestAnimationFrame(updatePosition);
    });

    paper.addEventListener("touchend", () => {
      this.holdingPaper = false;
    });
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
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
  });

  const lyrics = ["KARENA AKU", "MENCINTAIMU", "DAN HATIKU", "HANYA UNTUKMU", "TAK AKAN MENYERAH", "DAN TAKAN BERHENTI", "MENCINTAIMU"];
  const delay = 40;
  const lyricsElement = document.getElementById("lyrics");

  async function displayLyrics() {
    for (const line of lyrics) {
      for (const char of line) {
        const charElement = document.createElement("span");
        charElement.textContent = char;
        charElement.style.animation = "glow 1.5s ease-in-out";
        charElement.style.fontSize = "30px";
        lyricsElement.appendChild(charElement);

        await new Promise((resolve) => setTimeout(resolve, delay));
      }

      lyricsElement.appendChild(document.createElement("br"));
      await new Promise((resolve) => setTimeout(resolve, delay * 20));
    }

    setTimeout(() => {
      lyricsElement.textContent = ""; // Clear lyrics
      window.location.href = ""; // Redirect or reload
    }, 2000);
  }

  displayLyrics();
});
