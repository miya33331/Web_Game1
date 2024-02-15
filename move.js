const background = document.querySelector('img.background');
const player = document.querySelector('img.player');
const sword = document.querySelector('img.sword');
const enemy = document.querySelector('img.enemy');
const button = document.querySelector('button');


// !!cssの値の取得が上手くいかなかったため、cssに対応する値を手入力!!
const position = {
    // スクリーン
    screen : {x : 0, y : 0, width : 1000, height : 830},
    // ブロック
    block : [{x : 0, y : 790, width : 1000, height : 40}, {x : 200, y : 610, width : 200, height : 40}, {x : 600, y : 610, width : 200, height : 40}, {x : 400, y : 430, width : 200, height : 40}],
    // 壁
    wall : [{x : -10, y : 0, width : 20, height : 830}, {x : 1000, y : 0, width : 20, height : 830}],
    // プレイヤー
    player : {x : 270, y : 530, width : 35, height : 80, image : 'image/プレイヤー_右向き.png', right : true},
    // 剣
    sword : {x : 305, y : 530, width : 35, height : 80, image : 'image/剣_右向き.png', cut : false},
    // 敵
    enemy : {x : 670, y : 530, width : 70, height : 80},
    // 攻撃判定
    attack : {x : -9999, y : -9999, width : -9999, height : -9999},
    // 重なり判定
    overlap : (obj1, obj2) => {
        for (let i = 0; i < 2; i++) {
            if (obj1.x < obj2.x && obj2.x < obj1.x + obj1.width) {
                if (obj1.y < obj2.y && obj2.y < obj1.y + obj1.height){
                    return true;
                }
                if (obj1.y < obj2.y + obj2.height && obj2.y + obj2.height < obj1.y + obj1.height){
                    return true;
                }
            }
            if (obj1.x < obj2.x + obj2.width && obj2.x + obj2.width < obj1.x + obj1.width) {
                if (obj1.y < obj2.y && obj2.y < obj1.y + obj1.height){
                    return true;
                }
                if (obj1.y < obj2.y + obj2.height && obj2.y + obj2.height < obj1.y + obj1.height){
                    return true;
                }
            }
            const tmp = obj1;
            obj1 = obj2;
            obj2 = tmp;
        }
        return false;
    },
    // 重なり判定(=を含む)
    overlapEqual : (obj1, obj2) => {
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

let v = 0;
let d_t = 0;
let jump = false;
let doublejump1 = false;
let doublejump2 = true;
const g = 25;

const gravity = () => {
    if (!jump) {
        if (position.overlapEqual(position.player, position.block[0]) || position.overlapEqual(position.player, position.block[1]) || position.overlapEqual(position.player, position.block[2]) || position.overlapEqual(position.player, position.block[3])){
            if (v - g * d_t > 0) {
                v = -((v - g * d_t) * 0.5);
                d_t = 0;

                for (let posblock of position.block) {
                    if (position.overlap(position.player, posblock)) {
                        position.player.y = posblock.y + posblock.height;
                    }
                }

                player.style.top = position.player.y + 'px';
            }
            else {
                v = 0;
                d_t = 0;

                for (let posblock of position.block) {
                    if (position.overlap(position.player, posblock)) {
                        position.player.y = posblock.y - position.player.height;
                    }
                }

                player.style.top = position.player.y + 'px';
                doublejump1 = false;
                doublejump2 = true;
                return;
            }
        }
    }

    position.player.y -= v - g * d_t;
    player.style.top = position.player.y + 'px';
    d_t += 0.04;
    jump = false;
    doublejump1 = true;
};


const moveRight = () => {
    if (position.overlap(position.player, position.block[0]) || position.overlap(position.player, position.block[1]) || position.overlap(position.player, position.block[2]) || position.overlap(position.player, position.block[3]) || position.overlap(position.player, position.wall[0]) || position.overlap(position.player, position.wall[1])){
        for (let posblock of position.block) {
            if (position.overlap(position.player, posblock)) {
                // position.player.x = posblock.x - posblock.width - 1;
                position.player.x -= 1;
            }
        }
        for (let poswall of position.wall) {
            if (position.overlap(position.player, poswall)) {
                position.player.x = poswall.x - position.player.width;
            }
        }

        player.style.left = position.player.x + 'px';
        return;
    }
    else{
        for (let poswall of position.wall) {
            if (position.overlapEqual(position.player, poswall) && position.player.x + position.player.width === poswall.x) {
                return;
            }
        }
    }
    position.player.x += 6;
    player.style.left = position.player.x + 'px';
}; 

const moveLeft = () => {
    if (position.overlap(position.player, position.block[0]) || position.overlap(position.player, position.block[1]) || position.overlap(position.player, position.block[2]) || position.overlap(position.player, position.block[3]) || position.overlap(position.player, position.wall[0]) || position.overlap(position.player, position.wall[1])){
        for (let posblock of position.block) {
            if (position.overlap(position.player, posblock)) {
                // position.player.x = posblock.x + posblock.width + 1;
                position.player.x += 1;
            }
        }
        for (let poswall of position.wall) {
            if (position.overlap(position.player, poswall)) {
                position.player.x = poswall.x + poswall.width;
            }
        }

        player.style.left = position.player.x + 'px';
        return;
    }
    else{
        for (let poswall of position.wall) {
            if (position.overlapEqual(position.player, poswall) && position.player.x === poswall.x + poswall.width ) {
                return;
            }
        }
    }
    position.player.x -= 6;
    player.style.left = position.player.x + 'px';
};


const connectPlayerSword = () => {
    if (position.player.right) {
        switch (position.sword.cut) {
            case false:
                position.sword.image = 'image/剣_右向き.png';
                break;
            case true:
                position.sword.image = 'image/剣_右向き_切る.png';
                break;
        }
        position.sword.x = position.player.x + position.player.width;
        // sword.style.left = position.sword.x + 'px';
        // position.sword.y = position.player.y;
        // sword.style.top = position.sword.y + 'px';
        // sword.src = position.sword.image;
    }
    else if (! position.player.right) {
        switch (position.sword.cut) {
            case false:
                position.sword.image = 'image/剣_左向き.png';
                break;
            case true:
                position.sword.image = 'image/剣_左向き_切る.png';
                break;
        }
        position.sword.x = position.player.x - position.sword.width;
        // sword.style.left = position.sword.x + 'px';
        // position.sword.y = position.player.y;
        // sword.style.top = position.sword.y + 'px';
        // sword.src = position.sword.image;
    }
    sword.style.left = position.sword.x + 'px';
    position.sword.y = position.player.y;
    sword.style.top = position.sword.y + 'px';
    sword.src = position.sword.image;
};

let capableHit = true;

const hit = () => {
    if (position.sword.cut) {
        if (capableHit) {
            if (position.overlapEqual(position.sword, position.enemy)) {
                enemy.src = 'image/敵_ダメージ.png';
                capableHit = false;
            }
        }
    }
    else {
        enemy.src = 'image/敵.png';
        capableHit = true;
    }
};


let intervalID;
let intervalID_CPS;
let intervalID_hit;

intervalID = setInterval(gravity, 40);
intervalID_CPS = setInterval(connectPlayerSword, 10);
intervalID_hit = setInterval(hit, 10);


document.body.addEventListener('keydown', (event) => {
    if (event.code === 'KeyA') {
        moveLeft();
        if (! position.sword.cut || position.player.right) {//position.player.image === 'image/キャラクター2右向き_切る.png') {
            // position.player.image = 'image/キャラクター2左向き.png';
            position.player.image = 'image/プレイヤー_左向き.png';
            player.src = position.player.image;
            position.player.right = false;
            position.sword.cut = false;
        }
    }
    if (event.code === 'KeyD') {
        moveRight();
        if (! position.sword.cut || ! position.player.right) {//position.player.image === 'image/キャラクター2左向き_切る.png') {
            // position.player.image = 'image/キャラクター2右向き.png';
            position.player.image = 'image/プレイヤー_右向き.png';
            player.src = position.player.image;
            position.player.right = true;
            position.sword.cut = false;
        }
    }
    if (event.code === 'Space') {
        v = 20;
        jump = true;
        if (doublejump1 && doublejump2) {
            v = 15;
            d_t = 0;
            doublejump2 = false;
        }
    }
    if (event.code === 'KeyM') {
        if(!position.sword.cut){
        if(position.player.right) {//position.player.image === 'image/キャラクター2右向き.png') {
            // position.player.image = 'image/キャラクター2右向き_切る.png';
            position.player.image = 'image/プレイヤー_右向き.png';
            player.src = position.player.image;
            position.player.right = true;
            position.sword.cut = true;
        }
        else if(! position.player.right) {//position.player.image === 'image/キャラクター2左向き.png') {
            // position.player.image = 'image/キャラクター2左向き_切る.png';
            position.player.image = 'image/プレイヤー_左向き.png';
            player.src = position.player.image;
            position.player.right = false;
            position.sword.cut = true;
        }

       
            setTimeout(() => {
                // if (position.sword.cut) {
                    if (position.sword.cut) {
                        position.sword.cut = false;
                        // switch (position.player.right) {
                        //     case true
                        //         position.player.image = 'image/キャラクター2右向き.png';
                        //         position.sword.cut = false;
                        //         break;
                        //     case false:
                        //         position.player.image = 'image/キャラクター2左向き.png';
                        //         position.player.right = false;
                        //         break;
                        // }
                    }
                    // switch (position.player.image) {
                    //     case 'image/キャラクター2右向き_切る.png':
                    //         position.player.image = 'image/キャラクター2右向き.png';
                    //         position.player.right = true;
                    //         break;
                    //     case 'image/キャラクター2左向き_切る.png':
                    //         position.player.image = 'image/キャラクター2左向き.png';
                    //         position.player.right = false;
                    //         break;
                    // }
                // }
                // else {
                //     player.src = position.player.image;
                // // }
                // player.src = position.player.image;
                // position.sword.cut = false;
            }, 500);
        }
    }
});

// clearInterval(intervalID);

setInterval(() => {console.log('1');}, 1000);