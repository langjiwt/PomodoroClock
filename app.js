/**
 * Created by chris on 2017/4/28.
 */
var app = new Vue({
    el:'#app',
    data:{
        breakTime:5,
        sessionTime:25,
        timerTitle:"Session",
        time:25
    },
    methods:{
        decreaseBreakTime:function(){
            if(this.breakTime>0){
                this.breakTime--;
            }
        },
        increaseBreakTime:function () {
            this.breakTime++;
        },
        decreaseSessionTime:function () {
            if(this.sessionTime>0){
                this.sessionTime--;
            }
        },
        increaseSessionTime:function () {
            this.sessionTime++;
        }
    }
})