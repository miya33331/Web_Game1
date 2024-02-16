const screen = document.querySelector('#screen');
const background = document.querySelector('img.background');
const player = document.querySelector('img.player');
const sword = document.querySelector('img.sword');
const enemy = document.querySelector('img.enemy');
const button = document.querySelector('button');
const fireball = [document.querySelector('img.fireball0'), document.querySelector('img.fireball1'), document.querySelector('img.fireball2'), document.querySelector('img.fireball3'), document.querySelector('img.fireball4')];
const iceball = [document.querySelector('img.iceball0'), document.querySelector('img.iceball1'), document.querySelector('img.iceball2'), document.querySelector('img.iceball3'), document.querySelector('img.iceball4')];


// !!cssの値の取得が上手くいかなかったため、cssに対応する値を手入力!!
const position = {
    // スクリーン
    screen : {x : 0, y : 0, width : 1000, height : 830},
    // ブロック
    block : [{x : 0, y : 790, width : 1000, height : 40}, {x : 200, y : 610, width : 200, height : 40}, {x : 600, y : 610, width : 200, height : 40}, {x : 400, y : 430, width : 200, height : 40}, {x : 0, y : 0, width : 1000, height : 20}],
    // 壁
    wall : [{x : -10, y : 0, width : 20, height : 830}, {x : 1000, y : 0, width : 20, height : 830}],
    // プレイヤー
    player : {x : 270, y : 530, width : 35, height : 80, image : 'image/プレイヤー_右向き.png', right : true, damage : false},
    // 剣
    sword : {x : 305, y : 530, width : 35, height : 80, image : 'image/剣_右向き.png', cut : false},
    // 敵
    enemy : {x : 670, y : 530, width : 70, height : 80, damage : false, freeze :  false},
    // ファイヤーボール初期位置
    firstFireball : {x : 1030, y : 0},
    // ファイヤーボール
    fireball : [{x : 1030, y : 0, width : 40, height : 40, exist : false}, {x : 1030, y : 0, width : 40, height : 40, exist : false}, {x : 1030, y : 0, width : 40, height : 40, exist : false}, {x : 1030, y : 0, width : 40, height : 40, exist : false}, {x : 1030, y : 0, width : 40, height : 40, exist : false}],
    // アイスボール初期位置
    firstIceball : {x : -55, y : 0},
    // アイスボール
    iceball : [{x : -55, y : 0, width : 45, height : 25, exist : false, right : true}, {x : -55, y : 0, width : 45, height : 25, exist : false, right : true}, {x : -55, y : 0, width : 45, height : 25, exist : false, right : true}, {x : -55, y : 0, width : 45, height : 25, exist : false, right : true}, {x : -55, y : 0, width : 45, height : 25, exist : false, right : true}],
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
        if(position.overlap(position.player, position.block[4])) {
            if (v - g * d_t > 0) {
                v = -((v - g * d_t) * 0.5);
                d_t = 0;
                position.player.y = position.block[4].y + position.block[4].height;
                player.style.top = position.player.y + 'px';
            }
            return;
        }

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

let e_v = 0;
let e_d_t = 0;
let e_jump = false;
let e_doublejump1 = false;
let e_doublejump2 = true;

const gravityEnemy = () => {
    if (!e_jump) {
        if(position.overlap(position.enemy, position.block[4])) {
            if (e_v - g * e_d_t > 0) {
                e_v = -((e_v - g * e_d_t) * 0.5);
                e_d_t = 0;
                position.enemy.y = position.block[4].y + position.block[4].height;
                enemy.style.top = position.enemy.y + 'px';
            }
            return;
        }

        if (position.overlapEqual(position.enemy, position.block[0]) || position.overlapEqual(position.enemy, position.block[1]) || position.overlapEqual(position.enemy, position.block[2]) || position.overlapEqual(position.enemy, position.block[3])){
            if (e_v - g * e_d_t > 0) {
                e_v = -((e_v - g * e_d_t) * 0.5);
                e_d_t = 0;

                for (let posblock of position.block) {
                    if (position.overlap(position.enemy, posblock)) {
                        position.enemy.y = posblock.y + posblock.height;
                    }
                }

                enemy.style.top = position.enemy.y + 'px';
            }
            else {
                e_v = 0;
                e_d_t = 0;

                for (let posblock of position.block) {
                    if (position.overlap(position.enemy, posblock)) {
                        position.enemy.y = posblock.y - position.enemy.height;
                    }
                }

                enemy.style.top = position.enemy.y + 'px';
                e_doublejump1 = false;
                e_doublejump2 = true;
                return;
            }
        }
    }

    position.enemy.y -= e_v - g * e_d_t;
    enemy.style.top = position.enemy.y + 'px';
    e_d_t += 0.04;
    e_jump = false;
    e_doublejump1 = true;
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


const moveRightEnemy = () => {
    if (position.overlap(position.enemy, position.block[0]) || position.overlap(position.enemy, position.block[1]) || position.overlap(position.enemy, position.block[2]) || position.overlap(position.enemy, position.block[3]) || position.overlap(position.enemy, position.wall[0]) || position.overlap(position.enemy, position.wall[1])){
        for (let posblock of position.block) {
            if (position.overlap(position.enemy, posblock)) {
                // position.enemy.x = posblock.x - posblock.width - 1;
                position.enemy.x -= 1;
            }
        }
        for (let poswall of position.wall) {
            if (position.overlap(position.enemy, poswall)) {
                position.enemy.x = poswall.x - position.enemy.width;
            }
        }

        enemy.style.left = position.enemy.x + 'px';
        return;
    }
    else{
        for (let poswall of position.wall) {
            if (position.overlapEqual(position.enemy, poswall) && position.enemy.x + position.enemy.width === poswall.x) {
                return;
            }
        }
    }
    position.enemy.x += 6;
    enemy.style.left = position.enemy.x + 'px';
}; 

const moveLeftEnemy = () => {
    if (position.overlap(position.enemy, position.block[0]) || position.overlap(position.enemy, position.block[1]) || position.overlap(position.enemy, position.block[2]) || position.overlap(position.enemy, position.block[3]) || position.overlap(position.enemy, position.wall[0]) || position.overlap(position.enemy, position.wall[1])){
        for (let posblock of position.block) {
            if (position.overlap(position.enemy, posblock)) {
                // position.enemy.x = posblock.x + posblock.width + 1;
                position.enemy.x += 1;
            }
        }
        for (let poswall of position.wall) {
            if (position.overlap(position.enemy, poswall)) {
                position.enemy.x = poswall.x + poswall.width;
            }
        }

        enemy.style.left = position.enemy.x + 'px';
        return;
    }
    else{
        for (let poswall of position.wall) {
            if (position.overlapEqual(position.enemy, poswall) && position.enemy.x === poswall.x + poswall.width ) {
                return;
            }
        }
    }
    position.enemy.x -= 6;
    enemy.style.left = position.enemy.x + 'px';
};


const attack = () => {
    let cnt = 0;
    for (let fb of position.fireball) {
        if (! fb.exist) {
            fb.x = position.enemy.x;
            fb.y = position.enemy.y;
            fireball[cnt].style.left = fb.x + 'px';
            fireball[cnt].style.top = fb.y + 'px';
            fb.exist = true;
            return;
        }
        cnt++;
    }
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

// let capableHit = true;

const hit = () => {
    if (position.sword.cut) {
        // if (capableHit) {
        if (! position.enemy.damage) {
            if (position.overlapEqual(position.sword, position.enemy)) {
                console.log('ダメージ判定');
                enemy.src = 'image/敵_ダメージ.png';
                position.enemy.damage = true;
                // capableHit = false;
                position.enemy.freeze  = false;
            }
        }
    }
    else {
        // if (! position.enemy.freeze) {
            enemy.src = 'image/敵.png';
            position.enemy.damage = false;
            // capableHit = true;
        // }
    }

    let cnt = 0;
    for (fb of position.fireball) {
        if(position.overlapEqual(position.player, fb)) {
            if (position.player.right) {
                position.player.image = 'image/プレイヤー_右向き_ダメージ.png';
            }
            else {
                position.player.image = 'image/プレイヤー_左向き_ダメージ.png';
            }
            player.src = position.player.image;

            fb.x = position.firstFireball.x;
            fb.y = position.firstFireball.y;
            fireball[cnt].style.left = fb.x + 'px';
            fireball[cnt].style.top = fb.y + 'px';
            fb.exist = false;
            position.player.damage = true;

            setTimeout(() => {
                if (position.player.right) {
                    position.player.image = 'image/プレイヤー_右向き.png';
                }
                else {
                    position.player.image = 'image/プレイヤー_左向き.png';
                }
                player.src = position.player.image;
                position.player.damage = false;
            }, 500);
        }
        cnt++;
    }
    
    if (position.enemy.freeze) {
        position.enemy.image = 'image/敵_凍る.png';
        enemy.src = position.enemy.image;
    }
};

const iceHit = () => {
    let cnt1 = 0;
    for (let ib of position.iceball) {
        let cnt2 = 0;
        for (let fb of position.fireball) {
            if (position.overlap(ib, fb)) {
                ib.x = position.firstIceball.x;
                ib.y = position.firstIceball.y;
                iceball[cnt1].style.left = ib.x + 'px';
                iceball[cnt1].style.top = ib.y + 'px';
                ib.exist = false;

                fb.x = position.firstFireball.x;
                fb.y = position.firstFireball.y;
                fireball[cnt2].style.left = fb.x + 'px';
                fireball[cnt2].style.top = fb.y + 'px';
                fb.exist = false;
            }
            cnt2++;
        }

        if (position.overlapEqual(ib, position.enemy)) {
            // if (! position.enemy.freeze) {
                ib.x = position.firstIceball.x;
                ib.y = position.firstIceball.y;
                iceball[cnt1].style.left = ib.x + 'px';
                iceball[cnt1].style.top = ib.y + 'px';
                ib.exist = false;

                console.log('凍る');
                position.enemy.freeze = true;
                setTimeout(() => {
                    if (position.enemy.freeze) {
                        if(! position.enemy.damage) {
                            position.enemy.image = 'image/敵.png';
                            enemy.src = position.enemy.image;
                            position.enemy.freeze = false;
                        }
                    }
                }, 1000);
            // }
        }

        cnt1++;
    }
};

let rangeEnemyMove = 0.5;

const enemyAction = () => {
    if (! position.enemy.freeze) {
        let random = Math.random();
        if (position.enemy.x < position.screen.x + position.screen.width * 0.1) {
            rangeEnemyMove = 0.5;
        }
        else if (position.enemy.x > position.screen.x + position.screen.width * 0.9 - position.enemy.width) {
            rangeEnemyMove = 0.2;
        }
        // 右移動
        if (0 <= random && random < rangeEnemyMove) {
            moveRightEnemy();
        }
        // 左移動
        else if (rangeEnemyMove <= random && random < 0.7) {
            moveLeftEnemy();
        }
        // ジャンプ
        else if (0.7 <= random && random < 0.9) {
            if (e_doublejump2) {
                e_v = 20;
            }
            e_jump = true;
            if (e_doublejump1 && e_doublejump2) {
                e_v = 15;
                e_d_t = 0;
                e_doublejump2 = false;
            }
        }
        // 攻撃
        else if (0.9 <= random && random < 1) {
            attack();
        }
    }
};

const fireballAction = () => {
    let cnt = 0;
    for (let fb of position.fireball) {
        if (fb.exist) {
            if (fb.x > position.player.x) {
                fb.x -= 3;
            }
            else if (fb.x < position.player.x) {
                fb.x += 3;
            }
            if (fb.y > position.player.y) {
                fb.y -= 3;
            }
            else if (fb.y < position.player.y) {
                fb.y += 3;
            }

            fireball[cnt].style.left = fb.x + 'px';
            fireball[cnt].style.top = fb.y + 'px';

            if (position.overlap(fb, position.block[0]) || position.overlap(fb, position.block[1]) || position.overlap(fb, position.block[2]) || position.overlap(fb, position.block[3]) || position.overlap(fb, position.block[4]) || position.overlap(fb, position.wall[0]) || position.overlap(fb, position.wall[1])){
                fb.x = position.firstFireball.x;
                fb.y = position.firstFireball.y;
                fireball[cnt].style.left = fb.x + 'px';
                fireball[cnt].style.top = fb.y + 'px';
                fb.exist = false;
            }
        }
        cnt++;
    }
};

const iceballShot = () => {
    let cnt = 0;
    for (let ib of position.iceball) {
        if (! ib.exist) {
            if (position.player.right) {
                ib.x = position.player.x + position.player.width;
                ib.y = position.player.y;
                ib.right = true;
            }
            else {
                ib.x = position.player.x - ib.width;
                ib.y = position.player.y;
                ib.right = false;
            }
        
            iceball[cnt].style.left = ib.x + 'px';
            iceball[cnt].style.top = ib.y + 'px';
            ib.exist = true;
            return;
        }
        cnt++;
    }
};

const iceballAction = () => {
    let cnt = 0;
    for (let ib of position.iceball) {
        if (ib.exist) {
            if (ib.right) {
                ib.x += 6;
            }
            else {
                ib.x -= 6;
            }

            iceball[cnt].style.left = ib.x + 'px';

            if (position.overlap(ib, position.block[0]) || position.overlap(ib, position.block[1]) || position.overlap(ib, position.block[2]) || position.overlap(ib, position.block[3]) || position.overlap(ib, position.block[4]) || position.overlap(ib, position.wall[0]) || position.overlap(ib, position.wall[1])){
                ib.x = position.firstIceball.x;
                ib.y = position.firstIceball.y;
                iceball[cnt].style.left = ib.x + 'px';
                iceball[cnt].style.top = ib.y + 'px';
                ib.exist = false;
            }
        }
        cnt++;
    }
};

// const finishInterval = () => {
//     let cnt = 0;
//     for (let fb of position.fireball) {
//         if (fb.exist) {
//             if (position.overlap(fb, position.block[0]) || position.overlap(fb, position.block[1]) || position.overlap(fb, position.block[2]) || position.overlap(fb, position.block[3]) || position.overlap(fb, position.block[4]) || position.overlap(fb, position.wall[0]) || position.overlap(fb, position.wall[1])){
//                 fb.x = position.firstFireball.x;
//                 fb.y = position.firstFireball.y;
//                 fireball[cnt].style.left = fb.x + 'px';
//                 fireball[cnt].style.top = fb.y + 'px';
//                 fb.exist = false;
//                 clearInterval(intervalID_fireball[cnt]);
//             }
//         }
//     }
//     cnt++;
// }


let intervalID;
let intervalID_CPS;
let intervalID_hit;
let intervalID_iceHit;
let intervalID_gravityEnemy;
let intervalID_enemyAction;
let intervalID_fireball;
let intervalID_iceball;
// let intervalID_clearInterval;

intervalID = setInterval(gravity, 40);
intervalID_gravityEnemy = setInterval(gravityEnemy, 40);
intervalID_CPS = setInterval(connectPlayerSword, 10);
intervalID_hit = setInterval(hit, 10);
intervalID_iceHit = setInterval(iceHit, 10);
intervalID_enemyAction = setInterval(enemyAction, 100);
intervalID_fireball = setInterval(fireballAction, 40);
intervalID_iceball = setInterval(iceballAction, 40);
// intervalID_clearInterval = setInterval(finishInterval, 10);

iceballCoolTime = true;
document.body.addEventListener('keydown', (event) => {
    if (event.code === 'KeyA') {
        moveLeft();
        if (! position.sword.cut || position.player.right) {//position.player.image === 'image/キャラクター2右向き_切る.png') {
            // position.player.image = 'image/キャラクター2左向き.png';
            if(! position.player.damage){
                position.player.image = 'image/プレイヤー_左向き.png';
            }
            else {
                position.player.image = 'image/プレイヤー_左向き_ダメージ.png';
            }
            player.src = position.player.image;
            position.player.right = false;
            position.sword.cut = false;
        }
    }
    if (event.code === 'KeyD') {
        moveRight();
        if (! position.sword.cut || ! position.player.right) {//position.player.image === 'image/キャラクター2左向き_切る.png') {
            // position.player.image = 'image/キャラクター2右向き.png';
            if(! position.player.damage){
                position.player.image = 'image/プレイヤー_右向き.png';
            }
            else {
                position.player.image = 'image/プレイヤー_右向き_ダメージ.png';
            }
            player.src = position.player.image;
            position.player.right = true;
            position.sword.cut = false;
        }
    }
    if (event.code === 'Space') {
        if (doublejump2) {
            v = 20;
        }
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
            if(! position.player.damage){
                position.player.image = 'image/プレイヤー_右向き.png';
            }
            else {
                position.player.image = 'image/プレイヤー_右向き_ダメージ.png';
            }
            player.src = position.player.image;
            position.player.right = true;
            position.sword.cut = true;
        }
        else if(! position.player.right) {//position.player.image === 'image/キャラクター2左向き.png') {
            // position.player.image = 'image/キャラクター2左向き_切る.png';
            if(! position.player.damage){
                position.player.image = 'image/プレイヤー_左向き.png';
            }
            else {
                position.player.image = 'image/プレイヤー_左向き_ダメージ.png';
            }
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
    if (event.code === 'KeyN') {
        if (iceballCoolTime) {
            iceballShot();
            iceballCoolTime = false;
            setTimeout(() => {iceballCoolTime = true}, 2000);
        }
    }
});

// clearInterval(intervalID);

// setInterval(() => {console.log(v, d_t);}, 1000);