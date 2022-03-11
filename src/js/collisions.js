export class HeroMapBorderRightCollisionDetector {
    detector(hero, map) {
        return hero.posX + hero.size / 2 > map.cvsWidth;
    }
}

export class HeroMapBorderLeftCollisionDetector {
    detector(hero) {
        return hero.posX - hero.size / 2 < 0;
    }
}

export class HeroMapBorderBottomCollisionDetector {
    detector(hero, map) {
        return hero.posY + hero.size / 2 > map.cvsHeight;
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

        for (let y = 0; y < map.map.length; y++) {
            for (let x = 0; x < map.map[y].length; x++) {
                if (map.map[y][x] === 1 &&
                    this.checkOverlappingX(hero, map, x) &&
                    this.checkOverlappingY(hero, map, y)) {
                    result.push([x, y]);
                }
            }
        }

        return result;
    }

    checkOverlappingX(hero, map, cellX) {
        return Math.abs((map.cellSize * cellX + map.cellSize / 2) - hero.posX) < map.cellSize;
    }

    checkOverlappingY(hero, map, cellY) {
        return Math.abs((map.cellSize * cellY + map.cellSize / 2) - hero.posY) < map.cellSize;
    }
}

export class HeroGrainCollisionDetector {
    detector(hero, map) {
        const result = [];

        for (let y = 0; y < map.map.length; y++) {
            for (let x = 0; x < map.map[y].length; x++) {
                if (map.map[y][x] === 2 &&
                    this.checkOverlappingX(hero, map, x) &&
                    this.checkOverlappingY(hero, map, y)) {
                    result.push([x, y]);
                }
            }
        }

        return result;
    }

    checkOverlappingX(hero, map, cellX) {
        return Math.abs((map.cellSize * cellX + map.cellSize / 2) - hero.posX) < hero.size / 2;
    }

    checkOverlappingY(hero, map, cellY) {
        return Math.abs((map.cellSize * cellY + map.cellSize / 2) - hero.posY) < hero.size / 2;
    }
}