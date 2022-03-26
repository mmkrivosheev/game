const wrapper = document.querySelector("#wrapper");
const control = document.querySelector("#control");
const btnSet = document.querySelector(".btn-set");
const btnSetMobile = document.querySelector(".btn-set-mobile");
const mq1 = window.matchMedia("(max-width: 1199px)");
const mq2 = window.matchMedia("(max-width: 1199px) and (orientation: portrait)");

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

export function resize(game) {
    const PrevCellSize = cellSize;
    calcCvsSize();

    game.hero.posX = game.hero.posX * (cellSize / PrevCellSize);
    game.hero.posY = game.hero.posY * (cellSize / PrevCellSize);
    game.hero.size = cellSize;
    game.hero.speed = game.hero.speed * (cellSize / PrevCellSize);

    game.antihero_1.posX = game.antihero_1.posX * (cellSize / PrevCellSize);
    game.antihero_1.posY = game.antihero_1.posY * (cellSize / PrevCellSize);
    game.antihero_1.size = cellSize;
    game.antihero_1.speed = game.antihero_1.speed * (cellSize / PrevCellSize);

    game.antihero_2.posX = game.antihero_2.posX * (cellSize / PrevCellSize);
    game.antihero_2.posY = game.antihero_2.posY * (cellSize / PrevCellSize);
    game.antihero_2.size = cellSize;
    game.antihero_2.speed = game.antihero_2.speed * (cellSize / PrevCellSize);

    game.antihero_3.posX = game.antihero_3.posX * (cellSize / PrevCellSize);
    game.antihero_3.posY = game.antihero_3.posY * (cellSize / PrevCellSize);
    game.antihero_3.size = cellSize;
    game.antihero_3.speed = game.antihero_3.speed * (cellSize / PrevCellSize);

    game.antihero_4.posX = game.antihero_4.posX * (cellSize / PrevCellSize);
    game.antihero_4.posY = game.antihero_4.posY * (cellSize / PrevCellSize);
    game.antihero_4.size = cellSize;
    game.antihero_4.speed = game.antihero_4.speed * (cellSize / PrevCellSize);

    if (!game.isMenuShow && !game.isSaveShow && !game.isModalOpenShow) {
        game.map.drawMap();
        game.hero.drawHero();
        game.antihero_1.drawAntihero();
        game.antihero_2.drawAntihero();
        game.antihero_3.drawAntihero();
        game.antihero_4.drawAntihero();
    } else {
        game.map.drawMap(true);
    }

    document.body.style.fontSize = cellSize + "px";
    if (mq1.matches)
        document.body.style.width = "100%";
    else
        document.body.style.width = cvsWidth + cellSize + "px";

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
}

export function getScreenChange() {
    document.body.style.fontSize = cellSize + "px";

    if (mq1.matches)
        document.body.style.width = "100%";
    else
        document.body.style.width = cvsWidth + cellSize + "px";

    if (mq2.matches) {
        const windowHeight = window.innerHeight;
        const wrapperHeight = wrapper.clientHeight;
        const height = windowHeight - wrapperHeight;

        control.style.bottom = height / 2 + "px";
        btnSet.style.top = wrapperHeight / 2 + cellSize + "px";
        btnSetMobile.style.bottom = height / 2 + "px";
    }
}