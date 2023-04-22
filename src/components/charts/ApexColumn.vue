<template>
  <apexchart
    height="300"
    type="bar"
    :options="options"
    :series="series"
    :data="loadGraph()"
  ></apexchart>
</template>

<script setup>
import { defineProps, ref, onMounted, toRefs, onBeforeMount } from "vue";
import { getCssVar } from "quasar";
import { useMainStore } from "stores/main";
import { useRouter, useRoute } from "vue-router";
import { useQuasar, date } from "quasar";
import { mostrarMensajes } from "src/utils/global";
import { api } from "boot/axios";

const store = useMainStore();
let $q = useQuasar();
const route = useRoute();
const router = useRouter();

let x = false;

let props = defineProps({
  listadoFecha: Object,
});

let { listadoFecha } = toRefs(props);

let listado1 = ref(listadoFecha);

const options = ref({
  title: {
    text: "Vehículos Por Categoría",
    align: "left",
  },
  chart: {
    id: "apex-column",
    toolbar: {
      show: false,
    },
  },
  legend: {
    show: true,
  },

  plotOptions: {
    bar: {
      distributed: true,
      horizontal: false,
      columnWidth: "55%",
      endingShape: "rounded",
      dataLabels: {
        position: "top",
      },
    },
  },

  dataLabels: {
    offsetY: -20,
    style: {
      fontSize: "12px",
      colors: ["#304758"],
    },
  },
  colors: [
    getCssVar("primary"),
    getCssVar("secondary"),
    getCssVar("warning"),
    getCssVar("accent"),
    getCssVar("info"),
    getCssVar("positive"),
    getCssVar("negative"),
  ],
  xaxis: {
    categories: [1,2,3,4,5,6,7,8],
  },
});

const series = ref([
  {
    name: "Cantidad",
    data: [],
  },
]);

const listado = ref([]);

function loadGraph() {
  series.value[0].data = [];

  for (const iterator of listado1.value) {
    series.value[0].data.push(iterator.number);
  }
}

const loadData = () => {
  api
    .get(`/Clvdata/vehiculosporcategoria`)
    .then((response) => {
      listado.value = response.data;
      for (const iterator of response.data) {
        ex.value.push(iterator.categoria);
        ey.value.push(iterator.number);
      }
    })
    .catch((error) => {
      if (error.response == undefined) {
      } else if (error.response.status == 401) {
        store.borrar();
        const toPath = "/Login";
        router.push(toPath);
        $q.notify({
          type: "negative",
          message: "Tiempo expirado, inicie sesión nuevamente",
        });
      } else {
        mostrarMensajes(error.response.data);
      }
    });
};


onMounted(() => {
  $q = useQuasar();
  //  loadGraph();
  //  loadData();
});
</script>
