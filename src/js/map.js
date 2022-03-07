import "../scss/map.scss";

export class Map {
    constructor() {
        this.cvsHeight = window.innerHeight - window.innerHeight % 21
            - (window.innerHeight - window.innerHeight % 21) / 21;
        this.cellHeight = Math.floor(this.cvsHeight/ 20);
        this.cvsWidth = this.cellHeight * 19;
        this.map = [
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0],
            [2, 1, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 0],
            [2, 1, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 1, 0],
            [2, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 0, 0],
            [2, 1, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [2, 1, 0, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 2, 1, 0],
            [2, 1, 0, 0, 0, 0, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [2, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 2, 1, 1, 0, 1, 1, 0],
            [2, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 1, 1, 0],
            [2, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 1, 2, 1, 0, 1, 1, 1, 2, 1, 0, 1, 1, 1, 1, 0],
            [2, 1, 2, 2, 2, 2, 1, 0, 2, 2, 1, 2, 1, 0, 2, 2, 2, 1, 0],
            [2, 1, 2, 1, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 1, 2, 1, 0],
            [2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0],
            [2, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }

    drawMap() {
        const cvs = document.getElementById("cvs");
        const ctx = cvs.getContext('2d');
        cvs.width = this.cvsWidth;
        cvs.height = this.cvsHeight;
        cvs.style.outline = Math.floor(this.cellHeight / 4) + "px solid #DAD0D0";

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 1)
                    this.drawRect(ctx, x, y);

                if (this.map[y][x] === 2)
                    this.drawCircle(ctx, x, y, this.cellHeight / 8);
            }
        }
    }

    drawRect(ctx, x, y) {
        ctx.fillStyle = "#DAD0D0";
        ctx.fillRect(this.cellHeight * x, this.cellHeight * y, this.cellHeight, this.cellHeight);
    }

    drawCircle(ctx, x, y, r) {
        ctx.fillStyle='green';
        ctx.beginPath();
        ctx.arc(this.cellHeight * x + this.cellHeight / 2,
            this.cellHeight * y + this.cellHeight / 2,
            r, 0, Math.PI * 2, false);
        ctx.fill();
    }
}
