<template>
  <apexchart
    height="250"
    type="radialBar"
    :options="options"
    :series="series"
    :key="componentKey"
  ></apexchart>

  <q-inner-loading :showing="visible" label-style="font-size: 1.1em" />

</template>

<script setup>
import { defineComponent, ref, onMounted, toRefs } from "vue";
import { getCssVar } from "quasar";
import { useRouter, useRoute } from "vue-router";
import { useQuasar, date } from "quasar";
import { api } from "boot/axios";

let $q = useQuasar();
const route = useRoute();
const router = useRouter();

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};


let props = defineProps({
  progress: Object,
});

let { progress } = toRefs(props);

const progressQuant = ref(progress);



const visible = ref(false);
const ex = ref([]);
const ey = ref([]);

const options = ref({
  title: {
    text: "",
    align: "left",
  },
  chart: {
    id: "apex-radialBar",
  },
  colors: [
    getCssVar("primary"),
  ],
  markers: {
    size: 4,
    hover: {
      sizeOffset: 6,
    },
  },
  xaxis: {
    categories: []
  },
  labels: ['Progreso'],
});


const total = ref([0])
const serieTotal = ref([0]);

const loadData = () => {

  /* visible.value=true */
  console.log(progressQuant.value)
  for (let i = 0; i < progressQuant.value.length; i++){
    if(progressQuant.value[i] == undefined){
      progressQuant.value[i] = 0;
    }
    console.log("progressQuant.value[i]: " +progressQuant.value[i]);
    total.value[0] += progressQuant.value[i];
  }
  console.log("Total Value " + total.value[0]);

  if(total.value[0] == 1){
    serieTotal.value[0] = 50;
  }else if(total.value[0] == 2){
    serieTotal.value[0] = 100;
  }
  console.log(total.value[0])
};

const series = serieTotal.value;

onMounted(() => {
  loadData();
  forceRerender();
})
</script>





<!-- <template>
  <apexchart height="300" type="donut" :options="options" :series="series"></apexchart>
</template>

<script>
import { defineComponent } from 'vue'
import { getCssVar } from 'quasar'
export default defineComponent({
  name: 'ApexDonut',
  data () {
    return {
      options: {
        title: {
          text: 'ApexDonut',
          align: 'left'
        },
        chart: {
          id: 'apex-donut'
        },
        colors: [getCssVar('primary'), getCssVar('secondary'), getCssVar('negative'), getCssVar('accent')],
        markers: {
          size: 4,
          hover: {
            sizeOffset: 6
          }
        },
        xaxis: {
          categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998]
        }
      },
      series: [30, 40, 45, 50]
    }
  }
})
</script>
 -->
