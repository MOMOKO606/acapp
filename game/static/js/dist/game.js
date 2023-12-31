class AcGameMenu {
    constructor(root) {
        this.root = root;
        this.$menu = $(`
<div class="ac-game-menu" >
    <div class="ac-game-menu-field">
        <div class="ac-game-menu-field-item ac-game-menu-field-item-single-mode">
            Single Player
        </div>
     <br><br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-multi-mode">
            Multiplayer
        </div>
      <br><br>
        <div class="ac-game-menu-field-item ac-game-menu-field-item-settings">
            Preferences
         </div>
     </div>
</div>
`); // 创建一个HTML对象，menu
        this.root.$ac_game.append(this.$menu); // 将HTML对象加入到这个游戏里面
        this.$single_mode = this.$menu.find('.ac-game-menu-field-item-single-mode'); // 找到这个“单人模式”对象
        this.$multi_mode = this.$menu.find('.ac-game-menu-field-item-multi-mode'); // 找到这个“多人模式”对象
        this.$settings = this.$menu.find('.ac-game-menu-field-item-settings'); // 找到这个“设置”对象
        this.start();
    }

    start(){
        this.add_listening_events();

    }

    add_listening_events(){
        let outer = this;
        this.$single_mode.click(function(){
            outer.hide();
            outer.root.playground.show();
        });
        this.$multi_mode.click(function(){
            console.log("click multi mode");
        });
        this.$settings.click(function(){
             console.log("click settings");
        });
    }

    show(){  // 显示menu界面
        this.$menu.show();
    }

    hide(){  // 关闭menu界面
        this.$menu.hide();
    }
}
let AC_GAME_OBJECTS = [];

class AcGameObject{
    constructor(){
        AC_GAME_OBJECTS.push(this);
        // 是否执行过start函数
        this.has_called_start = false;
        // 当前帧距离上一帧的时间间隔ms
        this.timedelta = 0;
    }

    // 只会在第一帧执行
    start(){
    }

    //  每一帧都会执行
    update(){
    }

    //  被销毁前执行一次
    on_destory(){

    }

    // 删掉该物体
    destroy(){
        this.on_destory();
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
    last_timestamp = timestamp;
    // 递归调用，下一帧继续调用，动起来
    requestAnimationFrame(AC_GAME_ANIMATION);
}
// 启动动画，下一帧调用AC_GAME_ANIMATION
requestAnimationFrame(AC_GAME_ANIMATION);


class GameMap extends AcGameObject{
    constructor(playground){
        super();
        this.playground = playground;
        this.$canvas = $('<canvas></canvas>');
        this.ctx = this.$canvas[0].getContext('2d');
        this.ctx.canvas.width = this.playground.width;
        this.ctx.canvas.height = this.playground.height;
        this.playground.$playground.append(this.$canvas);
    }

    start(){
    }

    update(){
        this.render();
    }

    render(){
        this.ctx.fillStyle = "rgba(0, 0, 0, 0.2)";
        this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    }
}
class Player extends AcGameObject{
    constructor(playground, x, y, radius, color, speed, is_me){
        super();  // 实例化基类，理解为把当前对象加到动画中
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.move_length = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        //  精度，小于0.1即视为0
        this.eps = 0.1;
        //  当前技能
        this.cur_skill = null;
    }

    start(){
        //  如果这个player是本机，则需要监听鼠标。
        if(this.is_me){
            this.add_listening_events();
        }
    }

    add_listening_events(){
        let outer = this;
        //  禁止鼠标右键显示菜单
        this.playground.game_map.$canvas.on("contextmenu", function(){
            return false;
        });
        //  e == 3为鼠标右键
        //  e == 1为鼠标左键
        //  e == 2为鼠标滚轮
        this.playground.game_map.$canvas.mousedown(function(e){
            if(e.which === 3){
                //  注意这里不能用this, 因为this会表示这个function自己.
                outer.move_to(e.clientX, e.clientY);
            }else if(e.which === 1){
                if(outer.cur_skill === "fireball"){
                    outer.shoot_fireball(e.clientX, e.clientY);
                }
                outer.cur_skill = null;
            }
        });

        $(window).keydown(function(e){
            //  q键
            if(e.which === 81){
                outer.cur_skill = "fireball";
                return false;
            }
        });
    }

    shoot_fireball(tx, ty){
        console.log("shoot fireball", tx, ty);
    }

    get_dist(x1, y1, x2, y2){
        let dx = x1 - x2;
        let dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }

    move_to(tx, ty){
        this.move_length = this.get_dist(this.x, this.y, tx, ty);
        let angle = Math.atan2(ty - this.y, tx - this.x);
        //  vx vy表示x和y方向
        this.vx = Math.cos(angle);
        this.vy = Math.sin(angle);
    }

    update(){
        //  每一帧都要画一遍，就像人每天都要吃饭
        if(this.move_length < this.eps){
            this.move_length = 0;
            this.vx = this.vy = 0;
        }else{
            let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
            this.x += this.vx * moved;
            this.y += this.vy * moved;
            this.move_length -= moved;
        }
        this.render();
    }

    render(){
        //  画圆，直接搜html canvas的api & 教程
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
class FireBall extends AcGameObject{
    constructor(playground, player, x, y, radius, vx, vy, color, speed, move_length){
        super();
        this.playground = playground;
        this.player = player;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        thix.vx = vx;
        this.vy = vy;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.move_length = move_length;
        this.eps = 0.1;
    }

    start(){
    }

    update(){
        if(this.move_length < this.eps){
            this.destroy();
            return false;
        }
        let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
        this.x += this.vx * moved;
        this.y += this.vy * moved;
        this.move_length -= moved;
        this.render();
    }

    render(){
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        this.ctx.fillStyle = this.color;
        this.ctx.fill();
    }
}
class AcGamePlayground{
    constructor(root){
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`); // HTML对象

        this.root.$ac_game.append(this.$playground); // 将这个HTML对象加入到HTML对象$ac_game
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.15, true));


        this.start();
    }

   // add_listening_events(){
   //     let outer = this; // 正确定位this，function的this就不是这个this了
   //     this.$back.click(function(){
   //         outer.hide(); // 隐藏
   //         outer.root.$menu.show(); // 显示$menu
   //     });
   // }

    show(){
        this.$playground.show(); // 显示这个$playground对象
    }

    hide(){
       this.$playground.hide(); // 隐藏$playground对象
    }

    start(){
        //this.add_listening_events(); // 开启监听
    }
}

        
export class AcGame{
   constructor(id){
       this.id = id;
       this.$ac_game = $('#' + id);
       // 为方便调试，暂时注释掉菜单页面
       // this.menu = new AcGameMenu(this);
       this.playground = new AcGamePlayground(this);
       this.start();
   }

    start(){
   }
}

