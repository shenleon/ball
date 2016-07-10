cc.Class({
    extends: cc.Component,

    properties: {
        //步长
        step: 0
    },
    // use this for initialization
    onLoad: function () {

    },
    //计算移动时间
    computeTime: function (endX, endY) {
        var cutX = Math.abs(endX - this.node.x);
        var cutY = Math.abs(endY - this.node.y);
        var distance = Math.sqrt(cutX * cutX + cutY * cutY);
        var time = distance / this.step / 100;
        return time;
    },
    //初始化转动动画
    roll: function () {
        var anim = this.getComponent(cc.Animation);
        var animState = anim.play("run");
        // 设置循环模式为 Normal
        animState.wrapeMode = cc.WrapMode.Normal;
        // 设置循环模式为 Loop
        animState.wrapeMode = cc.WrapMode.Loop;
        // 设置动画循环次数为2次
        // animState.repeatCount = 2;
        // 设置动画循环次数为无限次
        animState.repeatCount = Infinity;
    },
    //停止
    stopMove: function () {
        this.getComponent(cc.Animation).stop("run");
        this.node.stopAllActions();
    },
    //移动
    startMove: function (x, y) {
        var loc = cc.p(x, y);
        this.roll();
        var duration = this.computeTime(loc.x, loc.y);
        var self = this;
        var act = cc.moveTo(duration, cc.p(loc.x, loc.y));
        var finished = cc.callFunc(function (self) {
            var anim = self.getComponent(cc.Animation);
            anim.stop("run");
        }, self);
        var sce = cc.sequence(act, finished);
        this.node.runAction(sce);
    }
});
