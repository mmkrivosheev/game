import "../scss/map.scss";

const winWidth = window.innerWidth;
const winHeight = window.innerHeight - window.innerHeight * 0.08;
const cvsHeight = (winHeight - winWidth < 0)
    ? winHeight - winHeight % 21 - (winHeight - winHeight % 21) / 21
    : winWidth - winWidth % 21 - (winWidth - winWidth % 21) / 21;
const cellHeight = Math.floor(cvsHeight / 20);
const cvsWidth = cellHeight * 19;
const cvsBorder = Math.floor(cellHeight / 4);


const progress = document.querySelector(".progress");
const levelCoin = document.querySelector(".level-coin");
const lives = document.querySelectorAll(".lives span");

levelCoin.style.fontSize = cellHeight + "px";
levelCoin.style.width = cellHeight * 5.5 + "px";
levelCoin.style.paddingLeft = cvsBorder + "px";
progress.style.marginTop = cvsBorder + "px";
progress.style.marginBottom = cvsBorder + "px";

for (let live of lives) {
    live.style.width = cellHeight / 1.5 + "px";
    live.style.height = cellHeight / 1.5 + "px";
}

const mq = window.matchMedia('(max-width: 1199px)');
if (mq.matches) {
    document.body.style.maxWidth = "100%";
}
else {
    document.body.style.width = cvsWidth + cellHeight + "px";
    document.body.style.borderRadius = cellHeight / 20 + "px";
}


mq.addListener((mq) => {
    if (mq.matches)
        document.body.style.maxWidth = "100%";
    else
        document.body.style.maxWidth = cvsWidth + cellHeight + "px";
});


export class Map {
    constructor() {
        this.cvsHeight = cvsHeight;
        this.cellHeight = cellHeight;
        this.cvsWidth = cvsWidth;
        this.map = [
            [2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [2, 1, 0, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 1, 0],
            [2, 1, 0, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 1, 2, 1, 2, 1, 0],
            [2, 1, 0, 1, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 2, 1, 0],
            [2, 0, 0, 1, 1, 1, 2, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 0, 0],
            [2, 1, 0, 0, 0, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
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
        cvs.style.border = cvsBorder + "px solid #DAD0D0";
        cvs.style.marginBottom = this.cellHeight / 8 + "px";

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
        ctx.fillRect(
            this.cellHeight * x + 0.5,
            this.cellHeight * y + 0.5,
            this.cellHeight - 0.5,
            this.cellHeight - 0.5
        );
    }

    drawCircle(ctx, x, y, r) {
        ctx.fillStyle='#39536D';
        ctx.beginPath();
        ctx.arc(
            this.cellHeight * x + this.cellHeight / 2,
            this.cellHeight * y + this.cellHeight / 2,
            r, 0, Math.PI * 2, false
        );
        ctx.fill();
    }
}
