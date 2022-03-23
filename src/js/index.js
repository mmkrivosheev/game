import { Game } from "./game";
import * as screen from "./screen";
import "../scss/index.scss";
import {Map} from "./map";
import {Hero} from "./hero";
import {Antihero} from "./antihero";

const menu = document.querySelector("#menu");
const save = document.querySelector("#save");
const rules = document.querySelector("#rules");
const coinsTotal = save.querySelector("#total");
const btnPause = document.querySelector("#btn-pause");
const btnSound = document.querySelector("#btn-sound");
const btnMenu = document.querySelector("#btn-menu");
const btnSave = document.querySelector("#btn-save");
const btnMenuNewGame = menu.querySelector("#btn-new-game");
const btnMenuRules = menu.querySelector("#btn-rules");
const scoreboard = document.querySelector(".scoreboard");
const btnSaveResult = save.querySelector("#btn-save-result");
const btnOk = rules.querySelector("#btn-ok");
const btnSet = document.querySelector(".btn-set");
const btnSetMobile = document.querySelector(".btn-set-mobile");

screen.calcCvsSize()
let game = new Game();
game.start();

document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.display = "block";
});

rules.querySelector(".text").innerHTML = `
The game has two rounds and you have three lives.
You need to collect all the coins on the map. <br><br>
Control: <br>
move - arrow keys or control panel for mobile devices,
pause - ctrl key.
`;

document.addEventListener("keydown", (e) => {
    if (e.key === "Control") game.pause();
});

btnPause.addEventListener("click", (e) => {
    btnPause.blur();
    game.pause();
});

btnSound.addEventListener("click", (e) => {
    btnSound.blur();
    game.soundOn();
});

btnMenu.addEventListener("click", (e) => {
    btnMenu.blur();
    game.menu();
});

btnSave.addEventListener("click", (e) => {
    btnSave.blur();
    game.save();
    coinsTotal.innerHTML = "total coins: " +
        (game.isPlay
        ? game.coinsTotal + game.coins
        : game.coinsTotal);
});

btnMenuNewGame.addEventListener("click", (e) => {
    game.isPlay = false;
    menu.classList.remove("show-menu");
    scoreboard.classList.add("life");
    btnMenu.blur();
    game = new Game();
    game.start();
    scoreboard.setAttribute("data-life", game.life);
});

btnMenuRules.addEventListener("click", (e) => {
    rules.classList.add("show-rules");
    game.isRulesShow = true;
    btnMenu.blur();
});


btnOk.addEventListener("click", (e) => {
    rules.classList.remove("show-rules");
    game.isRulesShow = false;
});

btnSaveResult.addEventListener("click", (e) => {
    e.preventDefault();
    btnSaveResult.blur();
    //
});

btnSetMobile.addEventListener("click", (e) => {
    btnSet.classList.toggle("show-btn-set");
    btnSetMobile.blur();
});

screen.watchScreenChange(game);