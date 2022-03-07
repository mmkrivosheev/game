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
                    checkOverlappingX(hero, map, x) &&
                    checkOverlappingY(hero, map, y)) {
                    result.push([x, y]);
                }
            }
        }

        return result;
    }
}

function checkOverlappingX(hero, map, cellX) {
    return Math.abs((map.cellHeight * cellX + map.cellHeight / 2) - hero.posX) < map.cellHeight;
}

function checkOverlappingY(hero, map, cellY) {
    return Math.abs((map.cellHeight * cellY + map.cellHeight / 2) - hero.posY) < map.cellHeight;
}