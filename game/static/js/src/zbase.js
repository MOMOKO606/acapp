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

