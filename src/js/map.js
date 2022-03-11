import "../scss/map.scss";

let winWidth = window.innerWidth;
let winHeight = window.innerHeight - window.innerHeight * 0.08;
let cvsHeight = (winHeight - winWidth < 0)
    ? winHeight - winHeight % 21 - (winHeight - winHeight % 21) / 21
    : winWidth - winWidth % 21 - (winWidth - winWidth % 21) / 21;
let cellSize = Math.floor(cvsHeight / 20);
let cvsWidth = cellSize * 19;
let cvsBorder = Math.floor(cellSize / 4);

window.addEventListener("resize", () => {
    winWidth = window.innerWidth;
    console.log( winWidth)
    winHeight = window.innerHeight - window.innerHeight * 0.08;
    cvsHeight = (winHeight - winWidth < 0)
        ? winHeight - winHeight % 21 - (winHeight - winHeight % 21) / 21
        : winWidth - winWidth % 21 - (winWidth - winWidth % 21) / 21;
    cellSize = Math.floor(cvsHeight / 20);
    cvsWidth = cellSize * 19;
    cvsBorder = Math.floor(cellSize / 4);

    window.cvsHeight = cvsHeight;
    window.cvsWidth = cvsWidth;
    window.cellSize = cellSize;
    window.cvsBorder = cvsBorder;
});

window.cvsHeight = cvsHeight;
window.cvsWidth = cvsWidth;
window.cellSize = cellSize;
window.cvsBorder = cvsBorder;

export class Map {
    constructor() {
        this.cvsHeight = cvsHeight;
        this.cellSize = cellSize;
        this.cvsWidth = cvsWidth;
        this.coinsTotal = null;
        this.map = [
            [2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
            [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 0],
            [2, 1, 0, 1, 1, 2, 1, 2, 1, 2, 1, 0, 1, 2, 1, 1, 0, 1, 0],
            [2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0],
            [2, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
            [2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [2, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1, 1, 1, 1, 0],
            [2, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 1, 0, 1, 1, 0],
            [2, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 1, 2, 1, 1, 0, 1, 1, 0],
            [2, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 0, 1, 1, 0],
            [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
            [2, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0],
            [2, 1, 0, 0, 0, 0, 1, 0, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 0],
            [2, 1, 0, 1, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 1, 2, 1, 0],
            [2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        ];
    }

    getCoinsTotal(map) {
        let count = 0;

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 2) count++;
            }
        }

        this.coinsTotal = count;
    }

    drawMap() {
        const cvs = document.getElementById("cvs");
        const ctx = cvs.getContext('2d');
        cvs.width = this.cvsWidth;
        cvs.height = this.cvsHeight;
        cvs.style.border = cvsBorder + "px solid #DAD0D0";
        cvs.style.marginBottom = this.cellSize / 8 + "px";

        for (let y = 0; y < this.map.length; y++) {
            for (let x = 0; x < this.map[y].length; x++) {
                if (this.map[y][x] === 1)
                    this.drawRect(ctx, x, y);

                if (this.map[y][x] === 2)
                    this.drawCircle(ctx, x, y, this.cellSize / 8);
            }
        }
    }

    drawRect(ctx, x, y) {
        ctx.fillStyle = "#DAD0D0";
        ctx.fillRect(
            this.cellSize * x + 0.2,
            this.cellSize * y + 0.2,
            this.cellSize - 0.4,
            this.cellSize - 0.4
        );
    }

    drawCircle(ctx, x, y, r) {
        ctx.fillStyle='#39536D';
        ctx.beginPath();
        ctx.arc(
            this.cellSize * x + this.cellSize / 2,
            this.cellSize * y + this.cellSize / 2,
            r, 0, Math.PI * 2, false
        );
        ctx.fill();
    }
}
