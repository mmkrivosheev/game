import { CollisionDetector } from "./collisions";
import * as music from "./audio";

export class Hero {
    constructor(parent, posX, posY, speed) {
        this.collision = new CollisionDetector(this);
        this.parent = parent;
        this.color = "#39536D";
        this.colorDetector = "#f0813c";
        this.posX = posX * cellSize + cellSize / 2;
        this.posY = posY * cellSize + cellSize / 2;
        this.speed =  cellSize / speed;
        this.speedX = 0;
        this.speedY = 0;
        this.size = cellSize;
        this.isPause = false;
        this.isMapBorderTopCollision = false;
        this.isMapBorderRightCollision = false;
        this.isMapBorderButtonCollision = false;
        this.isMapBorderLeftCollision = false;
        this.staticBodyCollision = [];
        this.coinCollision = [];
        this.isAntiheroCollision = false;
    }

    drawHero() {
        let cvs = document.getElementById("cvs");
        const ctx = cvs.getContext('2d');
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.fillStyle = !this.isAntiheroCollision ? this.color : this.colorDetector;
        ctx.translate(this.posX - (this.size / 2), this.posY - (this.size / 2));
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.restore();
    }

    moveHero(e) {
        if (e.target.classList.contains("btn-control")) e.target.blur();

        if (!this.isPause) {
            if (e.key === "ArrowLeft" || e.target.classList.contains("btn-left")) {
                this.speedY = 0;
                this.speedX = -this.speed;
                vibro();
            }

            if (e.key === "ArrowRight" || e.target.classList.contains("btn-right")) {
                this.speedY = 0;
                this.speedX = +this.speed;
                vibro();
            }

            if (e.key === "ArrowUp" || e.target.classList.contains("btn-top")) {
                this.speedX = 0;
                this.speedY = -this.speed;
                vibro();
            }

            if (e.key === "ArrowDown" || e.target.classList.contains("btn-bottom")) {
                this.speedX = 0;
                this.speedY = +this.speed;
                vibro();
            }
        }

        function vibro() {
            if (navigator.vibrate) {
                    window.navigator.vibrate(100);
            }
        }
    }

    calcNewPos() {
        this.posX += this.speedX;
        this.posY += this.speedY;
    }

    passBetweenBodies() {
        const heroCellX = Math.floor(this.posX / cellSize);
        const heroCellY = Math.floor(this.posY / cellSize);

        if (this.speedX > 0 &&
            heroCellX < this.parent.map.maps[this.parent.level - 1][0].length - 1 &&
            this.parent.map.maps[this.parent.level - 1][heroCellY][heroCellX + 1] !== 1)
            this.posY = heroCellY * cellSize + cellSize / 2;

        if (this.speedX < 0 &&
            heroCellX > 0 &&
            this.parent.map.maps[this.parent.level - 1][heroCellY][heroCellX - 1] !== 1)
            this.posY = heroCellY * cellSize + cellSize / 2;

        if (this.speedY > 0 &&
            heroCellY < this.parent.map.maps[this.parent.level - 1].length - 1 &&
            this.parent.map.maps[this.parent.level - 1][heroCellY < this.parent.map.maps[this.parent.level - 1].length - 1
                ? heroCellY + 1
                : heroCellY][heroCellX] !== 1)
            this.posX = heroCellX * cellSize + cellSize / 2;

        if (this.speedY < 0 &&
            heroCellY > 0 &&
            this.parent.map.maps[this.parent.level - 1][heroCellY ? heroCellY - 1 : 0][heroCellX] !== 1)
            this.posX = heroCellX * cellSize + cellSize / 2;
    }

    getReactionToMapBorderCollision() {
        if (this.isMapBorderTopCollision) {
            this.isMapBorderTopCollision = false;
            this.posY = this.size / 2;
            this.speedY = 0;
        }

        if (this.isMapBorderRightCollision) {
            this.isMapBorderRightCollision = false;
            this.posX = cvsWidth - this.size / 2;
            this.speedX = 0;
        }

        if (this.isMapBorderButtonCollision) {
            this.isMapBorderButtonCollision = false;
            this.posY = cvsHeight - this.size / 2;
            this.speedY = 0;
        }

        if (this.isMapBorderLeftCollision) {
            this.isMapBorderLeftCollision = false;
            this.posX = this.size / 2;
            this.speedX = 0;
        }
    }

    getReactionToStaticBodyCollision() {
        if (this.staticBodyCollision.length) {
            this.staticBodyCollision.forEach(([x, y]) => {

                if (this.speedX) {
                    this.posX = this.speedX > 0
                        ? cellSize * x - cellSize / 2
                        : cellSize * x + cellSize * 1.5;
                    this.speedX = 0;
                }

                if (this.speedY) {
                    this.posY = this.speedY > 0
                        ? cellSize * y - cellSize / 2
                        : cellSize * y + cellSize * 1.5;
                    this.speedY = 0;
                }
            });

            this.staticBodyCollision = [];
        }
    }

    getReactionToCoinCollision() {
        if (this.coinCollision.length) {
            const [x, y] = this.coinCollision;
            if (isSound) music.musicCoin.play();
            this.parent.map.maps[this.parent.level - 1][y][x] = 0;
            this.parent.coins++;
            this.coinCollision = [];
        }
    }
}