const PipeGroup = require('PipeGroup')
cc.Class({
    extends: cc.Component,

    properties: {
        //管道节点预置资源
       pipePrefab :cc.Prefab,
       //管道移动速度
       pipeMoveSpeed:-300,
       //每对管道之间的距离
       pipeSpacing:400,
    },

    
    onLoad(){
        this.pipeList = [];
        this.isRunning = false
    },

    start () {

    },
    //创建管道
    startSpawn(){
        this.spawnPipe();
        let spawnInterval = Math.abs(this.pipeSpacing / this.pipeMoveSpeed);
        this.schedule(this.spawnPipe,spawnInterval);
        this.isRunning = true;
    },

    spawnPipe(){
        let pipeGroup = null;
        //判断是否有管道
        if(cc.pool.hasObject(PipeGroup)){
            pipeGroup = cc.pool.getFromPool(PipeGroup);
        }else{
            pipeGroup = cc.instantiate(this.pipePrefab).getComponent(PipeGroup);
        }
        this.node.addChild(pipeGroup.node);
        pipeGroup.node.active = true;
        pipeGroup.init(this);
        this.pipeList.push(pipeGroup);
    },

    //清除超出屏幕范围的管道
    recyclePipe(pipe){
        pipe.node.removeFromParent();
        pipe.node.active = false;
        cc.pool.putInPool(pipe);
    },
    //获取下个未通过的管道
    getNext(){
        return this.pipeList.shift();
    },
    //管道重置
    reset(){
        this.unschedule(this.spawnPipe);
        this.pipeList = [];
        this.isRunning = false;
    }

});
