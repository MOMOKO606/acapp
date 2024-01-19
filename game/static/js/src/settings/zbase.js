class Settings{
    constructor(root){
        this.root = root;
        this.platform = "WEB";
        if(this.root.AcWingOS) this.platform = "ACAPP";

        this.username = "";
        this.photo = "";

        this.$settings = $(`
<script src="https://apis.google.com/js/platform.js" async defer></script>

<meta name="google-signin-client_id" content="901762832151-1pb0q2e95m8q2k0cadu1vvchnpj7nv80.apps.googleusercontent.com">

<div class="ac-game-settings">
    <div class="ac-game-settings-login">
        <div class="ac-game-settings-title">
            Login
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="Username">
            </div>
        </div>
        <div class="ac-game-settings-password">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="Password">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>Login to your account</button>
            </div>
        </div>
        <div class="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            Register
        </div>
        <div class="ac-game-settings-google">
           <img width="30" src="https://app6423.acapp.acwing.com.cn/static/image/settings/acwing_logo.png"> 
           <div>
               Sign in with AcWing
           </div>
        </div>
        <div class="ac-game-settings-google2">
            <div class="g-signin2" data-onsuccess="onSignIn"></div>
        </div>
    </div>

    <div class="ac-game-settings-register">
        <div class="ac-game-settings-title">
            Register
        </div>
        <div class="ac-game-settings-username">
            <div class="ac-game-settings-item">
                <input type="text" placeholder="Username">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-first">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="Password">
            </div>
        </div>
        <div class="ac-game-settings-password ac-game-settings-password-second">
            <div class="ac-game-settings-item">
                <input type="password" placeholder="Confirm Password">
            </div>
        </div>
        <div class="ac-game-settings-submit">
            <div class="ac-game-settings-item">
                <button>Sign up</button>
            </div>
        </div>
        <div class="ac-game-settings-error-message">
        </div>
        <div class="ac-game-settings-option">
            Go Back to Login
        </div>
    </div>
</div>   
        `);
        this.$login = this.$settings.find(".ac-game-settings-login");
        this.$login_username = this.$login.find(".ac-game-settings-username input");
        this.$login_password = this.$login.find(".ac-game-settings-password input");
        this.$login_submit = this.$login.find(".ac-game-settings-submit button");
        this.$login_error_message = this.$login.find(".ac-game-settings-error-message");
        this.$login_register = this.$login.find(".ac-game-settings-option");

        this.$login.hide();

        this.$register = this.$settings.find(".ac-game-settings-register");
        this.$register_username = this.$register.find(".ac-game-settings-username input");
        this.$register_password = this.$register.find(".ac-game-settings-password-first input");
        this.$register_password_confirm = this.$register.find(".ac-game-settings-password-second input");
        this.$register_submit = this.$register.find(".ac-game-settings-submit button");
        this.$register_error_message = this.$register.find(".ac-game-settings-error-message");
        this.$register_login = this.$register.find(".ac-game-settings-option");

        this.$register.hide();

        this.$google_login = this.$settings.find(".ac-game-settings-google img")

        this.root.$ac_game.append(this.$settings);

        this.start();
    }

    start(){
        this.getinfo();
        this.add_listening_events();
    }


    add_listening_events(){
        let outer = this;
        this.add_listening_events_login();
        this.add_listening_events_register();
        
        this.$google_login.click(function(){
            outer.google_login();
        });
    }


    add_listening_events_login(){
        let outer = this;
        this.$login_register.click(function(){
            outer.register();
        });
        this.$login_submit.click(function(){
            outer.login_on_remote();
        });
    }

    add_listening_events_register(){
        let outer = this;
        this.$register_login.click(function(){
            outer.login();
        });
        this.$register_submit.click(function(){
            outer.register_on_remote();
        });
    }

    google_login(){
        $.ajax({
            url: "https://app6423.acapp.acwing.com.cn/settings/google/web/apply_code/",
            type: "GET",
            success: function(resp){
                console.log(resp);
                if(resp.result === "success"){
                    window.location.replace(resp.apply_code_url);
                }
            }
        });
    }

    //  在远程服务器上登录
    login_on_remote(){
        let outer = this;
        let username = this.$login_username.val();  //val()表示取出input的值
        let password = this.$login_password.val();
        this.$login_error_message.empty();  //清空error message

        //  用ajax向server调用signin函数
        $.ajax({
            url: "https://app6423.acapp.acwing.com.cn/settings/login/",
            type: "GET",
            data: {
                username: username,
                password: password,
            },
            success: function(resp){
                console.log(resp);
                //  如果登录成功就原地刷新（cookie会记录登录成功）
                //  则刷新后会通过getinfo获取信息，进而加载menu
                //  登录成功直接刷新的模式和第三方授权一致
                if(resp.result === "success"){
                    location.reload();
                }else{
                    outer.$login_error_message.html(resp.result);
                }
            }

        });
    }

    //  在远程服务器上注册
    register_on_remote(){
        let outer = this;
        let username = this.$register_username.val();
        let password = this.$register_password.val();
        let password_confirm = this.$register_password_confirm.val();
        this.$register_error_message.empty();

        $.ajax({
            url: "https://app6423.acapp.acwing.com.cn/settings/register/",
            type:"GET",
            data: {
                username: username,
                password: password,
                password_confirm: password_confirm,
            },
            success:  function(resp){
                console.log(resp);
                if(resp.result === "success"){
                    location.reload();
                }else{
                    outer.$register_error_message.html(resp.result);
                }
            }
        });
    }

    //  在远程服务器上登出
    logout_on_remote(){
        if(this.platform === "ACAPP") return false;

        $.ajax({
            url: "https://app6423.acapp.acwing.com.cn/settings/logout/",
            type: "GET",
            success: function(resp){
                console.log(resp);
                if(resp.result === "success"){
                    location.reload();
                }
            }
        });
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
                    // outer.register();
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
