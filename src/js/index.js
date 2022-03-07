import { Map } from "./map";
import { Hero } from "./hero";
import { HeroMapBorderRightCollisionDetector} from "./collisions";
import { HeroMapBorderLeftCollisionDetector } from "./collisions";
import { HeroMapBorderBottomCollisionDetector } from "./collisions";
import { HeroMapBorderTopCollisionDetector } from "./collisions";
import { HeroStaticBodyCollisionDetector } from "./collisions";
import "../scss/index.scss";

class Game {
    constructor() {
        this.map_1 = new Map();
        this.hero = new Hero(
            this.map_1.cellHeight,
            this.map_1.cellHeight * 3 + this.map_1.cellHeight / 2,
            this.map_1.cellHeight * 11 + this.map_1.cellHeight / 2,
            this.map_1.cellHeight / 15
        );
        this.heroMapBorderRightCollisionDetector = new HeroMapBorderRightCollisionDetector();
        this.heroMapBorderLeftCollisionDetector = new HeroMapBorderLeftCollisionDetector();
        this.heroMapBorderBottomCollisionDetector = new HeroMapBorderBottomCollisionDetector();
        this.heroMapBorderTopCollisionDetector = new HeroMapBorderTopCollisionDetector();
        this.heroStaticBodyCollisionDetector = new HeroStaticBodyCollisionDetector();
    }

    start() {
        document.addEventListener("keydown", (e) => this.hero.moveHero(e));
        this.tick();
    }

    tick() {
        this.hero.posX += this.hero.speedX;
        this.hero.posY += this.hero.speedY;

        if (this.heroMapBorderRightCollisionDetector.detector(this.hero, this.map_1))
            this.hero.posX = this.map_1.cvsWidth - this.hero.size / 2;

        if (this.heroMapBorderLeftCollisionDetector.detector(this.hero))
            this.hero.posX = this.hero.size / 2;

        if (this.heroMapBorderBottomCollisionDetector.detector(this.hero, this.map_1))
            this.hero.posY = this.map_1.cvsHeight - this.hero.size / 2;

        if (this.heroMapBorderTopCollisionDetector.detector(this.hero))
            this.hero.posY = this.hero.size / 2;

        this.heroStaticBodyCollisionDetector.detector(this.hero, this.map_1).forEach(([x, y]) => {

            if (this.hero.speedX) {
                this.hero.posX = this.hero.speedX > 0
                    ? this.map_1.cellHeight * x - this.map_1.cellHeight / 2
                    : this.map_1.cellHeight * x + this.map_1.cellHeight * 1.5;
            }

            if (this.hero.speedY) {
                this.hero.posY = this.hero.speedY > 0
                    ? this.map_1.cellHeight * y - this.map_1.cellHeight / 2
                    : this.map_1.cellHeight * y + this.map_1.cellHeight * 1.5;
            }
        });

        this.map_1.drawMap();
        this.hero.drawHero();
        requestAnimationFrame(this.tick.bind(this));
    }
}

const game = new Game();
game.start();









