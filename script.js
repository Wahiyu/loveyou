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
    const onMove = (e) => {
      e.preventDefault();
      const isTouch = e.type.includes("touch");
      this.mouseX = isTouch ? e.touches[0].clientX : e.clientX;
      this.mouseY = isTouch ? e.touches[0].clientY : e.clientY;

      if (this.holdingPaper) {
        this.velX = this.mouseX - this.prevMouseX;
        this.velY = this.mouseY - this.prevMouseY;

        this.currentPaperX += this.velX;
        this.currentPaperY += this.velY;

        paper.style.transform = `translate(${this.currentPaperX}px, ${this.currentPaperY}px) rotateZ(${this.rotation}deg)`;
      }

      this.prevMouseX = this.mouseX;
      this.prevMouseY = this.mouseY;
    };

    const onEnd = () => {
      this.holdingPaper = false;
      this.rotating = false;
    };

    paper.addEventListener("mousedown", (e) => {
      this.startDrag(e);
    });

    paper.addEventListener("touchstart", (e) => {
      this.startDrag(e);
    });

    document.addEventListener("mousemove", onMove);
    document.addEventListener("touchmove", onMove);

    window.addEventListener("mouseup", onEnd);
    window.addEventListener("touchend", onEnd);

    paper.addEventListener("contextmenu", (e) => e.preventDefault());
  }

  startDrag(e) {
    const isTouch = e.type.includes("touch");
    this.holdingPaper = true;
    this.mouseTouchX = isTouch ? e.touches[0].clientX : e.clientX;
    this.mouseTouchY = isTouch ? e.touches[0].clientY : e.clientY;
    this.prevMouseX = this.mouseTouchX;
    this.prevMouseY = this.mouseTouchY;
    e.target.style.zIndex = highestZ++;
  }
}

const papers = Array.from(document.querySelectorAll(".paper"));
papers.forEach((paper) => new Paper().init(paper));

// Kontrol Video Background
document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  let videoPaused = false;

  document.addEventListener("click", (e) => {
    if (e.target.id === "video" || e.target.closest("#background")) {
      videoPaused = !videoPaused;
      videoPaused ? video.pause() : video.play();
    }
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
