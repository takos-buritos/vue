<template>
    <div class="alert alert-secondary">
        <h3>Overall results</h3>
        <h2>Success: {{ fullStats.success }}</h2>
        <h2>Error: {{ fullStats.error }}</h2>
        <hr>
        <button class="btn btn-primary" @click="$emit('fullRepeat')">
            Repeat test
        </button>
    </div>
</template>

<script>
    export default {
        props:['fullStats']
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