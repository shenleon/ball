var Ball = require("Ball");

cc.Class({
    extends: cc.Component,

    properties: {
    },

    // use this for initialization
    onLoad: function () {

    },
    onCollisionEnter: function (other, self) {
        var ball = other.node;
        ball.getComponent("Ball").stopMove();
    }
});
