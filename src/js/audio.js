export const musicWin = new Audio();
export const musicGameOver = new Audio();
export const musicCoin = new Audio();
export const musicAntihero = new Audio();

musicWin.preload = 'auto';
musicGameOver.preload = 'auto';
musicCoin.preload = 'auto';
musicAntihero.preload = 'auto';

musicWin.src = "src/audio/win.mp3";
musicGameOver.src = "src/audio/lose.mp3";
musicCoin.src = "src/audio/coin.mp3";
musicAntihero.src = "src/audio/hero.mp3";



