"use strict";

//Häntar knapparna för mobilmenyn
let openBtn = document.getElementById("open-menu");
let closeBtn = document.getElementById("close-menu");

let languageOpenBtn = document.getElementById("language-menu");
let languageCloseBtn = document.getElementById("language-close");

// Ger knapparna sina funktioner att öppna och stänga.
openBtn.addEventListener('click', toggleMenu);
closeBtn.addEventListener('click', toggleMenu);

function toggleMenu() {
    let mySidenavEl = document.getElementById("mySidenav");
    let style = window.getComputedStyle(mySidenavEl);

    if (style.display === "none") {
        mySidenavEl.style.display = "block";
    } else {
        mySidenavEl.style.display = "none";
    }

}

let square2El = document.getElementById('square2');
square2El.addEventListener('click', flip)

function fli() {
    document.getElementById('square2').className += ' flipme';
}

function flip() {
    document.getElementById('square2').className += ' flipme';
    setTimeout(function () {
        document.getElementById('square2').className += 'square2'
    }, 2000);
}

