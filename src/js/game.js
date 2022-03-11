import { Map } from "./map";
import { Hero } from "./hero";
import { setCssProperties } from "./index";
import { HeroMapBorderRightCollisionDetector} from "./collisions";
import { HeroMapBorderLeftCollisionDetector } from "./collisions";
import { HeroMapBorderBottomCollisionDetector } from "./collisions";
import { HeroMapBorderTopCollisionDetector } from "./collisions";
import { HeroStaticBodyCollisionDetector } from "./collisions";
import { HeroGrainCollisionDetector } from "./collisions";

const PAUSE = "PAUSE";
const MENU = "MENU";
const SAVE = "SAVE";
const LEVEL = "LEVEL ";
const WIN = "YOU WIN !!!";
const GAME_OVER = "GAME OVER !!!";
const musicCoin = new Audio();
const musicWin = new Audio();
const message = document.querySelector("#message");
const scoreboard = document.querySelector(".scoreboard");
musicCoin.preload = 'auto';
musicWin.preload = 'auto';
musicCoin.src = "src/audio/coin.mp3";
musicWin.src = "src/audio/win.mp3";

export class Game {
    constructor() {
        this.level = 1;
        this.coins = 0;
        this.isPlay = true;
        this.isPause = false;
        this.isSound = false;
        this.isMenu = false;
        this.isSave = false;
        this.map_1 = new Map();
        this.hero = new Hero(
            window.cellSize,
            window.cellSize * 3 + window.cellSize / 2,
            window.cellSize * 11 + window.cellSize / 2,
            window.cellSize / 29
        );
    }

    pass() {

        if (this.hero.speedX > 0 && (this.hero.posY + window.cellSize / 2) % window.cellSize < window.cellSize/2)
            this.hero.posY = Math.round(this.hero.posY / window.cellSize) * window.cellSize - window.cellSize / 2;

        if (this.hero.speedX > 0 && (this.hero.posY+window.cellSize / 2) % window.cellSize > window.cellSize / 2)
            this.hero.posY = Math.round(this.hero.posY / window.cellSize) * window.cellSize + window.cellSize / 2;

        if (this.hero.speedX < 0 && (this.hero.posY + window.cellSize / 2) % window.cellSize > window.cellSize / 2)
            this.hero.posY = Math.round(this.hero.posY / window.cellSize) * window.cellSize + window.cellSize / 2;

        if (this.hero.speedX < 0 && (this.hero.posY + window.cellSize / 2) % window.cellSize < window.cellSize / 2)
            this.hero.posY = Math.round(this.hero.posY / window.cellSize) * window.cellSize - window.cellSize / 2;


        if (this.hero.speedY < 0 && (this.hero.posX + window.cellSize / 2) % window.cellSize < window.cellSize / 2)
            this.hero.posX = Math.round(this.hero.posX / window.cellSize)*window.cellSize - window.cellSize / 2;

        if (this.hero.speedY < 0 && (this.hero.posX+window.cellSize / 2) % window.cellSize > window.cellSize / 2)
            this.hero.posX = Math.round(this.hero.posX / window.cellSize) * window.cellSize + window.cellSize / 2;

        if (this.hero.speedY > 0 && (this.hero.posX+window.cellSize / 2) % window.cellSize > window.cellSize / 2)
            this.hero.posX = Math.round(this.hero.posX / window.cellSize) * window.cellSize + window.cellSize / 2;

        if (this.hero.speedY > 0 && (this.hero.posX + window.cellSize / 2) % window.cellSize < window.cellSize / 2)
            this.hero.posX = Math.round(this.hero.posX / window.cellSize) * window.cellSize - window.cellSize / 2;

    }

    start() {
        setCssProperties();
        this.map_1.drawMap();
        this.hero.drawHero();
        this.hero.isPause = true;
        this.map_1.getCoinsTotal(this.map_1);
        this.isSound
            ? scoreboard.classList.add("sound-on")
            : scoreboard.classList.add("sound-off");
        scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
        this.showAndHideMessage(LEVEL + this.level, null, 300);
        window.addEventListener("resize", setCssProperties);
        document.addEventListener("keydown", (e) => this.hero.moveHero(e));
    }

