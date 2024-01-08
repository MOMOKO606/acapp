export class AcGame{
   constructor(id, AcWingOS){
       this.id = id;
       this.$ac_game = $('#' + id);
       this.AcWingOS = AcWingOS;
        
       this.settings = new Settings(this);
       // 为方便调试，暂时注释掉菜单页面
       this.menu = new AcGameMenu(this);
       this.playground = new AcGamePlayground(this);
      
       this.start();
   }

    start(){
   }
}

