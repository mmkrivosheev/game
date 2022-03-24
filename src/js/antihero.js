export class Antihero {

    constructor(parent, posX, posY, speed) {
        this.parent = parent;
        this.color = "#606973";
        this.posX = posX * cellSize + cellSize / 2;
        this.posY = posY * cellSize + cellSize / 2;
        this.speed =  cellSize / speed;
        this.speedX = 0;
        this.speedY = 0;
        this.size = cellSize;
        this.prevCellX = null;
        this.prevCellY = null;
    }

    drawAntihero() {
        let cvs = document.getElementById("cvs");
        const ctx = cvs.getContext('2d');
        ctx.save();
        ctx.fillStyle = this.color;
        ctx.translate(this.posX - (this.size / 2), this.posY - (this.size / 2));
        ctx.fillRect(0, 0, this.size, this.size);
        ctx.restore();
    }

    moveAntihero() {
        const result = [];
        const cellsAroundAntihero = [];
        const antiheroCellX = Math.floor(this.posX / cellSize);
        const antiheroCellY = Math.floor(this.posY / cellSize);

        if (this.prevCellX === antiheroCellX &&
            this.prevCellY === antiheroCellY) return;

        this.prevCellX = antiheroCellX;
        this.prevCellY = antiheroCellY;

        if (this.speedY <= 0)
            cellsAroundAntihero.push([antiheroCellY - 1, antiheroCellX]);
        if (this.speedX <= 0)
            cellsAroundAntihero.push([antiheroCellY, antiheroCellX - 1]);
        if (this.speedX >= 0)
            cellsAroundAntihero.push([antiheroCellY, antiheroCellX + 1]);
        if (this.speedY >= 0)
            cellsAroundAntihero.push([antiheroCellY + 1, antiheroCellX]);

        for (let [y, x] of cellsAroundAntihero) {
            if (this.parent.map.maps[this.parent.level - 1][y]?.[x] === 0 ||
                this.parent.map.maps[this.parent.level - 1][y]?.[x] === 2) result.push([x, y]);
        }

        const cell = result[random(0, result.length - 1)];

        if (antiheroCellY < cell[1]) {
            this.speedX = 0;
            this.speedY = this.speed;
        }

        if (antiheroCellY > cell[1]) {
            this.speedX = 0;
            this.speedY = -this.speed;
        }

        if (antiheroCellX < cell[0]) {
            this.speedY = 0;
            this.speedX = this.speed;
        }

        if (antiheroCellX > cell[0]) {
            this.speedY = 0;
            this.speedX = -this.speed;
        }

        function random(n, m) {
            return Math.floor(Math.random() * (m - n + 1)) + n;
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

        if (this.speedX < 0 && heroCellX > 0 &&
            this.parent.map.maps[this.parent.level - 1][heroCellY][heroCellX - 1] !== 1)
            this.posY = heroCellY * cellSize + cellSize / 2;

        if (this.speedY > 0 &&
            heroCellY <  this.parent.map.maps[this.parent.level - 1].length - 1 &&
            this.parent.map.maps[this.parent.level - 1][heroCellY < this.parent.map.maps[this.parent.level - 1].length - 1
                ? heroCellY + 1
                : heroCellY][heroCellX] !== 1)
            this.posX = heroCellX * cellSize + cellSize / 2;

        if (this.speedY < 0 && heroCellY > 0 &&
            this.parent.map.maps[this.parent.level - 1][heroCellY ? heroCellY - 1 : 0][heroCellX] !== 1)
            this.posX = heroCellX * cellSize + cellSize / 2;
    }
}