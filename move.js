const background = document.querySelector('img.background');
const player = document.querySelector('img.player');
const button = document.querySelector('button');


// !!cssの値の取得が上手くいかなかったため、cssに対応する値を手入力!!
const position = {
    // スクリーン
    screen : {x : 0, y : 0, width : 1000, height : 600},
    // ブロック
    block : [{x : 0, y : 560, width : 1000, height : 40}, {x : 200, y : 380, width : 200, height : 40}, {x : 600, y : 380, width : 200, height : 40}, {x : 400, y : 200, width : 200, height : 40}],
    // プレイヤー
    player : {x : 270, y : 480, width : 60, height : 80},
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


const moveRight = () => {
    console.log(position.player.x);
    position.player.x += 5;
    player.style.left = position.player.x + 'px';
} 

const moveLeft = () => {
    position.player.x -= 5;
    player.style.left = position.player.x + 'px';
} 

// let interval;
// button.addEventListener('mousedown', () => {interval = setInterval(movefunc, 20)});
// button.addEventListener('mouseup', () => {clearInterval(interval)});

document.body.addEventListener('keydown', (event) => {
    if (event.code === 'KeyA') {
        moveLeft();
    }
    if (event.code === 'KeyD') {
        moveRight();
    }
});

