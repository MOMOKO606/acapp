class Settings{
    constructor(root){
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcWingOS) this.platform = "ACAPP";
        
        this.username = "";
        this.photo = "";

        this.start();
    }

    start(){
        this.getinfo();
    }

    //  打开注册界面
    register(){
    }

    //  打开登录界面
    login(){
    }

    getinfo(){
       let outer = this;
        $.ajax({
            url: "https://app6423.acapp.acwing.com.cn/settings/getinfo/",
            type: "GET",
            data: {
                platform: outer.platform,
            },
            success: function(resp){
                console.log(resp);
                if(resp.result === "success"){
                    outer.username = resp.username;
                    outer.photo = resp.photo;
                    outer.hide();
                    outer.root.menu.show();
                }else{
                    outer.login();
                }
            }
        });
    }

    hide(){
    }

    show(){
    }
}
