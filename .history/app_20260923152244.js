//==this js is only for the bansuri studio and everything is gonna be built from oscillators. (no audio files are gonna be incorporated)

const ctx = new (window.AudioContext || window.webkitAudioContext)(),
    $ = id => document.getElementById(id);

const thaats = { biliwal: [0, 2, 3, 4, 5, 7, 9, 11, 12], yaman: [0, 2, 3, 6, 7, 9, 11, 12], bhairav: [0, 1, 4, 5, 7, 8, 11, 12], kafi: [0, 2, 3, 5, 7, 8, 10, 12] };
const swaras = ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni", "Sa"]