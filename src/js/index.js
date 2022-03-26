import { Game } from "./game";
import { getData, updateData } from "./records";
import * as screen from "./screen";
import "../scss/index.scss";

const menu = document.querySelector("#menu");
const save = document.querySelector("#save");
const modalOpen = document.querySelector("#modal-open");
const coinsTotal = save.querySelector("#total");
const btnPause = document.querySelector("#btn-pause");
const btnSound = document.querySelector("#btn-sound");
const btnMenu = document.querySelector("#btn-menu");
const btnSave = document.querySelector("#btn-save");
const btnMenuNewGame = menu.querySelector("#btn-new-game");
const btnMenuRules = menu.querySelector("#btn-rules");
const scoreboard = document.querySelector(".scoreboard");
const inputName = save.querySelector("#input-name");
const btnSaveResult = save.querySelector("#btn-save-result");
const btnShowResults = save.querySelector("#btn-show-results");
const btnOk = modalOpen.querySelector("#btn-ok");
const btnSet = document.querySelector(".btn-set");
const btnSetMobile = document.querySelector(".btn-set-mobile");
let resultCoinsTotal;

screen.calcCvsSize();
let game = new Game();
game.start();

document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.display = "block";
    screen.getScreenChange();
});

window.addEventListener("resize", () => screen.resize(game));

document.addEventListener("keydown", (e) => {
    if (e.key === "Control") game.pause();
});

btnPause.addEventListener("click", () => {
    btnPause.blur();
    game.pause();
});

btnSound.addEventListener("click", () => {
    btnSound.blur();
    game.soundOn();
});

btnMenu.addEventListener("click", () => {
    btnMenu.blur();
    game.menu();
});


btnMenuNewGame.addEventListener("click", () => {
    game.isPlay = false;
    menu.classList.remove("show-menu");
    scoreboard.classList.add("life");
    btnMenu.blur();
    game = new Game();
    scoreboard.setAttribute("data-life", game.life);
    game.start();
});

btnMenuRules.addEventListener("click", () => {
    btnMenuRules.blur();
    modalOpen.querySelector(".title").innerHTML = "rules";
    modalOpen.querySelector(".text").innerHTML = `
        The game has two rounds and you have three lives.
        You need to collect all the coins on the map. <br><br>
        Control: <br>
        move - arrow keys or control panel for mobile devices,
        pause - ctrl key.
    `;

    modalOpen.classList.add("show-modal-open");
    game.isModalOpenShow = true;
});

btnOk.addEventListener("click", () => {
    modalOpen.classList.remove("show-modal-open");
    game.isModalOpenShow = false;
    modalOpen.querySelector(".text").style.width = "";
});

btnSave.addEventListener("click", () => {
    btnSave.blur();
    game.save();
    resultCoinsTotal = game.isPlay ? game.coinsTotal + game.coins : game.coinsTotal;
    coinsTotal.innerHTML = "total coins: " + resultCoinsTotal;
});

btnSaveResult.addEventListener("click", (e) => {
    e.preventDefault();
    btnSaveResult.blur();
    updateData(escapeHTML(inputName.value), resultCoinsTotal);
    inputName.value = "";
});

btnShowResults.addEventListener("click", () => {
    btnShowResults.blur();
    getData(game);
});


btnSetMobile.addEventListener("click", () => {
    btnSet.classList.toggle("show-btn-set");
    btnSetMobile.blur();
});

function escapeHTML(text) {
    if (!text)
        return text;
    text = text.toString()
        .split("&").join("&amp;")
        .split("<").join("&lt;")
        .split(">").join("&gt;")
        .split('"').join("&quot;")
        .split("'").join("&#039;");
    return text;
}