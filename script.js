// ==========================
// ELEMENTOS DEL DOM
// ==========================

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");

const rewindBtn = document.getElementById("rewind");
const forwardBtn = document.getElementById("forward");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");


// ==========================
// FORMATEAR TIEMPO
// ==========================

function formatTime(seconds) {
    if (isNaN(seconds)) return "0:00";

    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);

    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
}


// ==========================
// PLAY / PAUSA
// ==========================

playBtn.addEventListener("click", () => {

    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = "❚❚";
    } else {
        audio.pause();
        playBtn.innerHTML = "▶";
    }

});


// ==========================
// DURACIÓN
// ==========================

audio.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audio.duration);
});


// ==========================
// PROGRESO
// ==========================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.style.width = progressPercent + "%";

    currentTimeEl.textContent =
        formatTime(audio.currentTime);
});


// ==========================
// SEEK BAR
// ==========================

progressContainer.addEventListener("click", (e) => {

    const width = progressContainer.clientWidth;
    const clickX = e.offsetX;

    audio.currentTime =
        (clickX / width) * audio.duration;

});


// ==========================
// TERMINA AUDIO
// ==========================

audio.addEventListener("ended", () => {
    playBtn.innerHTML = "▶";
    progress.style.width = "0%";
    currentTimeEl.textContent = "0:00";
});


// ==========================
// TECLA ESPACIO
// ==========================

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {
        e.preventDefault();
        playBtn.click();
    }

});


// ==========================
// -10 SEGUNDOS
// ==========================

rewindBtn.addEventListener("click", () => {
    audio.currentTime -= 10;
});


// ==========================
// +10 SEGUNDOS
// ==========================

forwardBtn.addEventListener("click", () => {
    audio.currentTime += 10;
});


// ==========================
// ERROR DE AUDIO (DEBUG)
// ==========================

audio.addEventListener("error", () => {
    console.log("Error: no se pudo cargar el audio. Revisa la ruta o si está en GitHub.");
});