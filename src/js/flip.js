let square2El = document.getElementById('square2');
square2El.addEventListener('click', flip)

function flip() {
    document.getElementById('square2').className += ' flipme';
    setTimeout(function () {
        document.getElementById('square2').className += 'square2'
    }, 2000);
}