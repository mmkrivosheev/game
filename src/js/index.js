import { Game } from "./game";
import * as screen from "./screen";
import "../scss/index.scss";

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

screen.calcCvsSize();
let game = new Game();
game.start();

document.addEventListener("DOMContentLoaded", () => {
    document.documentElement.style.display = "block";
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

btnSave.addEventListener("click", () => {
    btnSave.blur();
    game.save();
    coinsTotal.innerHTML = "total coins: " +
        (game.isPlay
        ? game.coinsTotal + game.coins
        : game.coinsTotal);
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
    rules.classList.add("show-rules");
    game.isRulesShow = true;
    btnMenu.blur();
});


btnOk.addEventListener("click", () => {
    rules.classList.remove("show-rules");
    game.isRulesShow = false;
});

btnSaveResult.addEventListener("click", (e) => {
    e.preventDefault();
    btnSaveResult.blur();
    //
});

btnSetMobile.addEventListener("click", () => {
    btnSet.classList.toggle("show-btn-set");
    btnSetMobile.blur();
});

rules.querySelector(".text").innerHTML = `
The game has two rounds and you have three lives.
You need to collect all the coins on the map. <br><br>
Control: <br>
move - arrow keys or control panel for mobile devices,
pause - ctrl key.
`;

screen.watchScreenChange(game);

