import { Game } from "./game";
import { Map } from "./map";
import { Hero } from "./hero";
import {Antihero} from "./antihero";
import "../scss/index.scss";

const btns = document.querySelectorAll(".btn");
const btnPause = document.querySelector("#btn-pause");
const btnSound = document.querySelector("#btn-sound");
const btnMenu = document.querySelector("#btn-menu");
const btnSave = document.querySelector("#btn-save");
const mq = window.matchMedia('(max-width: 1199px)');

const game = new Game();
game.start();

document.addEventListener("DOMContentLoaded", () => {
    document.body.style.display = "flex";
});

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
    game.map = new Map(this);
    game.hero = new Hero(this, 3, 11, game.heroSpeed);
    game.antihero_1 = new Antihero(this, 0, 0, game.antiheroSpeed);
    game.antihero_2 = new Antihero(this, 18, 0, game.antiheroSpeed);
    game.antihero_3 = new Antihero(this, 18, 19, game.antiheroSpeed);
    game.antihero_4 = new Antihero(this, 0, 19, game.antiheroSpeed);

});

export function setCssProperties() {
    document.body.style.fontSize = cellSize + "px";

    for (let btn of btns) {
        btn.style.textShadow = "0 0 " + cvsBorder / 7 + "px #464b51";
    }

    if (mq.matches)
        document.body.style.width = "100%";
    else
        document.body.style.width = cvsWidth + cellSize + "px";

    mq.addListener((mq) => {
        if (mq.matches)
            document.body.style.width = "100%";
        else
            document.body.style.width = cvsWidth + cellSize + "px";
    });
}