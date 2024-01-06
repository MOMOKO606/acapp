class Player extends AcGameObject{
    constructor(playground, x, y, radius, color, speed, is_me){
        super();  // 实例化基类，理解为把当前对象加到动画中
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.vx = 0;
        this.vy = 0;
        this.damage_x = 0;
        this.damage_y = 0;
        this.damage_speed = 0;
        this.move_length = 0;
        this.radius = radius;
        this.color = color;
        this.speed = speed;
        this.is_me = is_me;
        this.is_dead = false;
        this.countdown = 0;
        //  被击中后减速效果
        this.friction = 0.9;
        //  精度，小于0.1即视为0
        this.eps = 0.1;
        //  当前技能
        this.cur_skill = null;
    }

    start(){
        //  如果这个player是本机，则需要监听鼠标。
        if(this.is_me){
            this.add_listening_events();
        }else{
            let tx = Math.random() * this.playground.width;
            let ty = Math.random() * this.playground.height;
            this.move_to(tx, ty);
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
            const rect = outer.ctx.canvas.getBoundingClientRect();
            if(e.which === 3){
                //  注意这里不能用this, 因为this会表示这个function自己.
                outer.move_to(e.clientX - rect.left, e.clientY - rect.top);
            }else if(e.which === 1){
                if(outer.cur_skill === "fireball"){
                    outer.shoot_fireball(e.clientX - rect.left, e.clientY - rect.top);
                }
                //  技能释放结束后应重置cur skill
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
        if(this.is_dead){return false;}
        let x = this.x;
        let y = this.y;
        let radius = this.playground.height * 0.01;
        let angle = Math.atan2(ty - this.y, tx - this.x);
        let vx = Math.cos(angle);
        let vy = Math.sin(angle);
        let color = "orange";
        let speed = this.playground.height * 0.5;
        let move_length = this.playground.height * 1;
        //  注意player的radius是height * 0.05
        //  fireball的damage是height * 0.0125
        //  所以被攻击一次损失25%的生命值（生命值即radius）
        new FireBall(this.playground, this, x, y, radius, vx, vy, color, speed, move_length, this.playground.height * 0.0125);

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

    is_attacked(angle, damage){
        //  被攻击后的particle四散效果
        for(let i = 0; i < 20 + Math.random() * 10; i++){
            let x = this.x, y = this.y;
            let radius = this.radius * Math.random() * 0.1;
            let angle = Math.PI * 2 * Math.random();
            let vx = Math.cos(angle), vy = Math.sin(angle);
            let color = this.color;
            let speed = this.speed * 10;
            let move_length = this.radius * Math.random() * 5;
            new Particle(this.playground, x, y, radius, vx, vy, color, speed, move_length);
        }

        this.radius -= damage;
        if(this.radius < 10){
            this.is_dead = true;
            this.destroy();
            return false;
        }
        this.damage_x = Math.cos(angle);
        this.damage_y = Math.sin(angle);
        this.damage_speed = damage * 100;
        //  被攻击后速度越来越快
        this.speed *= 1.25;
    }

    update(){
        //  累加时间
        this.countdown += this.timedelta / 1000;
        //  给一定的概率随机攻击
        if(!this.is_me && this.countdown > 5 && Math.random() < 1 / 360.0){
            let player = this.playground.players[Math.floor(Math.random() * this.playground.players.length)];
            this.shoot_fireball(player.x, player.y);
        }
        if(this.damage_speed > this.eps){
            this.vx = this.vy = 0;
            this.move_length = 0;
            this.x += this.damage_x * this.damage_speed * this.timedelta / 1000;
            this.y += this.damage_y * this.damage_speed * this.timedelta / 1000;
            this.damage_speed *= this.friction;
        }else{
            //  每一帧都要画一遍，就像人每天都要吃饭
            if(this.move_length < this.eps){
                this.move_length = 0;
                this.vx = this.vy = 0;
                if(!this.is_me){
                    let tx = Math.random() * this.playground.width;
                    let ty = Math.random() * this.playground.height;
                    this.move_to(tx, ty);
                }
            }else{
                let moved = Math.min(this.move_length, this.speed * this.timedelta / 1000);
                this.x += this.vx * moved;
                this.y += this.vy * moved;
                this.move_length -= moved;
            }
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
