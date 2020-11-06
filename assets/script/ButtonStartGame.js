cc.Class({
    extends: cc.Component,

    properties: {
        maskLayer : {
            default : null,
            type : cc.Node
        },

        swooshingAudio: {
            default : null,
            url :cc.AudioClip
        }
        
    },

    startGame() {
        //激活蒙版
        this.maskLayer.active = true;
        //将蒙版的都名设置为0
        this.maskLayer.opacity = 0;
        //将蒙版设置为黑色
        this.maskLayer.color = cc.Color.BLACK;
        //运行一个action，先让蒙版在0.2秒中逐渐的显示出来，然后打印一个log
        this.maskLayer.runAction(
            cc.sequence(
                cc.fadeIn(0,2),
                cc.callFunc(function () {
                    console.log('切换场景');
                    cc.director.loadScene('game');
                },this)
            )
        );
        cc.audioEngine.playEffect(this.swooshingAudio);
    },

    start () {

    },

    
});
