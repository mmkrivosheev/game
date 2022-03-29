import { Game } from "./game";
import { addBaseHandlers, addHandlers } from "./handlers";
import * as screen from "./screen";
import "../scss/index.scss";

screen.calcCvsSize();
window.isSound = false;
let SPAState = {};
let game;
let continueGame = false;
const NO_SAVE = "There is not a saved game";
const btnMenu = document.querySelector("#btn-menu");
const btnSave = document.querySelector("#btn-save");

window.onbeforeunload = noSave;
window.addEventListener("resize", () => screen.resize(game));
window.onhashchange = switchToStateFromURLHash;
switchToStateFromURLHash();
addBaseHandlers();

export function switchToStateFromURLHash() {
    const URLHash = window.location.hash;
    const stateStr = URLHash.substr(1);
    let pageHTML = "";

    if (stateStr !== "") SPAState = {pageName: stateStr};
    else SPAState = {pageName: "main"};

    switch (SPAState.pageName) {
        case "main":
            if (game) game.isExit = true;
            pageHTML += "<canvas id=\"cvs\" class=\"cvs\"></canvas>";
            pageHTML += "<div class=\"welcome\">";
            pageHTML += "<p class=\"title\">Welcome !</p>";
            pageHTML += "<p class=\"text\">This game was created as a graduation project of the course: ";
            pageHTML += "<span>Javascript web application development.</span></p>";
            pageHTML += "</div>";
            document.querySelector(".main").innerHTML = pageHTML;
            addHandlers(game);
            break;
        case "game":
            pageHTML += "<canvas id=\"cvs\" class=\"cvs\"></canvas>";
            pageHTML += "<div id=\"modal\" class=\"modal\"></div>";
            document.querySelector(".main").innerHTML = pageHTML;
            if (!continueGame) {
                game = new Game(isSound);
                game.start();
                addHandlers(game);
            } else {
                game.start(continueGame);
                continueGame = false;
            }
            break;
        case "menu":
            if (game) game.isExit = true;
            pageHTML += "<canvas id=\"cvs\" class=\"cvs\"></canvas>";
            pageHTML += "<div class=\"menu\" id=\"menu\">";
            pageHTML += "<button type=\"button\" id=\"btn-continue\" class=\"btn-menu\">continue</button>";
            pageHTML += "<button type=\"button\" id=\"btn-new-game\" class=\"btn-menu\">new game</button>";
            pageHTML += "<button type=\"button\" id=\"btn-rules\" class=\"btn-menu\">rules</button>";
            pageHTML += "<button type=\"button\" id=\"btn-main\" class=\"btn-menu\">main</button>";
            pageHTML += "<p class=\"error\" id=\"error\"></p>";
            pageHTML += "</div>";
            pageHTML += "<div id=\"modal-open\" class=\"modal-open\">";
            pageHTML += "<p class=\"title\"></p>";
            pageHTML += "<p class=\"text\"></p>";
            pageHTML += "<p id=\"btn-ok\" class=\"btn-ok\">ok</p>";
            pageHTML += "</div>";
            document.querySelector(".main").innerHTML = pageHTML;
            addHandlers(game);
            break;
        case "save":
            if (game) game.isExit = true;
            pageHTML += "<canvas id=\"cvs\" class=\"cvs\"></canvas>";
            pageHTML += "<div class=\"save\" id=\"save\">";
            pageHTML += "<p class=\"total\" id=\"total\"></p>";
            pageHTML += "<p class=\"message\" id=\"message\">";
            pageHTML += "If you want to save the result, enter your name and click save.</p>";
            pageHTML += "<form>";
            pageHTML += "<input type=\"text\" id=\"input-name\" class=\"input-name\">";
            pageHTML += "<button type=\"submit\" id=\"btn-save-result\" class=\"btn-save-result\">save</button>";
            pageHTML += "</form>";
            pageHTML += "<p class=\"error\" id=\"error\"></p>";
            pageHTML += "<button type=\"submit\" id=\"btn-show-results\" class=\"btn-show-results\">";
            pageHTML += "Show the best results</button>";
            pageHTML += "</div>";
            pageHTML += "<div id=\"modal-open\" class=\"modal-open\">";
            pageHTML += "<p class=\"title\"></p>";
            pageHTML += "<p class=\"text\"></p>";
            pageHTML += "<p id=\"btn-ok\" class=\"btn-ok\">ok</p>";
            pageHTML += "</div>";
            document.querySelector(".main").innerHTML = pageHTML;
            addHandlers(game);
            break;
    }
}

function switchToState(newState) {
    location.hash = newState.pageName;
}

export function switchToMainPage() {
    switchToState({pageName:""});
}

export function switchToGamePage(isGame) {
    if (isGame) continueGame = true;
    switchToState({pageName:"game"});
}

function switchToMenuPage() {
    switchToState({pageName: "menu"});
}

function switchToSavePage() {
    switchToState({pageName: "save"});
}

btnMenu.addEventListener("click", () => {
    btnMenu.blur();
    switchToMenuPage();
});

btnSave.addEventListener("click", () => {
    btnSave.blur();
    switchToSavePage();
});

function noSave(e) {
    if (game && game.life && game.winTotal !== game.levelTolal)
        e.returnValue = alert(NO_SAVE);
}