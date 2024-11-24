document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  let lastTapTime = 0;

  // Aktifkan suara video dengan double-tap
  document.addEventListener("touchend", (e) => {
    const currentTime = new Date().getTime();
    if (currentTime - lastTapTime < 300) {
      // Double-tap terdeteksi
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
    lastTapTime = currentTime;

    // Aktifkan suara jika masih dalam keadaan mute
    video.muted = false;
  });

  const lyricsElement = document.getElementById("lyrics");
  const lyrics = [
    { text: "MENCINTAIMU", delay: 14000 },
    { text: "DAN HATIKU", delay: 17000 },
    { text: "HANYA UNTUKMU", delay: 20500 },
    { text: "TAK AKAN MENYERAH", delay: 24000 },
    { text: "DAN TAKAN BERHENTI", delay: 27000 },
    { text: "MENCINTAIMU", delay: 31000 },
  ];

  // Fungsi untuk menampilkan lirik sesuai waktu
  function displayLyrics() {
    lyrics.forEach((lyric) => {
      setTimeout(() => {
        lyricsElement.textContent = lyric.text;

        // Tambahkan animasi glow untuk efek teks
        lyricsElement.style.animation = "glow 2s ease-in-out";
      }, lyric.delay);
    });
  }

  // Jalankan fungsi untuk menampilkan lirik
  displayLyrics();
});
