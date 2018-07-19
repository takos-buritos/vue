<template>
    <div class="cake">
        <!-- contextmenu - клик правой кнопкой мыши, .prevent аналог e.preventDefault() чтобы не всплывало стандартное меню при клике правой кнопкой -->
        <draggable v-model="mutablelayers" :options="{draggable:'.layer'}" @change="changePosition">
        <div class="layer" 
                v-for="(layer, i) in mutablelayers" :key="i" 
                :class="'layer-' + layer.type"
                :style="{'height': layer.height * 10 + 'px'}"
                @click="changeHeight(i, 1)"
                @contextmenu.prevent="changeHeight(i, -1)"
        ></div>
        </draggable>
    </div>      
</template>
<script>
export default {
    props: ['layers'],
    data: function () {
        return {
            mutablelayers: this.layers
        }
    },
    methods: {
        changeHeight(i, dh) {
            this.mutablelayers[i].height = this.mutablelayers[i].height + dh;
        },
        changePosition(){
            this.$emit('changeOrder', this.mutablelayers);
        }
    }
}
</script>
<style scoped>
    .layer-biscuit{ background-color:bisque; }
    .layer-beze{ background-color:aqua; }
    .layer-curd{ background-color:darkslateblue; }

    .layer{ cursor: move; }
</style>
