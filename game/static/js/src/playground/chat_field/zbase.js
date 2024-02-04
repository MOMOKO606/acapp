class ChatField{
    constructor(playground){
        this.playground = playground;

        this.$history = $('<div class="ac-game-chat-field-history">Messages </div>');
        this.$input = $('<input type="text" class="ac-game-chat-field-input">');

        this.$history.hide();
        this.$input.hide();
        this.func_id = null;

        this.playground.$playground.append(this.$history);
        this.playground.$playground.append(this.$input);

        this.start();
    }

    start() {
        this.add_listening_events();
    }

    add_listening_events(){
        let outer = this;
        this.$input.keydown(function(e){
            if (e.which === 27){  // esc
                outer.hide_input();
                return false;
            }
        });
    }

    show_history(){
        let outer = this;
        this.$history.fadeIn();
        if(this.func_id) clearTimeout(this.func_id);
        //  只显示3秒
        this.func_id = setTimeout(function() {
            outer.$history.fadeOut();
            outer.func_id = null;
        }, 3000);
    }

    show_input() {
        this.show_history();
        this.$input.show();
        this.$input.focus();
    }

    hide_input() {
        this.$input.hide();
        this.playground.game_map.$canvas.focus();
    }
}
