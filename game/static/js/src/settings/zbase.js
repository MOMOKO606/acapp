class Settings{
    constructor(root){
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcWingOS) this.platform = "ACAPP";
        
        this.username = "";
        this.photo = "";

        this.$settings = $(`
            <div class="ac-game-settings">
                <div class="ac-game-settings-login">
                    <div class="ac-game-settings-title">
                        Login
                    </div>
                    <div class="ac-game-settings-username">
                        <div class="ac-game-settings-item">
                            <input type="text" placeholder="username">
                        </div>
                    </div>
                    <div class="ac-game-settings-password">
                        <div class="ac-game-settings-item">
                            <input type="password" placeholder="password">
                        </div>
                    </div>
                    <div class="ac-game-settings-submit">
                        <div class="ac-game-settings-item">
                            <button>Login to your account</button>
                        </div>
                    </div>
                    <div class="ac-game-settings-error-messages">
                            Invalid username or password
                    </div>
                    <div class="ac-game-settings-option">
                            Register
                    </div>
                </div>
                <div class="ac-game-settings-register">
                </div>
            </div>
        `);
        this.$login = this.$settings.find(".ac-game-settings-login");

        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");

        this.$register.hide();

        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start(){
        this.getinfo();
    }

    //  打开注册界面
    register(){
        this.$login.hide();
        this.$register.show();
    }

    //  打开登录界面
    login(){
        this.$register.hide();
        this.$login.show();
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
        this.$settings.hide();
    }

    show(){
        this.$settings.show();
    }
}
