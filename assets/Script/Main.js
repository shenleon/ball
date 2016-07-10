var Ball = require("Ball");
var Door = require("Door");
var Util = require("Util");
var prefab = require("prefab");

cc.Class({
    extends: cc.Component,

    properties: {

    },
    // use this for initialization
    onLoad: function () {
        var size = cc.winSize;
        this.mainNode = new cc.Node();
        this.mainNode.width = size.width;
        this.mainNode.height = size.height;
        this.mainNode.color = new cc.Color(100, 100, 100);
        this.mainNode.parent = this.node;
        //添加球
        this.initBall();
        //添加球门
        this.initDoor();
        //初始化碰撞系统
        this.initCollider();
        this.addInputListener();
    },
    //初始化碰撞系统
    initCollider: function () {
        var manager = cc.director.getCollisionManager();
        manager.enabled = true;
        // manager.enabledDebugDraw = true;
        // manager.enabledDrawBoundingBox = true;
    },
    //添加触摸事件
    addInputListener: function () {
        this.mainNode.on(cc.Node.EventType.TOUCH_END, this.touchEnd, this);
    },
    //触摸结束方法
    touchEnd: function (event) {
        var node = event.target;
        var loc = event.getLocation();
        console.log("x = " + loc.x + ",y = " + loc.y);
        loc = this.node.convertToNodeSpaceAR(loc);
        console.log("转换坐标 ：" + loc);
        loc = this.modifyLoc(loc.x, loc.y);
        console.log("修正坐标 ：" + loc);
        var x = this.ball.x, y = this.ball.y;
        var px = loc.x, py = loc.y;
        var pw = this.node.width - this.ball.width, ph = this.node.height - this.ball.height;
        loc = Util.movePath(x, y, px, py, pw, ph);
        console.log("计算后坐标：" + loc);
        if (loc == null) return;
        this.ball.getComponent("Ball").startMove(loc.x, loc.y);
        event.stopPropagation();
        this.drawLine(this.ball.x, this.ball.y, loc.x, loc.y);
    },
    //修正位置，防止超出边界
    modifyLoc: function (x, y) {
        var loc = cc.p(x, y);
        //父面板宽高
        var pWidth = this.node.width;
        var pHeight = this.node.height;
        //球的宽高
        var thWidth = this.ball.width;
        var thHeight = this.ball.height;
        if (x < -(pWidth / 2 - thWidth / 2)) {
            loc.x = -(pWidth / 2 - thWidth / 2);
        } else if (x > pWidth / 2 - thWidth / 2) {
            loc.x = pWidth / 2 - thWidth / 2;
        }
        if (y < -(pHeight / 2 - thHeight / 2)) {
            loc.y = -(pHeight / 2 - thHeight / 2);
        } else if (y > pHeight / 2 - thHeight / 2) {
            loc.y = pHeight / 2 - thHeight / 2;
        }
        return loc;
    },
    //初始化球门
    initDoor: function () {
        this.door = undefined;
        var self = this;
        if (cc.pool.hasObject(Door)) {
            self.door = cc.pool.getFromPool(Door).node;
            self.door.parent = self.mainNode;
        } else {
            cc.loader.loadRes(prefab.doorPrefab, function (err, prefab) {
                if (err) {
                    cc.log(err.message || err);
                    return;
                }
                self.door = cc.instantiate(prefab);
                cc.pool.putInPool(self.door);
                self.door.parent = self.mainNode;
            });
        }
    },
    //初始化球
    initBall: function () {
        //添加一个球
        this.ball = undefined;
        var self = this;
        if (cc.pool.hasObject(Ball)) {
            self.ball = cc.pool.getFromPool(Ball).node;
            self.ball.parent = self.mainNode;
        } else {
            cc.loader.loadRes(prefab.ballPrefab, function (err, prefab) {
                if (err) {
                    cc.log(err.message || err);
                    return;
                }
                self.ball = cc.instantiate(prefab);
                cc.pool.putInPool(self.ball);
                self.ball.parent = self.mainNode;
            });
        }
    },
    //根据起点和终点画一条直线
    drawLine: function (startX, startY, endX, endY) {
        var cutX = endX - startX;
        var cutY = endY - startY;
        //直线长度
        var length = Math.sqrt(Math.abs(cutX) * Math.abs(cutX) + Math.abs(cutY) * Math.abs(cutY));
        //直线旋转角度
        var angle = Util.computeAngle(startX, startY, endX, endY) / Math.PI * 180;
        //直线中心点坐标
        var poi = cc.p((startX + endX) / 2, (startY + endY) / 2);
        console.log("length = " + length + ",angle = " + angle + ",x = " + poi.x + ",y = " + poi.y);
        var line = undefined;
        var self = this;
        cc.loader.loadRes(prefab.linePrefab, function (err, prefab) {
            if (err) {
                cc.log(err.message || err);
                return;
            }
            line = cc.instantiate(prefab);
            line.parent = self.mainNode;
            line.width = length;
            line.x = poi.x;
            line.y = poi.y;
            line.rotation = angle;
        });
    },

});
