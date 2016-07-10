cc.Class({
    extends: cc.Component,

    properties: {

    },

    // use this for initialization
    onLoad: function () {
        var anim = this.getComponent(cc.Animation);
        var animState = anim.play("boy_run5");
        animState.wrapeMode = cc.WrapMode.Normal;
        // 设置循环模式为 Loop
        animState.wrapeMode = cc.WrapMode.Loop;
        // 设置动画循环次数为2次
        // animState.repeatCount = 2;
        // 设置动画循环次数为无限次
        animState.repeatCount = Infinity;
    }
});
