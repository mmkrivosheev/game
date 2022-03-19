import { Game } from "./game";
import { Map } from "./map";
import { Hero } from "./hero";
import {Antihero} from "./antihero";
import "../scss/index.scss";

const menu = document.querySelector("#menu");
const save = document.querySelector("#save");
const rules = document.querySelector("#rules");
const coinsTotal = save.querySelector("#total");
const btns = document.querySelectorAll(".btn");
const btnsMenu = menu.querySelectorAll(".btn-menu");
const btnPause = document.querySelector("#btn-pause");
const btnSound = document.querySelector("#btn-sound");
const btnMenu = document.querySelector("#btn-menu");
const btnSave = document.querySelector("#btn-save");
const btnMenuNewGame = menu.querySelector("#btn-new-game");
const btnMenuRules = menu.querySelector("#btn-rules");
const inputName = save.querySelector("#input-name");
const btnSaveResult = save.querySelector("#btn-save-result");
const btnOk = rules.querySelector("#btn-ok");
const modal = document.querySelector("#modal");
const mq = window.matchMedia('(max-width: 1199px)');

let game = new Game();
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
    menu.classList.toggle("show-menu");
    modal.classList.remove("show-modal");
});

btnSave.addEventListener("click", (e) => {
    btnSave.blur();
    game.save();
    save.classList.toggle("show-save");
    modal.classList.remove("show-modal");
    coinsTotal.innerHTML = "total coins: " + (game.coinsTotal + game.coins);
});

btnMenuNewGame.addEventListener("click", (e) => {
    menu.classList.remove("show-menu");
    btnMenu.blur();
    game.isPlay =false;
    game = new Game();
    game.start();
});

btnMenuRules.addEventListener("click", (e) => {
    rules.classList.add("show-rules");
    btnMenu.blur();
    game.isPlay =false;
    game = new Game();
    game.start();
});


btnOk.addEventListener("click", (e) => {
    rules.classList.remove("show-rules");
});

btnSaveResult.addEventListener("click", (e) => {
    btnSaveResult.blur();
    //
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

    for (let btn of btnsMenu) {
        btn.style.textShadow = "0 0 " + cvsBorder / 7 + "px #464b51";
    }

    btnSaveResult.style.textShadow = "0 0 " + cvsBorder / 7 + "px #464b51";

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