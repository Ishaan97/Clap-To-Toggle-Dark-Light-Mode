import {initModel} from "./clapping-tf.js"

const toggleSwitch = document.querySelector('input[type="checkbox"]');

const nav = document.getElementById('nav');
const toggleIcon = document.getElementById('toggle-icon');
const image1 = document.getElementById('image1');
const image2 = document.getElementById('image2');
const image3 = document.getElementById('image3');
const textbox = document.getElementById('text-box');

const mic = document.getElementById("span-mic");


// Dark/Light Images
function imageMode(color){
    image1.src = `img/undraw_proud_coder_${color}.svg`;
    image2.src = `img/undraw_feeling_proud_${color}.svg`;
    image3.src = `img/undraw_conceptual_idea_${color}.svg`;
}

function toggleDarkLightMode(isLight){
    nav.style.backgroundColor = isLight ? 'rgb(255 255 255 / 50%)' : 'rgb(0 0 0 / 50%)';
    textbox.style.backgroundColor = isLight ? 'rgb(0 0 0 / 50%)' : 'rgb(255 255 255 / 50%)';
    toggleIcon.children[0].textContent = isLight ? "Light Mode" : "Dark Mode";

    isLight ? toggleIcon.children[1].classList.replace('fa-moon', 'fa-sun') : 
                    toggleIcon.children[1].classList.replace('fa-sun', 'fa-moon');
    let theme = isLight ? 'light' : 'dark';

    imageMode(theme);
}   

// Switch theme dynamically
function switchTheme(event){
    if(event.target.checked){
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        toggleDarkLightMode(false);
    }else{
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        toggleDarkLightMode(true);
    }
}

// Clapping Mic Function
var listening = false;
function classify(){

    listening = !listening;
    initModel(listening);

    setTimeout(()=>{
        listening ? mic.children[0].classList.replace('fa-microphone-slash', 'fa-microphone') : 
                mic.children[0].classList.replace('fa-microphone', 'fa-microphone-slash') ;
    }, 1500)
    
}

// Event Listener
toggleSwitch.addEventListener('change', switchTheme);
mic.addEventListener("click", classify)

// Check Local storage
const currentTheme = localStorage.getItem('theme');
if(currentTheme){
    document.documentElement.setAttribute('data-theme', currentTheme);
    if(currentTheme === 'dark'){
        toggleSwitch.checked = true;
        toggleDarkLightMode(true);
    }
}else{
    document.documentElement.setAttribute('data-theme', 'light');
}
