console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
  { songName: "On my Way", filePath: "1.mp3", coverPath: "1.jpg" },
  { songName: "Meharma", filePath: "2.mp3", coverPath: "2.jpg" },
  // Add more songs here...
];

songItems.forEach((element, i) => {
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

const playSong = (songIndex) => {
  audioElement.src = songs[songIndex].filePath;
  audioElement.currentTime = 0;
  audioElement.play();
  masterPlay.classList.remove('fa-play-circle');
  masterPlay.classList.add('fa-pause-circle');
  gif.style.opacity = 1;
  gif.style.visibility = 'visible'; // Show the "play.gif" image
  document.querySelector('.songInfo').innerHTML = `<img src="play.gif" width="35px" alt="" id="gif">${songs[songIndex].songName}`;
};

const pauseSong = () => {
  audioElement.pause();
  masterPlay.classList.remove('fa-pause-circle');
  masterPlay.classList.add('fa-play-circle');
  gif.style.opacity = 0;
  gif.style.visibility = 'hidden'; // Hide the "play.gif" image
  document.querySelector('.songInfo').innerHTML = `<img src="${songs[songIndex].coverPath}" width="35px" alt="" id="gif">${songs[songIndex].songName}`;
};

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  playSong(songIndex);
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  playSong(songIndex);
};

masterPlay.addEventListener('click', () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    playSong(songIndex);
  } else {
    pauseSong();
  }
});

audioElement.addEventListener('timeupdate', () => {
  let progress = (audioElement.currentTime / audioElement.duration) * 100;
  myProgressBar.value = progress;
});



myProgressBar.addEventListener('input', () => {
  let seekTime = (myProgressBar.value / 100) * audioElement.duration;
  audioElement.currentTime = seekTime;
});

document.getElementById('forward').addEventListener('click', nextSong);

document.getElementById('backward').addEventListener('click', prevSong);

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element, i) => {
  element.addEventListener('click', () => {
    if (i === songIndex && !audioElement.paused) {
      pauseSong();
    } else {
      songIndex = i;
      playSong(songIndex);
    }
  });
});
