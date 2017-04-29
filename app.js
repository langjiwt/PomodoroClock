/**
 * Created by chris on 2017/4/28.
 */
var app = new Vue({
    el:'#app',
    data:{
        breakTime:5,//break时间，单位为分钟
        sessionTime:25,//session时间，单位为分钟
        sessionTitle:"Session",
        breakTitle:"Break",
        actualTime:1500,//当前剩余的实际时间，break和session共用，单位为秒
        totalTime:1500,//当前状态的总时间，
        isRunning:false,
        isSession:true,
        interval:null
    },
    methods:{
        decreaseBreakTime:function(){
            if(this.breakTime>1){
                this.breakTime--;
                this.breakAction();
            }
        },
        increaseBreakTime:function () {
            this.breakTime++;
            this.breakAction();
        },
        breakAction:function () {
            if(!this.isSession){
                this.actualTime = this.breakTime*60;
                this.totalTime = this.breakTime*60;
                this.stop();
            }
        },
        decreaseSessionTime:function () {
            if(this.sessionTime>1){
                this.sessionTime--;
                if(this.isSession){
                    this.actualTime = this.sessionTime*60;
                    this.totalTime = this.sessionTime*60;
                    this.stop()
                }
            }
        },
        increaseSessionTime:function () {
            this.sessionTime++;
            if(this.isSession){
                this.actualTime = this.sessionTime*60;
                this.totalTime = this.sessionTime*60;
                this.stop();
            }
        },
        runOrStop:function () {
            if(this.isRunning){
                this.stop();
                this.isRunning = false;
            }
            else{
                this.start();
                this.isRunning = true;
            }
        },
        start:function(){
            let self = this;
            this.interval = setInterval(function () {
                if(self.actualTime > 0){
                    self.actualTime--;
                    console.log(self.actualTime+"|"+self.totalTime);
                    self.$refs.cover.style.height = 290*self.actualTime/self.totalTime+"px";
                }
                else{
                    if(self.isSession){
                        self.totalTime = self.breakTime*60;
                        self.actualTime = self.breakTime*60;
                        self.isSession = false;

                    }
                    else{
                        self.totalTime = self.sessionTime*60;
                        self.actualTime = self.sessionTime*60;
                        self.isSession = true;

                    }
                }
            },1000);
        },
        stop:function () {
            window.clearInterval(this.interval);
        }
    },
    computed:{
        time:function () {
            if((this.actualTime%60)<10){
                return Math.floor(this.actualTime/60)+":0"+(this.actualTime%60);
            }
            else{
                return Math.floor(this.actualTime/60)+":"+(this.actualTime%60);
            }
        }
    }
})