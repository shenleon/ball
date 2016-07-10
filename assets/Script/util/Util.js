module.exports = {
    /** 已知交点横坐标，求交点 */
    intersectionPointX: function (a, b, c, px) {
        var y = -(a * px + c) / b;
        return cc.p(px, y);
    },
    /** 已知交点纵坐标，求交点 */
    intersectionPointY: function (a, b, c, py) {
        var x = -(b * py + c) / a;
        return cc.p(x, py);
    },
    /** 判断边界和方向 */
    judgeBorderDirection: function (x, y, px, py, p, pw, ph) {
        //判断坐标是否超出边界
        if (Math.abs(p.x) <= pw / 2 && Math.abs(p.y) <= ph / 2) {
            //判断方向
            if (Math.abs(p.x - px) + Math.abs(px - x) <= Math.abs(p.x - x)) {
                if (Math.abs(p.y - py) + Math.abs(py - y) <= Math.abs(p.y - y)) {
                    return true;
                }
            }
        }
        return false;
    },
    /**
     * 计算运动轨迹
     */
    movePath: function (x, y, px, py, pw, ph) {
        console.log("x=" + x + ",y=" + y + ",px=" + px + ",py=" + py + ",pw=" + pw + ",ph=" + ph);
        //计算直线的方程
        //ax + by + c = 0;
        var a = py - y;
        var b = x - px
        var c = px * y - x * py
        //计算运动方向与边界的交点
        var p = null;
        //与左边的交点
        var p1 = this.intersectionPointX(a, b, c, -pw / 2);
        //判断坐标是否超出边界并且方向正确
        if (this.judgeBorderDirection(x, y, px, py, p1, pw, ph) === true) {
            return p1;
        }
        //与右边的交点
        var p2 = this.intersectionPointX(a, b, c, pw / 2);
        //判断坐标是否超出边界并且方向正确
        if (this.judgeBorderDirection(x, y, px, py, p2, pw, ph) === true) {
            return p2;
        }
        //与上面的交点
        var p3 = this.intersectionPointY(a, b, c, ph / 2);
        //判断坐标是否超出边界并且方向正确
        if (this.judgeBorderDirection(x, y, px, py, p3, pw, ph) === true) {
            return p3;
        }
        //与下面的交点
        var p4 = this.intersectionPointY(a, b, c, -ph / 2);
        //判断坐标是否超出边界并且方向正确
        if (this.judgeBorderDirection(x, y, px, py, p4, pw, ph) === true) {
            return p4;
        }
        return null;
    },
    modifyLoc: function (x, y, psize, csize) {
        var loc = cc.p(x, y);
        //父面板宽高
        var pWidth = psize.width;
        var pHeight = psize.height;
        //球的宽高
        var thWidth = csize.width;
        var thHeight = csize.height;
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
    //计算直线旋转角度
    computeAngle: function (startX, startY, endX, endY) {
        var cutX = endX - startX;
        var cutY = endY - startY;
        //直线旋转角度
        var angle = 0;
        //第一象限
        if (cutX > 0 && cutY > 0) {
            angle = Math.PI - Math.atan2(Math.abs(cutY), Math.abs(cutX));
        }
        //第二象限
        else if (cutX < 0 && cutY > 0) {
            angle = Math.atan2(Math.abs(cutY), Math.abs(cutX));
        }
        //第三象限
        else if (cutX < 0 && cutY < 0) {
            angle = Math.PI - Math.atan2(Math.abs(cutY), Math.abs(cutX));
        }
        //第四象限
        else if (cutX > 0 && cutY < 0) {
            angle = Math.atan2(Math.abs(cutY), Math.abs(cutX));
        }
        return angle;
    }
};