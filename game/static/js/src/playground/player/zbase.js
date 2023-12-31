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
