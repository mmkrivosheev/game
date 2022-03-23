import {Map} from "./map";
import { Hero } from "./hero";
import { Antihero } from "./antihero";
import * as music from "./audio";
import * as screen from "./screen";

const PAUSE = "PAUSE";
const MENU = "MENU";
const SAVE = "SAVE";
const LEVEL = "LEVEL ";
const GREAT = "GREAT !";
const WIN = "YOU WON !";
const GAME_OVER = "GAME OVER !";
const scoreboard = document.querySelector(".scoreboard");
const menu = document.querySelector("#menu");
const save = document.querySelector("#save");
const modal = document.querySelector("#modal");

export class Game {

    constructor() {
        this.heroSpeed = 35;
        this.antiheroSpeed = 28;
        this.level = 0;
        this.coins = 0;
        this.life = 3;
        this.coinsTotal = null;
        this.isPlay = true;
        this.isPause = false;
        this.isSound = false;
        this.isMenu = false;
        this.isSave = false;
        this.isRulesShow = false;
        this.map = new Map(this);
        this.hero = new Hero(this, 3, 11, this.heroSpeed);
        this.antihero_1 = new Antihero(this, 0, 0, this.antiheroSpeed);
        this.antihero_2 = new Antihero(this, 18, 0, this.antiheroSpeed);
        this.antihero_3 = new Antihero(this, 18, 19, this.antiheroSpeed);
        this.antihero_4 = new Antihero(this, 0, 19, this.antiheroSpeed);
        this.levelTolal = this.map.maps.length;
        this.winTotal = 0;
    }

    resize() {
        const PrevCellSize = cellSize;
        screen.calcCvsSize();
        this.hero.posX = this.hero.posX * (cellSize / PrevCellSize);
        this.hero.posY = this.hero.posY * (cellSize / PrevCellSize);
        this.hero.size = cellSize;
        this.hero.speed = this.hero.speed * (cellSize / PrevCellSize);

        this.antihero_1.posX = this.antihero_1.posX * (cellSize / PrevCellSize);
        this.antihero_1.posY = this.antihero_1.posY * (cellSize / PrevCellSize);
        this.antihero_1.size = cellSize;
        this.antihero_1.speed = this.antihero_1.speed * (cellSize / PrevCellSize);

        this.antihero_2.posX = this.antihero_2.posX * (cellSize / PrevCellSize);
        this.antihero_2.posY = this.antihero_2.posY * (cellSize / PrevCellSize);
        this.antihero_2.size = cellSize;
        this.antihero_2.speed = this.antihero_2.speed * (cellSize / PrevCellSize);

        this.antihero_3.posX = this.antihero_3.posX * (cellSize / PrevCellSize);
        this.antihero_3.posY = this.antihero_3.posY * (cellSize / PrevCellSize);
        this.antihero_3.size = cellSize;
        this.antihero_3.speed = this.antihero_3.speed * (cellSize / PrevCellSize);

        this.antihero_4.posX = this.antihero_4.posX * (cellSize / PrevCellSize);
        this.antihero_4.posY = this.antihero_4.posY * (cellSize / PrevCellSize);
        this.antihero_4.size = cellSize;
        this.antihero_4.speed = this.antihero_4.speed * (cellSize / PrevCellSize);

        this.map.drawMap(this.map.maps[this.level - 1]);
        this.hero.drawHero();
        this.antihero_1.drawAntihero();
        this.antihero_2.drawAntihero();
        this.antihero_3.drawAntihero();
        this.antihero_4.drawAntihero();

    }

    start() {
        this.level++;
        this.coins = 0;
        this.map.drawMap(this.map.maps[this.level - 1]);
        this.hero.drawHero();
        this.antihero_1.drawAntihero();
        this.antihero_2.drawAntihero();
        this.antihero_3.drawAntihero();
        this.antihero_4.drawAntihero();
        window.addEventListener("resize", () => this.resize());


        this.hero.isPause = true;
        this.map.getCoinsTotal(this.map.maps[this.level - 1]);
        this.isSound
            ? scoreboard.classList.add("sound-on")
            : scoreboard.classList.add("sound-off");
        scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
        this.showAndHideMessage(LEVEL + this.level, null, 300);
        document.addEventListener("keydown", (e) => this.hero.moveHero(e));
        document.addEventListener("click", (e) => this.hero.moveHero(e));
    }

    playerPos(player, cellX,cellY, speedX, speedY) {
        player.posX = cellSize * cellX + cellSize / 2;
        player.posY =cellSize * cellY + cellSize / 2;
        player.speedX = speedX;
        player.speedY = speedY;
    }

    pause(boolean) {
        if (!this.isPlay || this.isMenu || this.isSave || this.isRulesShow) return;
        if (!boolean) this.isPause = !this.isPause;

        if (this.isPause) {
            scoreboard.innerHTML = PAUSE;
            scoreboard.classList.remove("life");
            this.hero.isPause = true;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            this.map.drawMap(this.map.maps[this.level - 1]);
            this.hero.drawHero();
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
        } else {
            scoreboard.classList.add("life");
            this.hero.isPause = false;
            this.tick();
        }
    }

    soundOn() {
        this.isSound = !this.isSound;
        scoreboard.classList.add("sound-on");
        scoreboard.classList.toggle("sound-off");
    }

