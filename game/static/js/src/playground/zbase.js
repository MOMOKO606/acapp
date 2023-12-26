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

        
