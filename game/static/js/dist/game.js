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
class AcGamePlayground{
    constructor(root){
        this.root = root;
        this.$playground = $(`
<div class="ac-game-playground">
    <div class="ac-game-playground-field">
        <div class="ac-game-playground-field-item ac-game-playground-field-item-back">
            ..Back
        </div>
    </div>
</div>
`); // HTML对象

        this.root.$ac_game.append(this.$playground); // 将这个HTML对象加入到HTML对象$ac_game
        this.$back = this.$playground.find('.ac-game-playground-item-back')
        this.start();
    }

    add_listening_events(){
        let outer = this; // 正确定位this，function的this就不是这个this了
        this.$back.click(function(){
            outer.hide(); // 隐藏
            outer.root.$menu.show(); // 显示$menu
        });
    }

    show(){
        this.$playground.show(); // 显示这个$playground对象
    }

    hide(){
       this.$playground.hide(); // 隐藏$playground对象
    }

    start(){
        this.hide(); // 一开始先隐藏
        this.add_listening_events(); // 开启监听
    }
}

        
class AcGame{
   constructor(id){
       this.id = id;
       this.$ac_game = $('#' + id);
       this.menu = new AcGameMenu(this);
       this.playground = new AcGamePlayground(this);
       this.start();
   }

    start(){
   }
}
