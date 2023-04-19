<template>
  <q-page style="width: 100%; display: inline-flexbox;">
    <div style="display: flex; border: 1px solid black;">
      <div style="display: block; ">
    <div style="display: flex; align-items: center; justify-content: start; margin: 2rem 0 0 2rem; font-size: 32px; font-weight: bolder;">Simula tu Crédito</div>
    <span style="margin: 0 0 0 2rem; font-size: 14px;">Solicita hasta $XX.XXX.XXX y disfruta del abono inmediato en tu cuenta.</span>
    <div style="align-items: center; display: flex; align-items: center; justify-content: start; margin: 1rem 0 0 2rem;">
      <q-input v-model="moneyRequired"  label="ㅤ¿Cuánto dinero necesitas?" prefix="ㅤ$" type="text" onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'" style="width: 520px;; background-color: #f5f6f7" />
  </div>
  <div style="margin: 2rem 0 3rem 2rem; width: 520px;">
    <q-slider
      class="q-mt-xl"
      v-model="priceModel"
      color="teal-10"
      label-always
      markers
      :marker-labels="arrayMarkerLabel"
      :label-value="priceLabel"
      :min="0"
      :max="3"
      :inner-min="0"
      :inner-max="3"

      track-size="6px"
      thumb-size=" 30px"
      thumb-path="M 4, 10 a 6,6 0 1,0 12,0 a 6,6 0 1,0 -12,0"
      label-text-color="black"
      selection-color="#1877f2"
      label-color="transparent"
      step="1"
    />
  </div>
</div>
<div style="display: flexbox; margin: auto; border: 1px solid black; width: 30rem; height: 15rem; background-color: #f4f4f4;">
  <span style="margin: 20px 0 0 20px; font-size: 28px; font-weight: bold;">$ <!-- {{ cuotamensual }} --> 394.248 <span style="font-size: 18px; font-weight: 300;">/mes</span> </span>
  <div style="display: flex; align-items: center; justify-content: space-between; width: 90%; margin: 15px 0 0 20px;">
    <span>Tasa Efectiva Anual: </span>
    <span>15.70%</span>
  </div>

</div>

</div>
  </q-page>

</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue';
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const moneyRequired = ref("");

const priceModel = ref(0);
const months = ref("");


const priceLabel = ref("");

function getlabel(){
  console.log(arrayMarkerLabel.value.length)

  for (var i = 0; i < arrayMarkerLabel.value.length; i++){
    console.log(arrayMarkerLabel.value[i])
    console.log("PriceModel "+ priceModel.value);
    if(arrayMarkerLabel.value[i].value == priceModel.value){
      months.value = arrayMarkerLabel.value[i].label;
      return months.value;
    }
  }

}

const arrayMarkerLabel = ref ([
        { value: 0, label: '6' },
        { value: 1, label: '23' },
        { value: 2, label: '42' },
        { value: 3, label: '60' }
      ]);

let x = ref("");

watch(priceModel, (newValue, oldValue) => {
  priceLabel.value = "A Pagar en " + getlabel() + " meses.";
});

watch(moneyRequired, (newValue, oldValue) => {
  console.log("Watcher actived "+ moneyRequired.value);
  x.value = moneyRequired.value;

  if(moneyRequired.value.includes(".") && moneyRequired.value.includes(",")){
    x.value = moneyRequired.value.replace(".", "").replace(",", "");
    moneyRequired.value = new Intl.NumberFormat("es-CO").format(x.value);
  }else if(moneyRequired.value.includes(".") && !moneyRequired.value.includes(",")){
    x.value = moneyRequired.value.replace(".", "");
    moneyRequired.value = new Intl.NumberFormat("es-CO").format(x.value);
  }else if(!moneyRequired.value.includes(".") && moneyRequired.value.includes(",")) {
    x.value = moneyRequired.value.replace(",", "");
    moneyRequired.value = new Intl.NumberFormat("es-CO").format(x.value);
  }else{
    moneyRequired.value = new Intl.NumberFormat("es-CO").format(x.value);
  }
});
onMounted(() =>{
  priceLabel.value = `A Pagar en ${arrayMarkerLabel.value[0].label}` + ` meses.`;
})

</script>

<style scoped>


</style>
