console.log("Welcome to Spotify");
let songIndex = 0;
let audioElement = new Audio();
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName:"On my Way",filePath:"1.mp3",coverPath:"1.jpg"},
    {songName:"Meharma",filePath:"2.mp3",coverPath:"2.jpeg"},
    {songName:"Bekhudhi",filePath:"3.mp3",coverPath:"3.jpeg"},
    {songName:"Tu mileya",filePath:"4.mp3",coverPath:"4.jpeg"},
    {songName:"Tera zikr",filePath:"5.mp3",coverPath:"5.jpeg"},
    {songName:"Barsaat",filePath:"6.mp3",coverPath:"6.jpg"},
    {songName:"Do din",filePath:"7.mp3",coverPath:"7.jpg"},
    {songName:"Main woh chaand",filePath:"8.mp3",coverPath:"8.jpeg"},
    {songName:"Kaash aisa hota",filePath:"9.mp3",coverPath:"9.jpg"},
    {songName:"Pehli Mohabbat",filePath:"10.mp3",coverPath:"10.jpg"},
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

    // Update song list play icon for the current song
    const songListPlayIcons = document.getElementsByClassName('songItemPlay');
    for (let i = 0; i < songListPlayIcons.length; i++) {
        if (i === songIndex) {
            songListPlayIcons[i].classList.remove('fa-circle-play');
            songListPlayIcons[i].classList.add('fa-circle-pause');
        } else {
            songListPlayIcons[i].classList.remove('fa-circle-pause');
            songListPlayIcons[i].classList.add('fa-circle-play');
        }
    }

    document.querySelector('.songInfo').innerHTML = `<img src="play.gif" width="35px" alt="" id="gif">${songs[songIndex].songName}`;
};

const pauseSong = () => {
    audioElement.pause();
    masterPlay.classList.remove('fa-pause-circle');
    masterPlay.classList.add('fa-play-circle');
    gif.style.opacity = 0;
    gif.style.visibility = 'hidden'; // Hide the "play.gif" image

    // Update song list play icon for the current song
    const songListPlayIcon = document.getElementsByClassName('songItemPlay')[songIndex];
    songListPlayIcon.classList.remove('fa-circle-pause');
    songListPlayIcon.classList.add('fa-circle-play');

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

document.getElementById('forward').addEventListener('click', nextSong);
document.getElementById('backward').addEventListener('click', prevSong);

const togglePlayPause = () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        playSong(songIndex);
    } else {
        pauseSong();
    }
};

const updateProgressBar = () => {
    const progress = (audioElement.currentTime / audioElement.duration) * 100;
    myProgressBar.value = progress;

    // Display current time and duration
    const currentTime = formatTime(audioElement.currentTime);
    const duration = formatTime(audioElement.duration);
    document.querySelector('.songInfo').innerHTML = `<img src="play.gif" width="35px" alt="" id="gif">${songs[songIndex].songName} (${currentTime} / ${duration})`;

    // Check if the song has ended
    if (audioElement.ended) {
        pauseSong();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
        gif.style.visibility = 'hidden';
    }
};

// Helper function to format time in mm:ss format
const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

masterPlay.addEventListener('click', togglePlayPause);
audioElement.addEventListener('timeupdate', updateProgressBar);
myProgressBar.addEventListener('input', () => {
    const seekTime = (myProgressBar.value / 100) * audioElement.duration;
    audioElement.currentTime = seekTime;
});

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
