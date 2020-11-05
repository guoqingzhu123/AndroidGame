
var Bird = require('Bird');
var PipeManager = require('PipeManager')
cc.Class({
    extends: cc.Component,

    properties: {
        /* 遮罩节点*/
        maskLayer: {
            type: cc.Node,
            default: null
        },
        //准备开始菜单节点
        readyMenu:{
            type: cc.Node,
            default: null
        },

        bird:Bird,
        pipeManager:PipeManager,
      
    },

     //调用
     onLoad () {
        this._revealScene();
        this._enableInput(true);
        this.bird.init(this);
    },

      //场景切换
    _revealScene(){
        this.maskLayer.active = true;
        this.maskLayer.color = cc.Color.BLACK;
        this.maskLayer.runAction(cc.fadeOut(0.3));
    },

    start () {

    },

    //定义键盘点击的事件监听并在onLoad中调用，并初始化事件的监听
    _enableInput: function(enable){
        if(enable){
            cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
            this.node.on(cc.Node.EventType.TOUCH_START,this.onTouch,this);
        }else{
            cc.systemEvent.off(cc.SystemEvent.EventType.KEY_DOWN,this.onKeyDown,this);
            this.node.off(cc.Node.EventType.TOUCH_START,this.onTouch,this);
        }
    },

     //定义开始游戏的方法，并在其中控制ready节点的消失
    _hideReadyMenu(){
        this.readyMenu.runAction(
            cc.sequence(
                cc.fadeOut(0.5),
                cc.callFunc(()=>{
                    this.readyMenu.active = false;
                },this)
            )
        );
    },

      //定义键盘事件 处理函数，鼠标点击事件函数
    onKeyDown(){
        this._startGameOrJumpBird();
    },
    onTouch(){
        this._startGameOrJumpBird();
        return true;
    },

     //开始或者飞行
     _startGameOrJumpBird(){
        //如果是准备状态则运行开始游戏，否则继续飞行
        if(this.bird.state === Bird.State.Ready){
            this._gameStart();
        }else{
            //继续飞行
            this.bird.rise();
        }
    },

     //游戏开始
     _gameStart(){
        //隐藏menu
        this._hideReadyMenu();
        //开始飞行
        this.bird.startFly();
        this.pipeManager.startSpawn();
    },
    //游戏结束
    gameOver(){
        this.pipeManager.reset();
        this._enableInput(false);

        // this.ground.getComponent(Scroller).stopScroll(); //地板停止滚动
        // this.background.getComponent(Scroller).stopScroll();//背景停止滚动
        // this.blinkOnce();//闪烁一次
        // this.showGameOverMenu();//显示游戏结束菜单
    },
    
});
