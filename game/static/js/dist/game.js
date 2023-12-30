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
        obj = AC_GAME_OBJECTS[i];
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

