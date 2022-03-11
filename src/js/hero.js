export class Hero {
    constructor(size, posX, posY, speed) {
        this.posX = posX;
        this.posY = posY;
        this.speed = speed;
        this.speedX = 0;
        this.speedY = 0;
        this.size = size;
        this.isPause = false;
    }

    drawHero() {
        let cvs = document.getElementById("cvs");
        const ctx = cvs.getContext('2d');
        ctx.fillStyle = "#39536D";
        ctx.translate(this.posX - (this.size / 2), this.posY - (this.size / 2));
        ctx.fillRect(0, 0, this.size, this.size);
    }

    moveHero(e) {
        e.preventDefault();

        if (!this.isPause) {
            if (e.key === "ArrowLeft") {
                this.speedY = 0;
                this.speedX = -this.speed;
            }

            if (e.key === "ArrowRight") {
                this.speedY = 0;
                this.speedX = +this.speed;
            }

            if (e.key === "ArrowUp") {
                this.speedX = 0;
                this.speedY = -this.speed;
            }

            if (e.key === "ArrowDown") {
                this.speedX = 0;
                this.speedY = +this.speed;
            }
        }
    }
}
