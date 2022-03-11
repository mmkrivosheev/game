import { Map } from "./map";
import { Hero } from "./hero";
import { Game } from "./game";
import "../scss/index.scss";

const header = document.querySelector(".header");
const scoreboard = document.querySelector(".scoreboard");
const btns = document.querySelectorAll(".btn");
const btnPause = document.querySelector("#btn-pause");
const btnSound = document.querySelector("#btn-sound");
const btnMenu = document.querySelector("#btn-menu");
const btnSave = document.querySelector("#btn-save");
const mq = window.matchMedia('(max-width: 1199px)');

const game = new Game();
game.start();

document.addEventListener("keydown", (e) => {
    if (e.key === "Control") game.pause();
});

btnPause.addEventListener("click", (e) => {
    btnPause.blur();
    game.pause(false);
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
});

window.addEventListener("resize", () => {
    game.map_1 = new Map();
    game.hero = new Hero(
        window.cellSize,
        window.cellSize * 3 + window.cellSize / 2,
        window.cellSize * 11 + window.cellSize / 2,
        window.cellSize / 29
    );
});

export function setCssProperties() {
    document.body.style.width = window.cvsWidth + window.cellSize + "px";
    header.style.marginTop = window.cvsBorder + "px";
    header.style.marginBottom = window.cvsBorder + "px";
    scoreboard.style.fontSize = window.cellSize + "px";
    scoreboard.style.width = window.cellSize * 9.5 + "px";
    scoreboard.style.paddingLeft = window.cvsBorder + "px";

    for (let btn of btns) {
        btn.style.fontSize = window.cellSize / 1.6 + "px";
        btn.style.padding = window.cellSize / 6 + "px";
        btn.style.textShadow = "0 0 " + window.cvsBorder / 7 + "px #464b51";
    }

    if (mq.matches)
        document.body.style.width = "100%";
    else
        document.body.style.width = window.cvsWidth + window.cellSize + "px";

    mq.addListener((mq) => {
        if (mq.matches)
            document.body.style.width = "100%";
        else
            document.body.style.width = window.cvsWidth + window.cellSize + "px";
    });
}