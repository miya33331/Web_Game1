const player = document.querySelector('img.player');
const button = document.querySelector('button');
const p = document.querySelector('p,text');

let posTop = 0;
let posLeft = 0;

let interval;

const moveRight = () => {
    posLeft = posLeft + 5;
    player.style.left = posLeft + 'px';
} 

const moveLeft = () => {
    posLeft = posLeft - 5;
    player.style.left = posLeft + 'px';
} 

// button.addEventListener('mousedown', () => {interval = setInterval(movefunc, 20)});
// button.addEventListener('mouseup', () => {clearInterval(interval)});

document.body.addEventListener('keydown', (event) => {
    if (event.code === 'KeyA') {
        moveRight();
    }
    if (event.code === 'KeyD') {
        moveLeft();
    }
});

const position = {
    // スクリーン
    screen : {width : 0, height : 0},
    // ブロック
    block : [{x : 0, y : 0, width : 0, height : 0}, {x : 0, y : 0, width : 0, height : 0}, {x : 0, y : 0, width : 0, height : 0}, {x : 0, y : 0, width : 0, height : 0}],
    // プレイヤー
    player : {x : 0, y : 0, width : 0, height : 0},
    // 敵
    enemy : {x : 0, y : 0, width : 0, height : 0},
    // 攻撃判定
    attack : {x : -9999, y : -9999, width : -9999, height : -9999},
    // 重なり判定
    overlap : (obj1, obj2) => {
        for (let i = 0; i < 2; i++) {
            if (obj1.x <= obj2.x && obj2.x <= obj1.x + obj1.width) {
                if (obj1.y <= obj2.y && obj2.y <= obj1.y + obj1.height){
                    return true;
                }
                if (obj1.y <= obj2.y + obj2.height && obj2.y + obj2.height <= obj1.y + obj1.height){
                    return true;
                }
            }
            if (obj1.x <= obj2.x + obj2.width && obj2.x + obj2.width <= obj1.x + obj1.width) {
                if (obj1.y <= obj2.y && obj2.y <= obj1.y + obj1.height){
                    return true;
                }
                if (obj1.y <= obj2.y + obj2.height && obj2.y + obj2.height <= obj1.y + obj1.height){
                    return true;
                }
            }
            const tmp = obj1;
            obj1 = obj2;
            obj2 = tmp;
        }
        return false;
    }
};