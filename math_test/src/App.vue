<template>
  <div class="training">
    <h1>Math training. Level {{ level + 1 }}</h1>
    <hr>

    <div class="progress">
      <div class="progress-bar" :style="progressStyles"></div>
    </div>

    <div class="box">
      <!-- mode - завершится анимация одного, нечнется анимация другого
           name - название анимации, исп-ся для классов в style-->
      <transition name="flip" mode="out-in">

        <app-start-screen 
          v-if="state == 'start'"
          @onStart="onStart"
        ></app-start-screen>

        <app-question v-else-if="state == 'question'"
          @success="onQuestSuccess"
          @error="onQuestError"
          :settings="levels[level]"
        ></app-question>

        <!-- : - это сокращение от директивы v-bind, 
            которая подставляет значенияиз компонента-->
        <app-message  v-else-if="state == 'message'"
                      :type="message.type"
                      :text="message.text"
                      @onNext="onNext"
        ></app-message>

        <app-result-screen v-else-if="state == 'results'"
                           :stats="stats"
                           @repeat="onStart"
                           @nextLevel="onNextLevel"
        ></app-result-screen>

        <app-full-stat v-else-if="state == 'fullstat'"
                           :fullStats="fullStats"
                           @fullRepeat="onFullRepeat"
        ></app-full-stat>
        <div v-else>Unknown state</div>

      </transition>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      state: 'start',
      stats:{
        success: 0,
        error: 0
      },
      fullStats:{
        success: 0,
        error: 0
      },
      message:{
        type: '',
        text: ''
      },
      questMax: 3,
      level:0,
      levels:[
        {
          from: 10,
          to:40,
          range:5,
          variants:2
        },
        {
          from: 100,
          to:200,
          range:20,
          variants:4
        }
        ,
        {
          from: 500,
          to:900,
          range:40,
          variants:6
        }
      ]
    }
  },
  methods:{
    onStart(repeatQuestion = false){
      if(repeatQuestion){
        this.fullStats.success = this.fullStats.success - this.stats.success;
        this.fullStats.error = this.fullStats.error - this.stats.error;
      }
      this.state = 'question';
      this.stats.success = 0;
      this.stats.error = 0;
    },
    onQuestSuccess(){
      this.state = 'message';
      this.message.text = "Good job!";
      this.message.type = "success";
      this.stats.success++;
      this.fullStats.success++;
    },
    onQuestError(msg){
      this.state = 'message';
      this.message.text = msg;
      this.message.type = "warning";
      this.stats.error++;
      this.fullStats.error++;
    },
    onNext(){
      if (this.questDone < this.questMax){
        this.state = 'question';
      } else if (this.level == this.levels.length - 1){
        this.state = 'fullstat';
      } else {
        this.state = 'results';
      }    
    },
    onNextLevel(){
      this.level++;
      this.onStart();
    },
    onFullRepeat(){
      this.state = 'question';
      this.stats.success = 0;
      this.stats.error = 0;
      this.fullStats.success = 0;
      this.fullStats.error = 0;
      this.level = 0;
    }
  },
  computed:{
    questDone(){
      return this.stats.success + this.stats.error;
    },
    progressStyles(){
      return{
        width: (this.questDone / this.questMax) * 100 + "%"
      }
    }
  }
}
</script>

<style scoped>
  .training{
    max-width:700px;
    margin:20px auto;
  }
  .box{
    margin:10px 0px;
  }
  .progress-bar{
    transition: width 0.5s;
  }

  /*flip - название анимации transition*/
  /*добавляется сразу когда элемент начинает появляться*/
  .flip-enter{

  }
  /*класс в момент анимирования появления элемента*/
  .flip-enter-active{
    animation: flipInX 0.3s linear;
  }
  /*добавляется сразу когда элемент начинает иичезать*/
  .flip-leave{

  }
  /*класс в момент анимирования исчезания элемента*/
  .flip-leave-active{
    animation: flipOutX 0.3s linear;
  }

  @keyframes flipInX{
    from{transform: rotateX(90deg);}
    to{transform: rotateX(0deg);}
  }
  @keyframes flipOutX{
    from{transform: rotateX(0deg);}
    to{transform: rotateX(90deg);}
  }
</style>
