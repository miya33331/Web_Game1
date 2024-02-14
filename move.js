const background = document.querySelector('img.background');
const player = document.querySelector('img.player');
const button = document.querySelector('button');


const position = {
    // スクリーン
    screen : {width : background.style.width, height : background.style.height},
    // ブロック
    block : [{x : 0, y : 0, width : 0, height : 0}, {x : 0, y : 0, width : 0, height : 0}, {x : 0, y : 0, width : 0, height : 0}, {x : 0, y : 0, width : 0, height : 0}],
    // プレイヤー
    player : {x : player.style.left, y : player.style.top, width : player.style.width, height : player.style.height},
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


let posTop = 0;
let posLeft = 0;




const moveRight = () => {
    position.player.x -= 5;
    player.style.left = position.player.x + 'px';
} 

const moveLeft = () => {
    position.player.x += 5;
    player.style.left = position.player.x + 'px';
} 

// let interval;
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

