<template>
  <div class="row">
    <div class="col">
      <apexchart ref="chart" height="300" type="area" :options="options" :series="series" :data="loadGraph()" >
      </apexchart>
    </div>
  </div>

  <q-inner-loading
    :showing="visible"
    label="Please wait..."
    label-class="text-teal"
    label-style="font-size: 1.1em"
  />
</template>

<script setup>
import { ref, onMounted, toRefs, onUpdated, defineComponent } from "vue";
import { getCssVar } from "quasar";
/* import { useMainStore } from "stores/main"; */
import { useRouter, useRoute } from "vue-router";
import { useQuasar, date, LocalStorage } from "quasar";
/* import { mostrarMensajes } from "src/utils/global"; */
import { api } from "boot/axios";

let props = defineProps({
  listadoVehbyHour: Object,
});

let { listadoVehbyHour } = toRefs(props);

let listadoCantidadVeh = ref(listadoVehbyHour);

/* const store = useMainStore(); */
let $q = useQuasar();
const route = useRoute();
const router = useRouter();

const options = ref({
  title: {
    text: "Vehículos Por Hora",
    align: "left",
  },
  chart: {
    height: 300,
    type: "area",
  },
  colors: [
    getCssVar("positive"),
    getCssVar("info"),
    getCssVar("warning"),
    getCssVar("negative"),
  ],
  markers: {
    size: 4,
    hover: {
      sizeOffset: 6,
    },
  },
  dataLabels: {
    enabled: false,
  },

  stroke: {
    curve: "smooth",
  },

  xaxis: {
    type: "string",
    categories: [],
  },
});

const visible = ref(false);
const series = ref([
  {
    name: "Vehículos",
    data: [],
  },

]);

let x = 0;
var count = 0;
const loadGraph = () => {
  console.log(listadoCantidadVeh.value);
   visible.value = true;

   options.value.xaxis.categories = [/* "0:00","1:00","2:00","3:00","4:00","5:00","6:00","7:00","8:00","9:00","10:00","11:00","12:00","13:00","14:00","15:00","16:00","17:00","18:00","19:00","20:00","21:00","22:00","23:00" */];
   series.value[0].data = [];

  for (const iterator of listadoCantidadVeh.value) {

     if (iterator.hour.length > 0) {
      series.value[0].data.push(iterator.number);
    } else {
      series.value[0].data.push(0);
    }
    options.value.xaxis.categories.push(iterator.hour);
  }

  console.log(series.value[0].data);
  console.log(options.value.xaxis.categories);

  visible.value = false;
};

onMounted(() => {
  $q = useQuasar();
});
</script>
