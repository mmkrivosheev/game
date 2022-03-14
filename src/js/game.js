import { Map } from "./map";
import { Hero } from "./hero";
import { setCssProperties } from "./index";
import { HeroMapBorderRightCollisionDetector} from "./collisions";
import { HeroMapBorderLeftCollisionDetector } from "./collisions";
import { HeroMapBorderBottomCollisionDetector } from "./collisions";
import { HeroMapBorderTopCollisionDetector } from "./collisions";
import { HeroStaticBodyCollisionDetector } from "./collisions";
import { HeroCoinCollisionDetector } from "./collisions";

const PAUSE = "PAUSE";
const MENU = "MENU";
const SAVE = "SAVE";
const LEVEL = "LEVEL ";
const WON = "YOU WON !";
const VICTORY = "VICTORY !";
const GAME_OVER = "GAME OVER !";
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
        this.map = new Map();
        this.hero = new Hero(
            cellSize * 3 + cellSize / 2,
            cellSize * 11 + cellSize / 2,
            cellSize / 35
        );
        this.level = 0;
        this.levelTolal = this.map.maps.length;
        this.coins = 0;
        this.coinsTotal = 0;
        this.life = 4;
        this.isPlay = true;
        this.isPause = false;
        this.isSound = false;
        this.isMenu = false;
        this.isSave = false;

    }

    start() {
        this.level++;
        setCssProperties();
        this.map.drawMap(this.map.maps[this.level - 1]);
        this.hero.drawHero();
        this.hero.isPause = true;
        this.map.getCoinsTotal(this.map.maps[this.level - 1]);
        this.isSound
            ? scoreboard.classList.add("sound-on")
            : scoreboard.classList.add("sound-off");
        scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
        this.showAndHideMessage(LEVEL + this.level, null, 300);
        window.addEventListener("resize", setCssProperties);
        document.addEventListener("keydown", (e) => this.hero.moveHero(e));
    }

    pass() {
        const heroCellX = Math.floor(this.hero.posX / cellSize);
        const heroCellY = Math.floor(this.hero.posY / cellSize);

        if (this.hero.speedX > 0 &&
            heroCellX < this.map.maps[this.level - 1][0].length - 1 &&
            this.map.maps[this.level - 1][heroCellY][heroCellX + 1] !== 1)
            this.hero.posY = heroCellY * cellSize + cellSize / 2;

        if (this.hero.speedX < 0 &&
            heroCellX > 0 &&
            this.map.maps[this.level - 1][heroCellY][heroCellX - 1] !== 1)
            this.hero.posY = heroCellY * cellSize + cellSize / 2;

        if (this.hero.speedY > 0 &&
            heroCellY < this.map.maps[this.level - 1].length - 1 &&
            this.map.maps[this.level - 1][heroCellY < this.map.maps[this.level - 1].length - 1
                ? heroCellY + 1
                : heroCellY][heroCellX] !== 1)
            this.hero.posX = heroCellX * cellSize + cellSize / 2;

        if (this.hero.speedY < 0 &&
            heroCellY > 0 &&
            this.map.maps[this.level - 1][heroCellY ? heroCellY - 1 : 0][heroCellX] !== 1)
            this.hero.posX = heroCellX * cellSize + cellSize / 2;
    }

    pause(boolean) {
        if (!this.isPlay || this.isMenu || this.isSave) return;

        if (!boolean) {
            scoreboard.classList.toggle("life");
            this.isPause = !this.isPause;
        }

        if (this.isPause) {
            this.hero.speedX = 0;
            this.hero.speedY = 0;
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
        if (!this.isPause && !this.isSave && this.isPlay) scoreboard.classList.toggle("life");
        this.isMenu = !this.isMenu;
        this.isSave = false;

        if (this.isMenu) {
            scoreboard.innerHTML = MENU;
            this.map.drawMap();
            this.hero.isPause = true;
        } else {
            if (!this.isPlay && this.level !== this.levelTolal)
                scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;

            if (!this.isPlay && this.level === this.levelTolal)
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;

            this.map.drawMap(this.map.maps[this.level - 1]);
            this.hero.drawHero();
            this.pause(true);
        }
    }

    save() {
        if (!this.isPause && !this.isMenu && this.isPlay) scoreboard.classList.toggle("life");
        this.isSave = !this.isSave;
        this.isMenu = false;

        if (this.isSave) {
            scoreboard.innerHTML = SAVE;
            this.map.drawMap();
            this.hero.isPause = true;
        } else {
            if (!this.isPlay && this.level !== this.levelTolal)
                scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;

            if (!this.isPlay && this.level === this.levelTolal)
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;

            this.map.drawMap(this.map.maps[this.level - 1]);
            this.hero.drawHero();
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

        if (new HeroMapBorderRightCollisionDetector().detector(this.hero)) {
            this.hero.posX = cvsWidth - this.hero.size / 2;
            this.hero.speedX = 0;
        }

        if (new HeroMapBorderLeftCollisionDetector().detector(this.hero)) {
            this.hero.posX = this.hero.size / 2;
            this.hero.speedX = 0;
        }

        if (new HeroMapBorderBottomCollisionDetector().detector(this.hero)) {
            this.hero.posY = cvsHeight - this.hero.size / 2;
            this.hero.speedY = 0;
        }

        if (new HeroMapBorderTopCollisionDetector().detector(this.hero)) {
            this.hero.posY = this.hero.size / 2;
            this.hero.speedY = 0;
        }

        new HeroStaticBodyCollisionDetector()
            .detector(this.hero, this.map.maps[this.level - 1]).forEach(([x, y]) => {

            if (this.hero.speedX) {
                this.hero.posX = this.hero.speedX > 0
                    ? cellSize * x - cellSize / 2
                    : cellSize * x + cellSize * 1.5;
                this.hero.speedX = 0;
            }

            if (this.hero.speedY) {
                this.hero.posY = this.hero.speedY > 0
                    ? cellSize * y - cellSize / 2
                    : cellSize * y + cellSize * 1.5;
                this.hero.speedY = 0;
            }
        });

        new HeroCoinCollisionDetector()
            .detector(this.hero, this.map.maps[this.level - 1]).forEach(([x, y]) => {
            if (this.isSound) musicCoin.play();
            this.map.maps[this.level - 1][y][x] = 0;
            this.coins++;
        });

        scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
        this.map.drawMap(this.map.maps[this.level - 1]);
        this.hero.drawHero();

        if (this.coins === this.map.coinsTotal) {
        // if (this.coins === 4) {
            this.showAndHideMessage(WON, musicWin, 300);
            this.coinsTotal += this.coins;
            this.coins = 0;
            this.isPlay = false;
        }

        if (!this.isPlay && this.level === this.levelTolal)
            this.showAndHideMessage(VICTORY, null, 5000);


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

            if (!this.isPlay && this.level !== this.levelTolal) {
                this.isPlay = true;
                this.hero.posX = cellSize * 3 + cellSize / 2;
                this.hero.posY =cellSize * 11 + cellSize / 2;
                this.hero.speedX = 0;
                this.hero.speedY = 0;
                this.start();
            }

            if (!this.isPlay && this.level === this.levelTolal) {
                // this.map.drawMap();
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;
                scoreboard.classList.remove("life");
            }


        }, timeOn + 4300);
    }
}