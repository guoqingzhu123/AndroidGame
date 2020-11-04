cc.Class({
    extends: cc.Component,

    properties: {
    //滚动的速度，单位px/s
    speed : -300,
    //x到达此位置后开始重头滚动
    resetX : -300
    },
   
    //控制地板是否滚动
    onLoad() {
        this.canScroll = true;
    },

    update (dt) {
        if (!this.canScroll) {
            return;
        }
        //每帧运动dt*speed像素，1秒运动的距离就是speed
        this.node.x += this.speed * dt;
        if(this.node.x <= this.resetX) {
        //当运动超过resetX时，返回原来的位置重新开始运动
        this.node.x -= this.resetX;
        }
    },
    //结束运动
    stopScroll () {
        this.canScroll = false;
    },
    //开始运动
    startScroll() {
        this.canScroll = true;
    },

    start () {

    },

   

});
