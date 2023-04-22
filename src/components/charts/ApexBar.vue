<template>
  <apexchart
    height="300"
    type="bar"
    :options="options"
    :series="series"
  ></apexchart>

  <q-inner-loading :showing="visible" label-style="font-size: 1.1em" />
</template>

<script setup>
import { defineComponent, ref, onMounted } from "vue";
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

const visible = ref(false);

// const ey = ref([0, 0, 0, 0, 0]);
// const ex = ref(["Facilpass", "Copiloto", "Flypass", "Gopass", "OP VIPSA"]);

const ex = ref([]);
const ey = ref([]);

const options = {
  title: {
    text: "Listas x Intermediador ultimas 24H",
    align: "left",
  },
  chart: {
    id: "apex-bar",
    toolbar: {
      show: false,
    },
  },
  // colors: [          // getCssVar("primary"),
  //         getCssVar("secondary"),
  //         getCssVar("negative"),],
  xaxis: {
    categories: ex.value,
  },
  plotOptions: {
    bar: {
      horizontal: true,
      distributed: true,
      columnWidth: "55%",
      endingShape: "rounded",
    },
  },
  colors: [
    getCssVar("primary"),
    getCssVar("secondary"),
    getCssVar("warning"),
    getCssVar("accent"),
    getCssVar("info"),
    getCssVar("positive"),
  ],
  yaxis: {
    labels: {
      show: false,
    },
  },
};
const series = [
  {
    name: "No. listas",
    data: ey.value,
  },
];

const listado = ref([]);

const loadData = () => {
  visible.value = true;
  api
    .get(`/Dashboard/ListasPorIntermediador`)
    .then((response) => {
      listado.value = response.data;
      for (const iterator of response.data) {
        ex.value.push(iterator.intermediadornombre);
        ey.value.push(iterator.number);
      }

      visible.value = false;
    })
    .catch((error) => {
      if (error.response.status == 401) {
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

// setInterval(() => {
//   ex.value=[]
//   ey.value=[]
//   loadData()
// }, 300000);

onMounted(() => {
  $q = useQuasar();
  loadData();
});
</script>
