import { switchToGamePage, switchToMainPage } from "./index";
import { getData, updateData } from "./records";
import * as screen from "./screen";

const MAIN = "MAIN";
const MENU = "MENU";
const SAVE = "SAVE";
const NO_GAME = "No starting game";

export function addBaseHandlers() {
    const btnSound = document.querySelector("#btn-sound");
    const btnSet = document.querySelector(".btn-set");
    const btnSetMobile = document.querySelector(".btn-set-mobile");
    const scoreboard = document.querySelector(".scoreboard");

    document.addEventListener("DOMContentLoaded", () => {
        document.documentElement.style.display = "block";
        screen.getScreenChange();
    });

    isSound
        ? scoreboard.classList.add("sound-on")
        : scoreboard.classList.add("sound-off");

    btnSound.addEventListener("click", () => {
        btnSound.blur();
        window.isSound = !isSound;
        scoreboard.classList.add("sound-on");
        scoreboard.classList.toggle("sound-off");
    });

    btnSetMobile.addEventListener("click", () => {
        btnSet.classList.toggle("show-btn-set");
        btnSetMobile.blur();
    });
}

export function addHandlers(game) {
    const URLHash = window.location.hash;
    const stateStr = URLHash.substr(1);
    const scoreboard = document.querySelector(".scoreboard");
    const btnPause = document.querySelector("#btn-pause");

    if (stateStr === "game") {
        scoreboard.setAttribute("data-life", game.life);
        scoreboard.classList.add("life");

        btnPause.addEventListener("click", () => {
            btnPause.blur();
            game.pause();
        });

        document.addEventListener("keydown", (e) => {
            if (e.key === "Control") game.pause();
        });
    }

    if (stateStr === "") {
        scoreboard.innerHTML = MAIN;
        scoreboard.classList.remove("life");
        drawEmptyCanvas();
    }

    if (stateStr === "menu") {
        const menu = document.querySelector("#menu");
        const btnMenuContinue = menu.querySelector("#btn-continue");
        const btnMenuNewGame = menu.querySelector("#btn-new-game");
        const btnMenuMain = menu.querySelector("#btn-main");
        const btnMenuRules = menu.querySelector("#btn-rules");
        const modalOpen = document.querySelector("#modal-open");
        const btnOk = modalOpen.querySelector("#btn-ok");
        const menuError = document.querySelector("#menu #error");

        scoreboard.innerHTML = MENU;
        scoreboard.classList.remove("life");
        drawEmptyCanvas();

        btnMenuContinue.addEventListener("click", () => {
            btnMenuContinue.blur();
            if (game && game.life) switchToGamePage(true);
            else {
                menuError.innerHTML = NO_GAME;
                setTimeout(() => {
                    if (menuError) menuError.innerHTML = "";
                }, 2000);
            }
        });

        btnMenuNewGame.addEventListener("click", () => {
            btnMenuNewGame.blur();
            switchToGamePage();
        });

        btnMenuMain.addEventListener("click", () => {
            btnMenuMain.blur();
            switchToMainPage();
        });

        btnOk.addEventListener("click", () => {
            modalOpen.classList.remove("show-modal-open");
            modalOpen.querySelector(".text").style.width = "";
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
        });
    }

    if (stateStr === "save") {
        const save = document.querySelector("#save");
        const btnSaveResult = save.querySelector("#btn-save-result");
        const btnShowResults = save.querySelector("#btn-show-results");
        const inputName = save.querySelector("#input-name");
        const modalOpen = document.querySelector("#modal-open");
        const btnOk = modalOpen.querySelector("#btn-ok");
        const coinsTotal = document.querySelector("#save #total");
        let resultCoinsTotal;

        if (game) resultCoinsTotal = game.isPlay ? game.coinsTotal + game.coins : game.coinsTotal;
        coinsTotal.innerHTML = "total coins: " + (resultCoinsTotal || 0);
        scoreboard.innerHTML = SAVE;
        scoreboard.classList.remove("life");
        drawEmptyCanvas();

        btnSaveResult.addEventListener("click", (e) => {
            e.preventDefault();
            btnSaveResult.blur();
            updateData(escapeHTML(inputName.value), resultCoinsTotal);
            inputName.value = "";
        });

        btnShowResults.addEventListener("click", () => {
            btnShowResults.blur();
            getData();
        });

        btnOk.addEventListener("click", () => {
            modalOpen.classList.remove("show-modal-open");
            modalOpen.querySelector(".text").style.width = "";
        });
    }
}

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

export function drawEmptyCanvas() {
    const cvs = document.getElementById("cvs");
    cvs.width = cvsWidth;
    cvs.height = cvsHeight;
    cvs.style.border = cvsBorder + "px solid #DAD0D0";
}