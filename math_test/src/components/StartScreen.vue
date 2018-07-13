<template>
    <div class="alert alert-secondary">
        <h3>Are you ready?</h3>
        <button class="btn btn-success" @click="$emit('onStart')">
            Start
        </button>
    </div>
</template>
<!-- $emit генерирует события родителю (в данном случае App.vue)
    в скобках указано название события, можно также через запятую
    передавать параметры этому событию-->
<script>
    export default {
   
    }
</script>

<style scoped>
    .alert{
        text-align:center; background-color: #e6e6e6;
    }
    h3,.btn{
        margin:30px 0px;
    }
</style>