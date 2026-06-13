// ==========================
// ELEMENTOS DEL DOM
// ==========================

const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");

const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");

const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");


// ==========================
// FORMATEAR TIEMPO
// ==========================

function formatTime(seconds) {

    if (isNaN(seconds)) {
        return "0:00";
    }

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
// CARGAR DURACIÓN TOTAL
// ==========================

audio.addEventListener("loadedmetadata", () => {

    durationEl.textContent =
        formatTime(audio.duration);

});


// ==========================
// ACTUALIZAR PROGRESO
// ==========================

audio.addEventListener("timeupdate", () => {

    if (!audio.duration) return;

    const progressPercent =
        (audio.currentTime / audio.duration) * 100;

    progress.style.width =
        progressPercent + "%";

    currentTimeEl.textContent =
        formatTime(audio.currentTime);

});


// ==========================
// CAMBIAR POSICIÓN DEL AUDIO
// ==========================

progressContainer.addEventListener("click", (e) => {

    const width =
        progressContainer.clientWidth;

    const clickX =
        e.offsetX;

    const duration =
        audio.duration;

    if (!duration) return;

    audio.currentTime =
        (clickX / width) * duration;

});


// ==========================
// CUANDO TERMINA EL AUDIO
// ==========================

audio.addEventListener("ended", () => {

    playBtn.innerHTML = "▶";

    progress.style.width = "0%";

    currentTimeEl.textContent = "0:00";

});


// ==========================
// BARRA ESPACIADORA
// ==========================

document.addEventListener("keydown", (e) => {

    if (e.code === "Space") {

        e.preventDefault();

        playBtn.click();

    }

});


// ==========================
// RETROCEDER 10 SEGUNDOS
// ==========================

const rewindBtn = document.getElementById("rewind");

if (rewindBtn) {

    rewindBtn.addEventListener("click", () => {

        audio.currentTime -= 10;

    });

}


// ==========================
// ADELANTAR 10 SEGUNDOS
// ==========================

const forwardBtn = document.getElementById("forward");

if (forwardBtn) {

    forwardBtn.addEventListener("click", () => {

        audio.currentTime += 10;

    });

}