import { Map } from "./map";
import { Hero } from "./hero";
import { Antihero } from "./antihero";
import * as music from "./audio";

const PAUSE = "PAUSE";
const LEVEL = "LEVEL ";
const GREAT = "GREAT !";
const WIN = "YOU WON !";
const GAME_OVER = "GAME OVER !";
const scoreboard = document.querySelector(".scoreboard");

export class Game {
    constructor() {
        this.heroSpeed = 35;
        this.antiheroSpeed = 26;
        this.level = 0;
        this.life = 3;
        this.coins = 0;
        this.coinsTotal = 0;
        this.isPlay = true;
        this.isExit = false;
        this.isPause = false;
        this.map = new Map(this);
        this.hero = new Hero(this, 3, 11, this.heroSpeed);
        this.antihero_1 = new Antihero(this, 0, 0, this.antiheroSpeed);
        this.antihero_2 = new Antihero(this, 18, 0, this.antiheroSpeed);
        this.antihero_3 = new Antihero(this, 18, 19, this.antiheroSpeed);
        this.antihero_4 = new Antihero(this, 0, 19, this.antiheroSpeed);
        this.levelTolal = this.map.maps.length;
        this.winTotal = 0;
    }

    start() {
        this.level++;
        this.coins = 0;
        this.map.drawMap();
        this.hero.drawHero();
        this.antihero_1.drawAntihero();
        this.antihero_2.drawAntihero();
        this.antihero_3.drawAntihero();
        this.antihero_4.drawAntihero();
        this.hero.isPause = true;
        this.modal(LEVEL + this.level, null, 300);
        this.map.getCoinsTotal(this.map.maps[this.level - 1]);
        scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;
        document.addEventListener("keydown", (e) => this.hero.moveHero(e));
        document.addEventListener("click", (e) => this.hero.moveHero(e));
    }

    pause() {
        if (!this.isPlay || this.isExit) return;
        this.isPause = !this.isPause;

        if (this.isPause) {
            scoreboard.innerHTML = PAUSE;
            scoreboard.classList.remove("life");
            this.hero.isPause = true;
            this.hero.speedX = 0;
            this.hero.speedY = 0;
            this.map.drawMap();
            this.hero.drawHero();
            this.antihero_1.drawAntihero();
            this.antihero_2.drawAntihero();
            this.antihero_3.drawAntihero();
            this.antihero_4.drawAntihero();
        } else {
            this.hero.isPause = false;
            scoreboard.classList.add("life");
            this.tick();
        }
    }

    tick() {
        if (this.isExit || !this.isPlay || this.isPause) return;

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

        this.map.drawMap();
        this.hero.drawHero();
        this.antihero_1.drawAntihero();
        this.antihero_2.drawAntihero();
        this.antihero_3.drawAntihero();
        this.antihero_4.drawAntihero();

        this.antihero_1.moveAntihero();
        this.antihero_2.moveAntihero();
        this.antihero_3.moveAntihero();
        this.antihero_4.moveAntihero();

        if (this.coins === this.map.coinsTotal) {
            this.modal(GREAT, music.musicWin, 300);
            this.coinsTotal += this.coins;
            this.isPlay = false;
            this.winTotal++;
        }

        if (this.winTotal === this.levelTolal) {
            this.modal(WIN, null, 5000);
            scoreboard.classList.remove("life");
            this.isPlay = false;
            scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;
        }

        if (!this.life) {
            this.modal(GAME_OVER, music.musicGameOver, 300);
            scoreboard.classList.remove("life");
            this.coinsTotal += this.coins;
            this.isPlay = false;
            scoreboard.innerHTML = "TOTAL" + " : " + this.coinsTotal;
        }

        if (this.isPlay)
            scoreboard.innerHTML = "L-" + this.level + " : " + this.coins;

        requestAnimationFrame(this.tick.bind(this));
    }

    modal(text, music, timeOn) {
        const modal = document.querySelector("#modal");
        setTimeout(() => {
            if (isSound) music.play();
            modal.innerHTML = text;
            modal.classList.add("show-modal");

        }, timeOn);

        setTimeout(() => {
            modal.innerHTML = "";
            modal.classList.remove("show-modal");

            if (this.isExit) return;

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

    playerPos(player, cellX,cellY, speedX, speedY) {
        player.posX = cellSize * cellX + cellSize / 2;
        player.posY =cellSize * cellY + cellSize / 2;
        player.speedX = speedX;
        player.speedY = speedY;
    }
}