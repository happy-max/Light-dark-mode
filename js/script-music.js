const playBtn = document.getElementById('play')
const nextBtn = document.getElementById('next')
const prevBtn = document.getElementById('prev')
const title = document.getElementById('title')
const artists = document.getElementById('artist')
let currentTimeEl = document.getElementById('current-time')
let durationTime = document.getElementById('duration')
let progress = document.getElementById('progress')
const progressContainer = document.getElementById('progress-container')
const audio = document.querySelector('audio')
const img = document.getElementById('image')

const songs = [
    {
        name: 'j-1',
        displayName: 'Havana',
        artist: 'Camila Cabello',
    },
    {
        name: 'j-2',
        displayName: 'Believer',
        artist: 'Imagine Dragons',
    },
    {
        name: 'j-3',
        displayName: 'Natural',
        artist: 'Imagine Dragons',
    },
    {
        name: 'j-4',
        displayName: 'Despacito',
        artist: 'Daddy Yankee',
    },
];

let isPlaying = false
let songIndex = 0
const amountSongs = songs.length


function playControl() {
    if (!isPlaying) {
        playBtn.classList.replace('fa-play', 'fa-pause')
        playBtn.setAttribute('title', 'Pause')
        audio.play()
    } else {
        playBtn.classList.replace('fa-pause', 'fa-play')
        playBtn.setAttribute('title', 'Play')
        audio.pause()
    }
    isPlaying = !isPlaying
}

function loadSong({artist, displayName, name}) {
    title.textContent = displayName
    artists.textContent = artist
    img.src = `img/${name}.jpg`
    audio.src = `music/${name}.mp3`

}

function clearProgressLine() {
    if (isPlaying) {
        audio.play()
    } else {
        progress.style.width = '0%'
    }
}

function nextSong() {
    songIndex++
    if (songIndex >= amountSongs) {
        songIndex = 0
    }
    loadSong(songs[songIndex])
    clearProgressLine()

}

function prevSong() {
    songIndex--
    if (songIndex < 0) {
        songIndex = songs.length - 1
    }
    loadSong(songs[songIndex])
    clearProgressLine()
}

function changeDuration(e) {
    const {duration} = e.target
    const durationMinutes = Math.floor(duration / 60)
    let durationSeconds = Math.floor(duration % 60)
    if (durationSeconds < 10) {
        durationSeconds = `0${durationSeconds}`
    }
    durationTime.textContent = `${durationMinutes}:${durationSeconds}`
}

function updateProgressBar(e) {
    const {currentTime, duration} = e.target
    const progressPercent = (currentTime / duration) * 100
    progress.style.width = `${progressPercent}%`
    const currentMinutes = Math.floor(currentTime / 60)
    let currentSeconds = Math.floor(currentTime % 60)
    if (currentSeconds < 10) {
        currentSeconds = `0${currentSeconds}`
    }
    currentTimeEl.textContent = `${currentMinutes}:${currentSeconds}`
}

function setProgressBar(e){
    const width = this.clientWidth
    const clickX = e.offsetX
    const { duration } = audio
    audio.currentTime = clickX/width*duration

}



loadSong(songs[songIndex])
playBtn.addEventListener("click", playControl)
nextBtn.addEventListener("click", nextSong)
prevBtn.addEventListener("click", prevSong)
audio.addEventListener('ended', nextSong)
audio.addEventListener('durationchange', changeDuration)
audio.addEventListener('timeupdate', updateProgressBar)
progressContainer.addEventListener('click', setProgressBar)