    pause(boolean) {
        if (!this.isPlay || this.isMenu || this.isSave) return;

        if (!boolean) {
            scoreboard.classList.toggle("life");
            this.isPause = !this.isPause;
        }

        if (this.isPause) {
            scoreboard.innerHTML = PAUSE;
            this.hero.isPause = true;
        } else {
            this.tick();
            this.hero.isPause = false;
        }
    }

    soundOn() {
        this.isSound = !this.isSound;
        scoreboard.classList.add("sound-on");
        scoreboard.classList.toggle("sound-off");
    }

    menu() {
        if (!this.isPause && !this.isSave) scoreboard.classList.toggle("life");
        this.isMenu = !this.isMenu;
        this.isSave = false;

        if (this.isMenu) {
            scoreboard.innerHTML = MENU;
            this.hero.isPause = true;
        } else {
            if (!this.isPlay) scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
            this.pause(true);
        }
    }

    save() {
        if (!this.isPause && !this.isMenu) scoreboard.classList.toggle("life");
        this.isSave = !this.isSave;
        this.isMenu = false;

        if (this.isSave) {
            scoreboard.innerHTML = SAVE;
            this.hero.isPause = true;
        } else {
            if (!this.isPlay) scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
            this.pause(true);
        }
    }

    tick() {
        if (!this.isPlay) return;
        if (this.isPause) return;
        if (this.isMenu) return;
        if (this.isSave) return;

        this.pass();
        this.hero.posX += this.hero.speedX;
        this.hero.posY += this.hero.speedY;

        if (new HeroMapBorderRightCollisionDetector().detector(this.hero, this.map_1))
            this.hero.posX = this.map_1.cvsWidth - this.hero.size / 2;

        if (new HeroMapBorderLeftCollisionDetector().detector(this.hero))
            this.hero.posX = this.hero.size / 2;

        if (new HeroMapBorderBottomCollisionDetector().detector(this.hero, this.map_1))
            this.hero.posY = this.map_1.cvsHeight - this.hero.size / 2;

        if (new HeroMapBorderTopCollisionDetector().detector(this.hero))
            this.hero.posY = this.hero.size / 2;

        new HeroStaticBodyCollisionDetector().detector(this.hero, this.map_1).forEach(([x, y]) => {

            if (this.hero.speedX) {
                this.hero.posX = this.hero.speedX > 0
                    ? this.map_1.cellSize * x - this.map_1.cellSize / 2
                    : this.map_1.cellSize * x + this.map_1.cellSize * 1.5;
            }

            if (this.hero.speedY) {
                this.hero.posY = this.hero.speedY > 0
                    ? this.map_1.cellSize * y - this.map_1.cellSize / 2
                    : this.map_1.cellSize * y + this.map_1.cellSize * 1.5;
            }
        });

        new HeroGrainCollisionDetector().detector(this.hero, this.map_1).forEach(([x, y]) => {
            if (this.isSound) musicCoin.play();
            this.map_1.map[y][x] = 0;
            this.coins++;
        });

        if (this.coins === this.map_1.coinsTotal) {
            this.showAndHideMessage(WIN, musicWin, 300);
            this.isPlay = false;
        }

        this.map_1.drawMap();
        this.hero.drawHero();
        scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
        requestAnimationFrame(this.tick.bind(this));
    }

    showAndHideMessage(text, music, timeOn) {
        setTimeout(() => {
            if (this.isSound && music) music.play();
            message.innerHTML = text;
            message.classList.add("show-message");

        }, timeOn);

        setTimeout(() => {
            message.innerHTML = "";
            message.classList.remove("show-message");

            if (this.isPlay) {
                this.hero.isPause = false;
                this.tick();
            }
        }, timeOn + 4500);
    }
}