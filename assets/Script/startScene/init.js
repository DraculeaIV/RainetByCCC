cc.Class({
    extends: cc.Component,

    properties: {
        pauseObj: cc.Node,
        pauseObj2: cc.Node
    },

    // use this for initialization
    onLoad: function () {
        // 获得callbacks脚本组件
        this.callbacks = cc.find('callbacks_script').getComponent('callbacks');
        // 初始化websocket
        cc.webSocket = this.initWebSocket('ws://121.42.170.78:12345');
    },

    randomString: function(len) {
    　　len = len || 32;
    　　var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    　　var maxPos = $chars.length;
    　　var pwd = '';
    　　for (var i = 0; i < len; i++) {
    　　　　pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    　　}
    　　return pwd;
    },

    initWebSocket: function(host){
        var ws = new WebSocket(host);

        ws.onopen = this.callbacks.onWSOpen;

        ws.onmessage = this.callbacks.onWSMsg;

        ws.onerror = this.callbacks.onWSErr

        ws.onclose = this.callbacks.onWSClose;

        setTimeout(function () {
            if (ws.readyState === WebSocket.OPEN) {
                cc.log("WebSocket ready");
            }
            else {
                console.log("WebSocket instance wasn't ready...");
                ws.close();
            }
        }, 3000);
        return ws;
    }
});
