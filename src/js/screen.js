import {Map} from "./map";
import {Hero} from "./hero";
import {Antihero} from "./antihero";

const wrapper = document.querySelector("#wrapper");
const control = document.querySelector("#control");
const btnSet = document.querySelector(".btn-set");
const btnSetMobile = document.querySelector(".btn-set-mobile");
const mq1 = window.matchMedia("(max-width: 1199px)");
const mq2 = window.matchMedia("(max-width: 1199px) and (orientation: portrait)");

export function watchScreenChange(game) {
    document.body.style.fontSize = cellSize + "px";

    if (mq1.matches)
        document.body.style.width = "100%";
    else
        document.body.style.width = cvsWidth + cellSize + "px";

    mq1.addListener((mq1) => {
        if (mq1.matches)
            document.body.style.width = "100%";
        else
            document.body.style.width = cvsWidth + cellSize + "px";
    });

    window.addEventListener("resize", () => {
        const mq1 = window.matchMedia("(max-width: 1199px)");
        document.body.style.fontSize = cellSize + "px";

        if (mq1.matches)
            document.body.style.width = "100%";
        else
            document.body.style.width = cvsWidth + cellSize + "px";

        mq1.addListener((mq1) => {
            if (mq1.matches)
                document.body.style.width = "100%";
            else
                document.body.style.width = cvsWidth + cellSize + "px";
        });
    });

    document.addEventListener("DOMContentLoaded", () => {
        if (mq2.matches) {
            const windowHeight = window.innerHeight;
            const wrapperHeight = wrapper.clientHeight;
            const height = windowHeight - wrapperHeight;

            control.style.bottom = height / 2 + "px";
            btnSet.style.top = wrapperHeight / 2 + cellSize + "px";
            btnSetMobile.style.bottom = height / 2 + "px";
        } else {
            control.style.bottom = "";
            btnSet.style.top = "";
            btnSetMobile.style.bottom = "";
        }

        window.addEventListener("resize", () => {
            if (mq2.matches) {
                const windowHeight = window.innerHeight;
                const wrapperHeight = wrapper.clientHeight;
                const height = windowHeight - wrapperHeight;

                control.style.bottom = height / 2 + "px";
                btnSet.style.top = wrapperHeight / 2 + cellSize + "px";
                btnSetMobile.style.bottom = height / 2 + "px";
            } else {
                control.style.bottom = "";
                btnSet.style.top = "";
                btnSetMobile.style.bottom = "";
            }
        });

        mq2.addListener((mq2) => {
        if (mq2.matches) {
            setTimeout(() => {
                const windowHeight = window.innerHeight;
                const wrapperHeight = wrapper.clientHeight;
                const height = windowHeight - wrapperHeight;
                control.style.bottom = height / 2 + "px";
                btnSet.style.top = wrapperHeight / 2 + cellSize + "px";
                btnSetMobile.style.bottom = height / 2 + "px";
            }, 20);
        } else {
            control.style.bottom = "";
            btnSet.style.top = "";
            btnSetMobile.style.bottom = "";
        }
        });
    });

    // window.addEventListener("resize", () => {
    //     game.map = new Map(this);
    //     game.hero = new Hero(this, 3, 11, game.heroSpeed);
    //     game.antihero_1 = new Antihero(this, 0, 0, game.antiheroSpeed);
    //     game.antihero_2 = new Antihero(this, 18, 0, game.antiheroSpeed);
    //     game.antihero_3 = new Antihero(this, 18, 19, game.antiheroSpeed);
    //     game.antihero_4 = new Antihero(this, 0, 19, game.antiheroSpeed);
    // });

    screen.addEventListener("orientationchange", () => {
        game.map = new Map(this);
        game.hero = new Hero(this, 3, 11, game.heroSpeed);
        game.antihero_1 = new Antihero(this, 0, 0, game.antiheroSpeed);
        game.antihero_2 = new Antihero(this, 18, 0, game.antiheroSpeed);
        game.antihero_3 = new Antihero(this, 18, 19, game.antiheroSpeed);
        game.antihero_4 = new Antihero(this, 0, 19, game.antiheroSpeed);
    });
}

export function calcCvsSize() {
    let winWidth = window.innerWidth;
    let winHeight = window.innerHeight - window.innerHeight * 0.08;

    if (winHeight < winWidth) {
        let cvsHeight = winHeight - winHeight % 21 - (winHeight - winHeight % 21) / 21;
        let cellSize = Math.floor(cvsHeight / 20);
        let cvsWidth = cellSize * 19;
        let cvsBorder = Math.floor(cellSize / 4);
        window.cvsHeight = cvsHeight;
        window.cvsWidth = cvsWidth;
        window.cellSize = cellSize;
        window.cvsBorder = cvsBorder;
    } else {
        let cvsWidth = winWidth - winWidth % 20 - (winWidth - winWidth % 20) / 20
        let cellSize = Math.floor(cvsWidth / 19);
        let cvsHeight = cellSize * 20;
        let cvsBorder = Math.floor(cellSize / 4);
        window.cvsHeight = cvsHeight;
        window.cvsWidth = cvsWidth;
        window.cellSize = cellSize;
        window.cvsBorder = cvsBorder;
    }
}


