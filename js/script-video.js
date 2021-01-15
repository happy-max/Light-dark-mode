const video = document.querySelector('video')
const playbtn = document.getElementById('play-btn')
const volumeIcon = document.getElementById('volume-icon')
const volumeBar = document.querySelector('.volume-bar')
const volumeRange = document.querySelector('.volume-range')
const elapsedTime = document.querySelector('.time-elapsed')
const durTime = document.querySelector('.time-duration')
const progressBar = document.querySelector('.progress-bar')
const progressRange = document.querySelector('.progress-range')
const fullscreenBtn = document.querySelector('.fullscreen')
const player = document.querySelector('.player')
const playerSpeed = document.querySelector('.player-speed')
let fullScreen = false
let lastVolume = 0.5
let lastVolumeClass

function togglePauseIcon() {
    playbtn.classList.replace('fa-pause', 'fa-play')
    playbtn.setAttribute('title', 'Pause')
}

function playVideo() {
    if (video.paused) {
        video.play()
        playbtn.classList.replace('fa-play', 'fa-pause')
        playbtn.setAttribute('title', 'Play')
    } else {
        video.pause()
        togglePauseIcon()
    }
}

function displayTime(time) {
    const minutes = Math.floor(time / 60)
    let seconds = Math.floor(time % 60)
    seconds = seconds > 9 ? seconds : `0${seconds}`
    return `${minutes}:${seconds}`
}

function updateProgress() {
    progressBar.style.width = `${(video.currentTime / video.duration) * 100}%`
    elapsedTime.textContent = `${displayTime(video.currentTime)} / `
    durTime.textContent = `${displayTime(video.duration)}`
}

function updateProgressBar(e) {
    const lengthBar = e.offsetX / progressRange.offsetWidth
    progressBar.style.width = `${lengthBar * 100}%`
    video.currentTime = lengthBar * video.duration

}

/* View in fullscreen */
function openFullscreen(elem) {
    if (elem.requestFullscreen) {
        elem.requestFullscreen()
    } else if (elem.webkitRequestFullscreen) { /* Safari */
        elem.webkitRequestFullscreen()
    } else if (elem.msRequestFullscreen) { /* IE11 */
        elem.msRequestFullscreen()
    }
}

/* Close fullscreen */
function closeFullscreen() {
    if (document.exitFullscreen) {
        document.exitFullscreen()
    } else if (document.webkitExitFullscreen) { /* Safari */
        document.webkitExitFullscreen()
    } else if (document.msExitFullscreen) { /* IE11 */
        document.msExitFullscreen()
    }
}

function toggleFullScreen() {
    if(!fullScreen){
        openFullscreen(player)
    }else{
        closeFullscreen()
    }
    fullScreen = !fullScreen
}

function toggleSpeed() {
    video.playbackRate = playerSpeed.value
}

function toggleMute() {
    if(video.volume){
        lastVolumeClass = volumeIcon.className
        lastVolume = video.volume
        volumeIcon.className = ''
        video.volume = 0
        volumeIcon.classList.add('fas', 'fa-volume-mute')
        volumeIcon.setAttribute('title', 'Unmute')
        volumeBar.style.width = 0
    }else{
        volumeIcon.className = ''
        video.volume = lastVolume
        volumeIcon.className = lastVolumeClass
        volumeBar.style.width = `${lastVolume*100}%`
    }
}

function toggleVolume(e) {
    let lengthVolumeBar = e.offsetX / volumeRange.offsetWidth
   if (lengthVolumeBar < 0.1){
       lengthVolumeBar = 0
   }else if(lengthVolumeBar > 0.9){
       lengthVolumeBar = 1
   }
    volumeBar.style.width = `${lengthVolumeBar*100}%`
    video.volume = lengthVolumeBar
    volumeIcon.className = ''
    if (lengthVolumeBar > 0.5) {
        volumeIcon.classList.add('fas', 'fa-volume-up')
    } else if (lengthVolumeBar < 0.5 && lengthVolumeBar > 0) {
        volumeIcon.classList.add('fas', 'fa-volume-down')
    } else if (lengthVolumeBar === 0) {
        volumeIcon.classList.add('fas', 'fa-volume-off')
    }
    lastVolume = lengthVolumeBar
}

playbtn.addEventListener('click', playVideo)
video.addEventListener('click', playVideo)
video.addEventListener('ended', togglePauseIcon)
video.addEventListener('timeupdate', updateProgress)
video.addEventListener('canplay', updateProgress)
progressRange.addEventListener('click', updateProgressBar)
fullscreenBtn.addEventListener('click', toggleFullScreen)
playerSpeed.addEventListener('change', toggleSpeed)
volumeIcon.addEventListener('click', toggleMute)
volumeRange.addEventListener('click', toggleVolume)