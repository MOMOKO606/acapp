class AcGamePlayground{
    constructor(root){
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`); // HTML对象

        this.root.$ac_game.append(this.$playground); // 将这个HTML对象加入到HTML对象$ac_game
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        this.players = [];
        this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, "white", this.height * 0.25, true));

        for(let i = 0; i < 5; i++){
            this.players.push(new Player(this, this.width / 2, this.height / 2, this.height * 0.05, this.get_random_color(), this.height * 0.15, false));
        }


        this.start();
    }

    get_random_color(){
        let colors = ["blue", "red", "pink", "purple", "green", "yellow"];
        return colors[Math.floor(Math.random() * 6)];
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

        
