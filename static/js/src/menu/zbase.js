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
            Preferences(Logout)
         </div>
     </div>
</div>
`); 
        this.$menu.hide();
        // 创建一个HTML对象，menu
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
            outer.root.playground.show("single mode");
        });
        this.$multi_mode.click(function(){
            outer.hide();
            outer.root.playground.show("multi mode");
        });
        this.$settings.click(function(){
            outer.root.settings.logout_on_remote();
        });
    }

    show(){  // 显示menu界面
        this.$menu.show();
    }

    hide(){  // 关闭menu界面
        this.$menu.hide();
    }
}
