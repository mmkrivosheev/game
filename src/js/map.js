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

const map_1 = [
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

const map_2 = [
    [2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0],
    [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 1, 0, 1, 2, 2, 2, 2, 2, 0],
    [2, 1, 0, 1, 1, 2, 1, 2, 1, 2, 1, 0, 1, 2, 1, 1, 0, 1, 0],
    [2, 1, 0, 0, 0, 0, 1, 2, 1, 2, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [2, 1, 1, 1, 1, 0, 1, 2, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0],
    [2, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0],
    [2, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0],
    [2, 1, 0, 0, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 0],
    [2, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0],
    [2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 1, 1, 2, 1, 0, 1, 0, 1, 0],
    [2, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 2, 0, 0, 0, 0, 1, 0],
    [2, 1, 1, 1, 1, 1, 0, 1, 1, 1, 0, 1, 2, 1, 1, 1, 1, 1, 0],
    [2, 0, 0, 0, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 0, 0, 0, 0, 0],
    [2, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 0],
    [2, 1, 0, 0, 0, 0, 1, 0, 2, 2, 1, 2, 1, 2, 2, 2, 2, 1, 0],
    [2, 1, 0, 1, 1, 2, 1, 0, 1, 2, 1, 2, 1, 0, 1, 1, 2, 1, 0],
    [2, 2, 2, 2, 2, 2, 1, 0, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
];

export class Map {
    constructor() {
        this.coinsTotal = null;
        this.maps = [map_1, map_2];
    }

    getCoinsTotal(map) {
        let count = 0;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === 2) count++;
            }
        }

        this.coinsTotal = count;
    }

    drawMap(map) {
        const cvs = document.getElementById("cvs");
        const ctx = cvs.getContext('2d');
        cvs.width = cvsWidth;
        cvs.height = cvsHeight;
        cvs.style.border = cvsBorder + "px solid #DAD0D0";

        if (!map) return;

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === 1)
                    this.drawRect(ctx, x, y);

                if (map[y][x] === 2)
                    this.drawCircle(ctx, x, y, cellSize / 8);
            }
        }
    }

    drawRect(ctx, x, y) {
        ctx.fillStyle = "#DAD0D0";
        ctx.fillRect(
            cellSize * x + 0.2,
            cellSize * y + 0.2,
            cellSize - 0.4,
            cellSize - 0.4
        );
    }

    drawCircle(ctx, x, y, r) {
        ctx.fillStyle='#39536D';
        ctx.beginPath();
        ctx.arc(
            cellSize * x + cellSize / 2,
            cellSize * y + cellSize / 2,
            r, 0, Math.PI * 2, false
        );
        ctx.fill();
    }
}
