<template>  
  <div class="container">
    <h2>Cake builder</h2>
    <hr>
    <button type="button" class="btn btn-primary" @click="addLayer">Add layer</button>
    <hr>

    <div class="row" v-show="showData">
      <div class="col col-sm-6">
        <app-cake :layers="layers" @changeOrder="onChangeOrder">
        </app-cake>  
      </div>
      <div class="col col-sm-6">
        <table class="table table-bordered">
          <thead>
            <th>Type</th>
            <th>Height</th>
            <th>Actions</th>
          </thead>
          <tbody>
            <tr v-for="(layer, i) in layers" :key="i">
              <td>
                <!-- v-model в данном случае связывает селект с цветом куска кейка -->
                <select class="form-control" v-model="layer.type">
                  <option :value="key" v-for="(lt, key) in layersTypes" :key="key">
                      {{ lt.label }}
                  </option>
                </select>
              </td>
              <td>
                <input type="text" class="form-control" v-model.number="layer.height">
              </td>
              <td>
                <button class="btn btn-danger" @click="removeLayer(i)">-</button>
              </td>
            </tr>
          </tbody>
        </table> 
      </div>
    </div>

    <hr v-show="showData">
    <div class="alert alert-info" v-show="showData">
      <span class="price">
        <strong>{{ price }}</strong> руб   
      </span>      
      <button class="btn btn-warning" style="margin-left:20px;" @click="confirmOrder = !confirmOrder">
        Order now!        
      </button>  
      <bModal v-model="confirmOrder">
        Are u sure?
      </bModal>    
    </div>
       
  </div>
</template>

<script>
export default {
  data () {
    return {
      confirmOrder: false,
      layers: [],
      layersTypes:{
        biscuit:{
          price1sm: 40,
          label: "бисквит"
        },
        beze:{
          price1sm: 100,
          label: "безе"
        },
        curd:{
          price1sm: 60,
          label: "творог"
        }
      },
      defaultLayerType: "biscuit",
      defaultHeight:4      
    }
  },
  methods:{
    addLayer(){
      this.layers.push({
        type: this.defaultLayerType,
        height: this.defaultHeight
      })
    },
    removeLayer(i){
      this.layers.splice(i, 1);
    },
    onChangeOrder(newLayers){
      this.layers = newLayers;
    }    
  },
  computed:{
    price(){
      let sum = 0;

      this.layers.forEach((layer) => {
        sum += this.layersTypes[layer.type].price1sm * layer.height;
      });

      return sum;
    },
    showData(){
      return this.layers.length > 0;
    }
  }
}
</script>

<style scoped>
  .layer-biscuit{ background-color:bisque;}
  .layer-beze{ background-color:aqua;}
  .layer-curd{background-color:darkslateblue}

  .layer{ cursor: move; }

  .price{font-size:20px;}
</style>
