export class HeroMapBorderRightCollisionDetector {
    detector(hero) {
        return hero.posX + hero.size / 2 > cvsWidth;
    }
}

export class HeroMapBorderLeftCollisionDetector {
    detector(hero) {
        return hero.posX - hero.size / 2 < 0;
    }
}

export class HeroMapBorderBottomCollisionDetector {
    detector(hero) {
        return hero.posY + hero.size / 2 > cvsHeight;
    }
}

export class HeroMapBorderTopCollisionDetector {
    detector(hero) {
        return hero.posY - hero.size / 2 < 0;
    }
}

export class HeroStaticBodyCollisionDetector {
    detector(hero, map) {
        const result = [];
        const heroCellX = Math.floor(hero.posX / cellSize);
        const heroCellY = Math.floor(hero.posY / cellSize);
        const CellsAroundHero = [
            [heroCellY - 1, heroCellX - 1],
            [heroCellY - 1, heroCellX],
            [heroCellY - 1, heroCellX + 1],
            [heroCellY, heroCellX - 1],
            [heroCellY, heroCellX],
            [heroCellY, heroCellX + 1],
            [heroCellY + 1, heroCellX - 1],
            [heroCellY + 1, heroCellX],
            [heroCellY + 1, heroCellX + 1],
        ];

        for (let i = 0; i < CellsAroundHero.length; i++) {
            if (CellsAroundHero[i][0] < 0 ||
                CellsAroundHero[i][0] > map.length - 1 ||
                CellsAroundHero[i][1] < 0 ||
                CellsAroundHero[i][1] > map[0].length - 1)
                continue;

            if (map[CellsAroundHero[i][0]][CellsAroundHero[i][1]] === 1 &&
                this.checkOverlappingX(hero, CellsAroundHero[i][1]) &&
                this.checkOverlappingY(hero, CellsAroundHero[i][0]))
                    result.push([CellsAroundHero[i][1], CellsAroundHero[i][0]]);
        }

        return result;
    }

    checkOverlappingX(hero, cellX) {
        return Math.abs((cellSize * cellX + cellSize / 2) - hero.posX) < cellSize;
    }

    checkOverlappingY(hero, cellY) {
        return Math.abs((cellSize * cellY + cellSize / 2) - hero.posY) < cellSize;
    }
}

export class HeroCoinCollisionDetector {
    detector(hero, map) {
        const result = [];
        const heroCellX = Math.floor(hero.posX / cellSize);
        const heroCellY = Math.floor(hero.posY / cellSize);
        const CellsAroundHero = [
            [heroCellY - 1, heroCellX - 1],
            [heroCellY - 1, heroCellX],
            [heroCellY - 1, heroCellX + 1],
            [heroCellY, heroCellX - 1],
            [heroCellY, heroCellX],
            [heroCellY, heroCellX + 1],
            [heroCellY + 1, heroCellX - 1],
            [heroCellY + 1, heroCellX],
            [heroCellY + 1, heroCellX + 1],
        ];

        for (let i = 0; i < CellsAroundHero.length; i++) {
            if (CellsAroundHero[i][0] < 0 ||
                CellsAroundHero[i][0] > map.length - 1 ||
                CellsAroundHero[i][1] < 0 ||
                CellsAroundHero[i][1] > map[0].length - 1)
                continue;

            if (map[CellsAroundHero[i][0]][CellsAroundHero[i][1]] === 2 &&
                this.checkOverlappingX(hero, CellsAroundHero[i][1]) &&
                this.checkOverlappingY(hero, CellsAroundHero[i][0]))
                result.push([CellsAroundHero[i][1], CellsAroundHero[i][0]]);
        }

        return result;
    }

    checkOverlappingX(hero, cellX) {
        return Math.abs((cellSize * cellX + cellSize / 2) - hero.posX) < hero.size / 2;
    }

    checkOverlappingY(hero, cellY) {
        return Math.abs((cellSize * cellY + cellSize / 2) - hero.posY) < hero.size / 2;
    }
}