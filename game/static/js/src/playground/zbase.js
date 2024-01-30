class AcGamePlayground{
    constructor(root){
        this.root = root;
        this.$playground = $(`<div class="ac-game-playground"></div>`); // HTML对象

        this.hide();
        this.root.$ac_game.append(this.$playground); // 将这个HTML对象加入到HTML对象$ac_game

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
    resize(){
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        let unit = Math.min(this.width / 16, this.height / 9);
        this.width = unit * 16;
        this.height = unit * 9;
        this.scale = this.height  // scale表示单位1，当画布尺寸变化时，所有内容都应随之变化

        if(this.game_map) this.game_map.resize();
    }

    show(mode){
        let outer = this;
        this.$playground.show(); // 显示这个$playground对象
        this.width = this.$playground.width();
        this.height = this.$playground.height();
        this.game_map = new GameMap(this);
        
        this.mode = mode;
        this.resize();

        this.players = [];
        this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, "white", 0.25, "me", this.root.settings.username, this.root.settings.photo));

        if(mode === "single mode"){
            for(let i = 0; i < 5; i++){
                this.players.push(new Player(this, this.width / 2 / this.scale, 0.5, 0.05, this.get_random_color(), 0.15, "robot"));
            }
        } else if(mode === "multi mode"){
            this.mps = new MultiPlayerSocket(this);  // 创建ws连接
            this.mps.uuid = this.players[0].uuid;  // 令mps自己的uuid就是玩家本身的uuid

            //  当ws连接创建成功时，回调onopen函数
            this.mps.ws.onopen = function(){
                outer.mps.send_create_player(outer.root.settings.username, outer.root.settings.photo);
            };
        }
    }

    hide(){
       this.$playground.hide(); // 隐藏$playground对象
    }

    start(){
        //this.add_listening_events(); // 开启监听
        let outer = this;
        //  每当用户改变窗口大小时，都会触发window.resize函数
        $(window).resize(function(){
            outer.resize();
        });
    }
}

        
