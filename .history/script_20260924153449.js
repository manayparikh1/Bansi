//==this js is only for the bansuri studio and everything is gonna be built from oscillators. (no audio files are gonna be incorporated)

const ctx = new (window.AudioContext || window.webkitAudioContext)(),
    $ = id => document.getElementById(id);

const thaats = { biliwal: [0, 2, 3, 4, 5, 7, 9, 11, 12], yaman: [0, 2, 3, 6, 7, 9, 11, 12], bhairav: [0, 1, 4, 5, 7, 8, 11, 12], kafi: [0, 2, 3, 5, 7, 8, 10, 12] };
const swaras = ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni", "Sa"], deva = ["सा", "रे", "ग", "म", "प", "ध", "नि", "सां"], keys = ["a", "s", "d", "f", "g", "h", "j", "k"];
//These are real fingerings gotten straight from bansuri and 1 means closed and 0 means open.
let thaat = "bilawal", baseHz = 293.66, drone = null;
const voices = new Map(), padBox = $("thepads")
swaras.forEach((n, i) => padBox.insertAdjacentHTML("beforeend", `<button class="pad" data-i="${i}"><b>${DEVA[i]}</b><span>${n}</span><kbd>${KEYS[i].toUpperCase()}</kbd></button>`));
const thepads = [...document.querySelectorAll(".pad")];

const hzFor = i => baseHz * 2 ** (thaats[thaat][i] / 12);

function playNote(i) {
    if (voices.has(i)) return;
    const osc = ctx.createoscillator(), gain = ctx.createGain();
    osc.type = "sine"; osc.frequency.value = hzFor(i);
    gain.gain.setValueAtTime(0.3, ctx.currentTime);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    voices.set(i, { osc, gain });
    pads[i].classList.add("lit");
    $("breath").textContent = SWARAS[i];
}

function stopNote(i) {
    const v = voices.get(i);
    if (!v) return;
    v.gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
    v.osc.stop(ctx.currentTime + 0.2);
    voices.delete(i);
    pads[i].classList.remove("lit");
    if (voices.size === 0) $("breath").textContent = "resting";
}