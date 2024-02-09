let AC_GAME_OBJECTS = [];

class AcGameObject{
    constructor(){
        AC_GAME_OBJECTS.push(this);
        // 是否执行过start函数
        this.has_called_start = false;
        // 当前帧距离上一帧的时间间隔ms
        this.timedelta = 0;
        this.uuid = this.create_uuid();
    }

    create_uuid(){
        let res = "";
        for(let i = 0; i < 8; i++){
            let x = parseInt(Math.floor(Math.random() * 10));
            res += x;
        }
        return res;

    }

    // 只会在第一帧执行
    start(){
    }

    //  每一帧都会执行
    update(){
    }

    //  在每一帧的最后执行一次
    late_update() {
    }

    //  被销毁前执行一次
    on_destroy(){

    }

    // 删掉该物体
    destroy(){
        this.on_destroy();
        for (let i = 0; i < AC_GAME_OBJECTS.length; i++){
            if (AC_GAME_OBJECTS[i] === this){
                AC_GAME_OBJECTS.splice(i, 1);
                break;
            }
        }
    }
}
let last_timestamp;
let AC_GAME_ANIMATION = function(timestamp){
    for (let i = 0; i < AC_GAME_OBJECTS.length; i++){
        let obj = AC_GAME_OBJECTS[i];
        if (!obj.has_called_start){
            obj.start();
            obj.has_called_start = true;
        }else{
            obj.timedelta = timestamp - last_timestamp;
            obj.update();
        }
    }

    for(let i = 0; i < AC_GAME_OBJECTS.length; i++) {
        let obj = AC_GAME_OBJECTS[i];
        obj.late_update();
    }

    last_timestamp = timestamp;
    // 递归调用，下一帧继续调用，动起来
    requestAnimationFrame(AC_GAME_ANIMATION);
}
// 启动动画，下一帧调用AC_GAME_ANIMATION
requestAnimationFrame(AC_GAME_ANIMATION);


