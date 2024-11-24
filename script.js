document.addEventListener("DOMContentLoaded", () => {
  const video = document.getElementById("video");
  const lyricsElement = document.getElementById("lyrics");

  // Lirik dan waktu yang telah ditentukan dalam milidetik
  const lyrics = [
    { text: "KARENA AKU", time: 11000 }, // 11 detik
    { text: "MENCINTAIMU", time: 14000 }, // 14 detik
    { text: "DAN HATIKU", time: 17000 }, // 17 detik
    { text: "HANYA UNTUKMU", time: 20500 }, // 20,5 detik
    { text: "TAK AKAN MENYERAH", time: 24000 }, // 24 detik
    { text: "DAN TAKAN BERHENTI", time: 27000 }, // 27 detik
    { text: "MENCINTAIMU", time: 31000 }, // 31 detik
  ];

  // Fungsi untuk menampilkan lirik satu per satu dengan durasi yang sudah ditentukan
  async function displayLyrics() {
    while (true) {
      for (const { text, time } of lyrics) {
        // Tunggu sampai waktu yang tepat untuk menampilkan lirik
        await new Promise(resolve => setTimeout(resolve, time));

        // Hapus lirik yang sebelumnya
        lyricsElement.textContent = "";

        // Tampilkan lirik satu per satu
        for (const char of text) {
          const charElement = document.createElement("span");
          charElement.textContent = char;
          charElement.style.animation = "glow 2s ease-in-out";
          charElement.style.fontSize = "30px";
          lyricsElement.appendChild(charElement);

          // Menampilkan setiap karakter dengan delay
          await new Promise(resolve => setTimeout(resolve, 100)); // Kecepatan karakter muncul
        }
      }
    }
  }

  // Mulai menampilkan lirik saat video dimulai atau diulang
  video.addEventListener("play", () => {
    // Mulai menampilkan lirik dari awal saat video dimulai
    displayLyrics();
  });
});
