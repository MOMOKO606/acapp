class MultiPlayerSocket{
    constructor(playground){
        this.playground = playground;

        // 建立连接
        this.ws = new WebSocket("wss://app6423.acapp.acwing.com.cn/wss/multiplayer/")
        this.start();
    }

    start(){
    }

    send_create_player(){
        this.ws.send(JSON.stringify({
            "message": "hello acapp server",
        }));
    }

}
