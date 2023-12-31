class Player extends AcGameObject{
    constructor(playground, x, y, radius, color, speed, is_me){
        super();  // 实例化基类，理解为把当前对象加到动画中
        this.playground = playground;
        this.ctx = this.playground.game_map.ctx;
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.is_me = is_me;
        //  精度，小于0.1即视为0
        this.eps = 0.1;  
    }

    start(){
    }

    update(){
        //  每一帧都要画一遍，就像人每天都要吃饭
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
