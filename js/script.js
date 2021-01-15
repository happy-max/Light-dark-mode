const toggleSwitch = document.querySelector('input[type="checkbox"]')
const toggleIcon = document.getElementById('toggle-icon')
const image1 = document.getElementById('image1')
const image2 = document.getElementById('image2')
const image3 = document.getElementById('image3')

function imageMode(mode) {
    image1.src = `img/undraw_proud_coder_${mode}.svg`
    image2.src = `img/undraw_feeling_proud_${mode}.svg`
    image3.src = `img/undraw_conceptual_idea_${mode}.svg`
}

function switchDarkMode(dark) {
    const icon = toggleIcon.children[1].classList
    dark ? icon.replace('fa-sun', 'fa-moon') : icon.replace('fa-moon', 'fa-sun')
    toggleIcon.children[0].textContent = dark ? 'Dark Mode' : 'Light Mode'
    imageMode(dark ? 'dark' : 'light')
}


function switchTheme(event) {
    if (event.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark')
        switchDarkMode(true)
        localStorage.setItem('theme', 'dark')
    } else {
        document.documentElement.setAttribute('data-theme', 'light')
        switchDarkMode(false)
        localStorage.setItem('theme', 'light')
    }
}

toggleSwitch.addEventListener('change', switchTheme)
const currentItem = localStorage.getItem('theme')
if (currentItem) {
    document.documentElement.setAttribute('data-theme', currentItem)
    if (currentItem === 'dark') {
        toggleSwitch.checked = true
        switchDarkMode(true)
    }
}
