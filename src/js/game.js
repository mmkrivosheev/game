import { Map } from "./map";
import { Hero } from "./hero";
import { Antihero } from "./antihero";
import { setCssProperties } from "./index";

const PAUSE = "PAUSE";
const MENU = "MENU";
const SAVE = "SAVE";
const LEVEL = "LEVEL ";
const WON = "YOU WON !";
const VICTORY = "VICTORY !";
const GAME_OVER = "GAME OVER !";
const musicWin = new Audio();
const modal = document.querySelector("#modal");
const scoreboard = document.querySelector(".scoreboard");
musicWin.preload = 'auto';
musicWin.src = "src/audio/win.mp3";

const musicGameOver = new Audio();
musicGameOver.preload = 'auto';
musicGameOver.src = "src/audio/lose.mp3";

export class Game {

    constructor() {
        this.heroSpeed = 35;
        this.antiheroSpeed = 30;
        this.map = new Map(this);
        this.hero = new Hero(this, 3, 11, this.heroSpeed);
        this.antihero_1 = new Antihero(this, 0, 0, this.antiheroSpeed);
        this.antihero_2 = new Antihero(this, 18, 0, this.antiheroSpeed);
        this.antihero_3 = new Antihero(this, 18, 19, this.antiheroSpeed);
        this.antihero_4 = new Antihero(this, 0, 19, this.antiheroSpeed);
        this.levelTolal = this.map.maps.length;
        this.coinsTotal = null;
        this.level = 0;
        this.coins = 0;
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
        this.antihero_1.drawAntihero();
        this.antihero_2.drawAntihero();
        this.antihero_3.drawAntihero();
        this.antihero_4.drawAntihero();
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
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
            // this.pause(true);
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
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
            this.pause(true);
        }
    }

    tick() {
        // if (!this.isPlay || this.isPause || this.isMenu || this.isSave) return;
        if (!this.isPlay || this.isPause || this.isSave) return;

        this.hero.passBetweenBodies();
        this.antihero_1.passBetweenBodies();
        this.antihero_2.passBetweenBodies();
        this.antihero_3.passBetweenBodies();
        this.antihero_4.passBetweenBodies();

        this.hero.calcNewPos();
        this.antihero_1.calcNewPos();
        this.antihero_2.calcNewPos();
        this.antihero_3.calcNewPos();
        this.antihero_4.calcNewPos();

        this.hero.collision.mapBorderDetector();
        this.hero.collision.staticBodyDetector();
        this.hero.collision.coinDetector();
        this.hero.collision.antiheroDetector(this.antihero_1);
        this.hero.collision.antiheroDetector(this.antihero_2);
        this.hero.collision.antiheroDetector(this.antihero_3);
        this.hero.collision.antiheroDetector(this.antihero_4);

        this.hero.getReactionToMapBorderCollision();
        this.hero.getReactionToStaticBodyCollision();
        this.hero.getReactionToCoinCollision();

        if (!this.isMenu) {
            this.map.drawMap(this.map.maps[this.level - 1]);
            this.hero.drawHero();
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
        }

        this.antihero_1.moveAntihero();
        this.antihero_2.moveAntihero();
        this.antihero_3.moveAntihero();
        this.antihero_4.moveAntihero();


        if (!this.life) {
            this.showAndHideMessage(GAME_OVER, musicGameOver, 300);
            this.coinsTotal += this.coins;
            this.isPlay = false;
        }

        if (this.coins === this.map.coinsTotal) {
        // if (this.coins === 4) {
            this.showAndHideMessage(WON, musicWin, 300);
            this.coinsTotal += this.coins;
            this.coins = 0;
            this.isPlay = false;
        }

        if (!this.isPlay && this.level === this.levelTolal)
            this.showAndHideMessage(VICTORY, null, 5000);

        scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
        requestAnimationFrame(this.tick.bind(this));
    }

    showAndHideMessage(text, music, timeOn) {
        setTimeout(() => {
            if (this.isSound) music.play();
            modal.innerHTML = text;
            modal.classList.add("show-modal");

        }, timeOn);

        setTimeout(() => {
            modal.innerHTML = "";
            modal.classList.remove("show-modal");

            if (this.isPlay) {
                this.hero.isPause = false;
                this.tick();
            }

            if (!this.isPlay && this.level !== this.levelTolal && this.life) {
                this.isPlay = true;
                this.hero.posX = cellSize * 3 + cellSize / 2;
                this.hero.posY =cellSize * 11 + cellSize / 2;
                this.hero.speedX = 0;
                this.hero.speedY = 0;
                this.start();
            }

            if (!this.isPlay && this.level === this.levelTolal ||
                !this.isPlay && !this.life) {
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;
                scoreboard.classList.remove("life");
            }


        }, timeOn + 4300);
    }
}