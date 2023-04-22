<template>
  <q-table
    title="Actualización Listas"
    :rows="listado"
    :columns="columns"
    dense
    :filter="filter"
    row-key="intermediadornombre"
    class="my-sticky-header-tableLD"
    color="secondary"
    hide-pagination="true"
    v-model:selected="selected"
    :visible-columns="['intermediadornombre', 'max', 'diff_minutes']"
  >
    <!-- <template v-slot:top>
      <div class="q-table__title">{{ $t("Vehiculos") }}</div>
      <q-btn
        class="q-ml-sm q-py-none"
        color="primary"
        size="sm"
        v-show="listado.length != 0"
        :loading="loading"
        @click="Reenviar()"
        no-caps
      >
        <span class="text-subtitle2">Reenviar</span>
        <template v-slot:loading>
          <q-spinner-hourglass class="on-left" />
          Loading...
        </template>
      </q-btn>

      <q-space />

      <div>
        <q-input
          class="q-ml-md"
          margin-top="3px"
          borderless
          dense
          debounce="300"
          v-model="filter"
          :placeholder="$t('Search')"
        >
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
      </div>
    </template> -->

    <!-- <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-italic text-dark"
          style="font-size: 15px"
        >
          {{ $t(col.label) }}
        </q-th>
      </q-tr>
    </template> -->

    <template v-slot:body="props">
      <q-tr
        @dblclick="toListas(props.row)"
        :props="props"
        @click="props.selected = !props.selected"
        class="cursor-pointer"
      >
        <!-- <div v-for="iterator in listado" :key="iterator.intermediadornombre">
          <div v-if="iterator.intermediadornombre == 'Copiloto'">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name == 'diff_minutes' && col.value > 10">
                <q-badge color="red">
                  {{ Number(col.value.toFixed(2)) }} min
                </q-badge>
              </div>

              <div v-if="col.name != 'diff_minutes'">
                {{ col.value }}
              </div>
            </q-td>
          </div>

          <div v-if="iterator.intermediadornombre == 'Flypass'">
            <q-td v-for="col in props.cols" :key="col.name" :props="props">
              <div v-if="col.name == 'diff_minutes' && col.value > 10">
                <q-badge color="blue">
                  {{ Number(col.value.toFixed(2)) }} min
                </q-badge>
              </div>

              <div v-if="col.name != 'diff_minutes'">
                {{ col.value }}
              </div>
            </q-td>
          </div>
        </div> -->

        <q-td v-for="col in props.cols" :key="col.name" :props="props">
          <div v-if="col.name == 'diff_minutes' && col.value > 10">
            <q-badge color="red">
              {{ Number(col.value.toFixed(2)) }} min
            </q-badge>
          </div>

          <div v-if="col.name == 'diff_minutes' && col.value < 10">
            <q-badge color="green">
              {{ Number(col.value.toFixed(2)) }} min
            </q-badge>
          </div>

          <div v-if="col.name != 'diff_minutes'">
            {{ col.value }}
          </div>
        </q-td>
      </q-tr>
    </template>
  </q-table>
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

// export default defineComponent({
//   name: 'ApexColumn',
//   data () {
// return {

const ex = ref([]);
const ey = ref([]);
const columns = [
  {
    name: "intermediadornombre",
    label: "Intermediador",
    align: "left",
    field: "intermediadornombre",
    sortable: true,
  },
  {
    name: "max",
    label: "Fecha ultima actualización",
    align: "center",
    field: "max",
    sortable: true,
    format: (val) => `${date.formatDate(val, "DD/MM/YYYY HH:mm:ss")}`,
  },
  {
    name: "diferencia",
    label: "diferencia",
    align: "center",
    field: "diferencia",
    sortable: true,
  },
  {
    name: "diff_minutes",
    label: "Tiempo desde ultimo cambio",
    align: "left",
    field: "diff_minutes",
    sortable: true,
  },
];

// const options = ref({
//   title: {
//     text: "Vehiculos vs Intermediador",
//     align: "left",
//   },
//   chart: {
//     id: "apex-column",
//   },
//   colors: [getCssVar("primary"), getCssVar("secondary"), getCssVar("negative")],
//   xaxis: {
//     categories: ex,
//   },
//   plotOptions: {
//     bar: {
//       horizontal: false,
//       columnWidth: "55%",
//       endingShape: "rounded",
//     },
//   },
// });

// const series = ref([
//   {
//     name: "series-1",
//     data: ey,
//   },
// ]);

const intermediador = {
  Copiloto: null,
  Flypass: null,
  GOPASS: null,
  FacilPass: null,
  OP_VIPSA: null,
};

const intermediadorNombre = [];

const listado = ref([]);
const diferencia = ref(null);

const loadData = () => {
  api
    .get(`/Dashboard/FechaemisionXIntermediador`)
    .then((response) => {
      listado.value = response.data;

      // for (const iterator of response.data) {
      //   ex.value.push(iterator.intermediadornombre);
      //   ey.value.push(iterator.number);
      // }
      // if (listado.value[0].diff_minutes) {

      // }
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

const loadDataIntermediadores = () => {
  api
    .get(`/Adintermediadors`)
    .then((response) => {
      response.data.forEach((element) => {
        intermediadorNombre.push(element.intermediadornombre);

        if (element.intermediadornombre == "Copiloto") {
          intermediador.Copiloto = element.intermediadoridentificacion;
        } else if (element.intermediadornombre == "Flypass") {
          intermediador.Flypass = element.intermediadoridentificacion;
        } else if (element.intermediadornombre == "GOPASS") {
          intermediador.GOPASS = element.intermediadoridentificacion;
        } else if (element.intermediadornombre == "FacilPass") {
          intermediador.FacilPass = element.intermediadoridentificacion;
        } else if (element.intermediadornombre == "OP VIPSA") {
          intermediador.OP_VIPSA = element.intermediadoridentificacion;
        }
      });
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

      // $q.notify({
      //   type: "negative",
      //   message: error.message,
      // });
      // loadingListado.value = false;
    });
};

const clickRow = (row) => {
  sessionStorage.setItem("__ii", row.intermediadoridentificacion);
};

const toListas = (row) => {
  if (row.intermediadornombre == "Copiloto") {
    sessionStorage.setItem("__ii", intermediador.Copiloto);
  } else if (row.intermediadornombre == "Flypass") {
    sessionStorage.setItem("__ii", intermediador.Flypass);
  } else if (row.intermediadornombre == "GOPASS") {
    sessionStorage.setItem("__ii", intermediador.GOPASS);
  } else if (row.intermediadornombre == "FacilPass") {
    sessionStorage.setItem("__ii", intermediador.FacilPass);
  } else if (row.intermediadornombre == "OP VIPSA") {
    sessionStorage.setItem("__ii", intermediador.OP_VIPSA);
  }
  const toPath = "/listasintermediador";
  router.push(toPath);
};

setInterval(() => {
  ex.value = [];
  ey.value = [];
  loadData();
}, 120000);

onMounted(() => {
  $q = useQuasar();
  loadData();
  loadDataIntermediadores();
});

// }
//   }
</script>

<style>
tr:nth-child(even) {
  /* background-color: #e1e1e1; */
  background-color: #f7fbff;

  /* background-color: #f7fbff; */
}
</style>

<style lang="sass">
.my-sticky-header-tableLD
  /* max height is important */
  .q-table__middle
    height: 240px

  .q-table__top,
  .q-table__bottom,
  thead tr:first-child th /* bg color is important for th; just specify one */
  // background-color: #fff

    z-index: 1000 // this will help to fix the problem

  thead tr:first-child th
    position: sticky
    top: 0
</style>