    menu() {
        if (this.isRulesShow) return;
        if(this.isSave) this.save();
        this.isMenu = !this.isMenu;

        if (this.isMenu) {
            menu.classList.add("show-menu");
            scoreboard.innerHTML = MENU;
            scoreboard.classList.remove("life");
            this.map.drawMap();
            this.hero.isPause = true;
        } else {
            menu.classList.remove("show-menu");
            this.hero.isPause = false;
            if (this.isPause) this.pause(true);

            if (!this.isPause && this.isPlay) scoreboard.classList.add("life");

            if (!this.isPause &&
                !this.isPlay &&
                this.winTotal !== this.levelTolal)
                scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;

            if (!this.isPause &&
                !this.isPlay &&
                this.winTotal === this.levelTolal)
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;

            if (!this.isPause &&
                !this.isPlay &&
                !this.life)
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;

            this.map.drawMap(this.map.maps[this.level - 1]);
            this.hero.drawHero();
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
        }
    }

    save() {
        if (this.isRulesShow) return;
        if(this.isMenu) this.menu();
        this.isSave = !this.isSave;

        if (this.isSave) {
            save.classList.add("show-save");
            scoreboard.innerHTML = SAVE;
            scoreboard.classList.remove("life");
            this.map.drawMap();
            this.hero.isPause = true;
        } else {
            save.classList.remove("show-save");
            this.hero.isPause = false;
            if (this.isPause && this.isPlay) this.pause(true);

            if (!this.isPause && this.isPlay) scoreboard.classList.add("life");

            if (!this.isPause &&
                !this.isPlay &&
                this.winTotal !== this.levelTolal)
                scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;

            if (!this.isPause &&
                !this.isPlay &&
                this.winTotal === this.levelTolal)
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;

            if (!this.isPause &&
                !this.isPlay &&
                !this.life)
                scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;

            this.map.drawMap(this.map.maps[this.level - 1]);
            this.hero.drawHero();
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
        }
    }

    tick() {
        if (!this.isPlay || this.isPause) return;

        this.hero.passBetweenBodies(this.map.maps[this.level - 1]);
        this.antihero_1.passBetweenBodies(this.map.maps[this.level - 1]);
        this.antihero_2.passBetweenBodies(this.map.maps[this.level - 1]);
        this.antihero_3.passBetweenBodies(this.map.maps[this.level - 1]);
        this.antihero_4.passBetweenBodies(this.map.maps[this.level - 1]);

        this.hero.calcNewPos();
        this.antihero_1.calcNewPos();
        this.antihero_2.calcNewPos();
        this.antihero_3.calcNewPos();
        this.antihero_4.calcNewPos();

        this.hero.collision.mapBorderDetector();
        this.hero.collision.staticBodyDetector(this.map.maps[this.level - 1]);
        this.hero.collision.coinDetector(this.map.maps[this.level - 1]);
        this.hero.collision.antiheroDetector(this.life, this.isSound, this.antihero_1);
        this.hero.collision.antiheroDetector(this.life, this.isSound, this.antihero_2);
        this.hero.collision.antiheroDetector(this.life, this.isSound, this.antihero_3);
        this.hero.collision.antiheroDetector(this.life, this.isSound, this.antihero_4);

        this.hero.getReactionToMapBorderCollision();
        this.hero.getReactionToStaticBodyCollision();
        this.hero.getReactionToCoinCollision();

        if (!this.isMenu && !this.isSave) {
            this.map.drawMap(this.map.maps[this.level - 1]);
            this.hero.drawHero();
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
        }

        this.antihero_1.moveAntihero(this.map.maps[this.level - 1]);
        this.antihero_2.moveAntihero(this.map.maps[this.level - 1]);
        this.antihero_3.moveAntihero(this.map.maps[this.level - 1]);
        this.antihero_4.moveAntihero(this.map.maps[this.level - 1]);

        if (this.coins === this.map.coinsTotal) {
            // if (this.coins === 4) {
            this.showAndHideMessage(GREAT, music.musicWin, 300);
            this.coinsTotal += this.coins;
            this.isPlay = false;
            this.winTotal++;
        }

        if (this.winTotal === this.levelTolal) {
            this.showAndHideMessage(WIN, null, 5000);
            scoreboard.classList.remove("life");
            this.isPlay = false;
            scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;
        }

        if (!this.life) {
            this.showAndHideMessage(GAME_OVER, music.musicGameOver, 300);
            scoreboard.classList.remove("life");
            this.coinsTotal += this.coins;
            this.isPlay = false;
            scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;
        }

        if (this.isPlay && !this.isMenu && !this.isSave)
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

            if (!this.isPlay && this.winTotal !== this.levelTolal && this.life) {
                this.isPlay = true;
                this.playerPos(this.hero, 3, 11, 0, 0);
                this.playerPos(this.antihero_1, 0, 0, 0, 0);
                this.playerPos(this.antihero_2, 18, 0, 0, 0);
                this.playerPos(this.antihero_3, 18, 19, 0, 0);
                this.playerPos(this.antihero_4, 0, 19, 0, 0);
                this.start();
            }

        }, timeOn + 4300);
    }
}