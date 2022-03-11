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

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === 1 &&
                    this.checkOverlappingX(hero, x) &&
                    this.checkOverlappingY(hero, y)) {
                    result.push([x, y]);
                }
            }
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

        for (let y = 0; y < map.length; y++) {
            for (let x = 0; x < map[y].length; x++) {
                if (map[y][x] === 2 &&
                    this.checkOverlappingX(hero, x) &&
                    this.checkOverlappingY(hero, y)) {
                    result.push([x, y]);
                }
            }
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