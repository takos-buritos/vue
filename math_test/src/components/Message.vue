<template>
    <div class="alert" :class="'alert-' + type">
        <h2>{{ text }}</h2>
        <hr>
        <button class="btn btn-primary" @click="$emit('onNext')">
            Continue
        </button>
    </div>
</template>

<script>
export default {
    //входные параметры, задаются в виде атрибутов у компонента
    props: ['type', 'text']
}
</script>

<style scoped>
    .alert{
        text-align: center;
    }
    h2, .btn{
        margin: 20px 0px;
    }
</style>

