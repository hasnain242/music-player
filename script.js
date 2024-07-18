const con = document.getElementById("con");
const previousbtn = document.getElementById("previous");
const playbtn = document.getElementById("play");
const nextbtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressbar = document.getElementById("progress-bar");
const title = document.getElementById("song-title");
const albumart = document.getElementById("album-art");
const songs = ["Mere Gully", "Travis Scott", "kidjaywest", "drake -"];
let songindex = 1;
loadtrack(songs[songindex]);
function loadtrack(song) {
  title.innerText = song;
  audio.src = `music/${song}.mp3`;
  albumart.src = `images/${song}.jpg`;
}
function playtrack() {
  con.classList.add("play");
  playbtn.innerHTML = '<i class="fas fa-pause"></i>';
  audio.play();
}
function pausetrack() {
  con.classList.remove("play");
  playbtn.innerHTML = '<i class="fas fa-play"></i>';
  audio.pause();
}
function previoustrack() {
  songindex--;
  if (songindex < 0) {
    songindex = songs.length - 1;
  }
  loadtrack(songs[songindex]);
  playtrack();
}
function nexttrack() {
  songindex++;
  if (songindex > songs.length - 1) {
    songindex = 0;
  }
  loadtrack(songs[songindex]);
  playtrack();
}

function updateprogress(e) {
  const { duration, currentTime } = e.srcElement;
  const progresspercent = (currentTime / duration) * 100;
  progressbar.style.width = `${progresspercent}%`;
}
function setprogress(e) {
  const width = this.clientWidth;
  const clicklocation = e.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clicklocation / width) * duration;
}

playbtn.addEventListener("click", () => {
  const isplaying = con.classList.contains("play");
  if (isplaying) {
    pausetrack();
  } else {
    playtrack();
  }
});

previousbtn.addEventListener("click", previoustrack);
nextbtn.addEventListener("click", nexttrack);
audio.addEventListener("timeupdate", updateprogress);
progress.addEventListener("click", setprogress);
audio.addEventListener('ended',nexttrack)
