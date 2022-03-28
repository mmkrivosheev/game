import * as music from "./audio";

export class CollisionDetector {
    constructor(player) {
        this.player = player;
        this.stopAntiheroDetector = false;
    }

    mapBorderDetector() {
        if (this.player.posX + this.player.size / 2 > cvsWidth)
            this.player.isMapBorderRightCollision = true;

        if (this.player.posX - this.player.size / 2 < 0)
            this.player.isMapBorderLeftCollision = true;

        if (this.player.posY + this.player.size / 2 > cvsHeight)
            this.player.isMapBorderButtonCollision = true;

        if (this.player.posY - this.player.size / 2 < 0)
            this.player.isMapBorderTopCollision = true;
    }

    staticBodyDetector() {
        const result = [];
        const playerCellX = Math.floor(this.player.posX / cellSize);
        const playerCellY = Math.floor(this.player.posY / cellSize);
        const CellsAroundHero = [
            [playerCellY - 1, playerCellX],
            [playerCellY, playerCellX - 1],
            [playerCellY, playerCellX + 1],
            [playerCellY + 1, playerCellX]
        ];

        for (let [y, x] of CellsAroundHero) {
            if (this.player.parent.map.maps[this.player.parent.level - 1][y]?.[x] === 1 &&
                checkOverlappingX(this.player, x) &&
                checkOverlappingY(this.player, y))
                result.push([x, y]);
        }

        this.player.staticBodyCollision = result;

        function checkOverlappingX(hero, cellX) {
            return Math.abs((cellSize * cellX + cellSize / 2) - hero.posX) < cellSize;
        }

        function checkOverlappingY(hero, cellY) {
            return Math.abs((cellSize * cellY + cellSize / 2) - hero.posY) < cellSize;
        }
    }

    coinDetector() {
        const playerCellX = Math.floor(this.player.posX / cellSize);
        const playerCellY = Math.floor(this.player.posY / cellSize);

        if (this.player.parent.map.maps[this.player.parent.level - 1][playerCellY][playerCellX] === 2)
            this.player.coinCollision = [playerCellX, playerCellY];
    }

    antiheroDetector(antihero) {
        if (!this.stopAntiheroDetector) {
            const scoreboard = document.querySelector(".scoreboard");

            if (Math.abs(this.player.posX - antihero.posX) < cellSize &&
                Math.abs(this.player.posY - antihero.posY) < cellSize) {
                this.stopAntiheroDetector = true;
                this.player.isAntiheroCollision = true;
                scoreboard.setAttribute("data-life", this.player.parent.life - 1 + "");
                this.player.parent.life--;
                if (isSound) music.musicAntihero.play();

                setTimeout(() => {
                    this.stopAntiheroDetector = false;
                    this.player.isAntiheroCollision = false;
                }, 3000);
            }
        }
    }
}