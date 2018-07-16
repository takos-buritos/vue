<template>
    <div class="alert">
        <div :class="'timer alert-' + type">Time left: {{ curTime }}</div>
        <hr>
        <h3>{{ x }} + {{ y }} = ?</h3>   
        <hr>
        <div class="buttons">
            <button class="btn btn-success"
                v-for="num in answers" :key="num"
                @click="onAnswer(num)"
                >
                {{ num }}
            </button>
        </div>     
    </div>
</template>

<script>
    // component public object
    export default {
        mounted() {
            setInterval(() => {
                this.curTime--;
                if (this.curTime <= 3){
                    this.type = 'danger';
                }
                if (this.curTime <= 0){
                    this.$emit('error', 'Time for answer is expired!');
                }
            }, 1000);
        },
        props: ['settings'],
        data(){
            return{
                x: mtRand(this.settings.from, this.settings.to),
                y: mtRand(this.settings.from, this.settings.to),
                curTime: this.settings.time,
                type: 'success'
            }
        },
        //изменяется только когда изменяются свойства от которых они зависят
        computed: {
            good(){
                return this.x + this.y;
            },
            answers(){
                let res = [this.good];

                while(res.length < this.settings.variants){
                     //небольшой ращброс от правильного значения
                    let num = mtRand(this.good - this.settings.range, this.good + this.settings.range);
                    
                    if(res.indexOf(num) === -1)
                        res.push(num);
                }

                return res.sort(function(){ // случайная сортировка
                    return Math.random() > 0.5;// 0 <= Math.random() <= 1
                });
            }
        },
        methods:{
            onAnswer(num){
                if (num == this.good){
                    this.$emit('success');
                } else{
                    this.$emit('error', `${this.x} + ${this.y} = ${this.good}!`);
                }
            }
        }       
    }

    // component private functions and variables
    function mtRand(min, max){
        let diff = max - min;
        return Math.floor(Math.random() * (diff + 1)) + min;
    }
</script>

<style scoped>
    .alert{
        padding-top:20px;
        background-color: #eee;
    }
    .timer{     text-align: center;    font-size: 20px;    padding: 10px;}
    .buttons{
        display:flex;
        justify-content: space-around;
    }
    .btn{
        margin: 20px 0px;
    }
</style>