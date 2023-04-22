<template>
  <h4 style="padding: 0 0 0 15px">Créditos</h4>
  <div class="col-md-6 col-xs-12 q-pa-md" style="border: 1px solid red;">
          <q-card>
            <apex-area
              :listadoVehbyHour="listadoVehbyHour"
              :key="componentKey"
            />
          </q-card>
        </div>
</template>

<script setup>
import { ref, onMounted, defineAsyncComponent } from 'vue';
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
};

const ApexArea = defineAsyncComponent(() =>
  import("components/charts/ApexArea.vue")
);

let listadoVehbyHour = ref( [{hour: '0:00', number: 765},
{hour: '0:00', number: 765},
{hour: '1:00', number: 765},
{hour: '2:00', number: 765},
{hour: '3:00', number: 765},
{hour: '4:00', number: 765},
{hour: '5:00', number: 765},
{hour: '6:00', number: 765},
{hour: '7:00', number: 765},
{hour: '8:00', number: 765},
{hour: '9:00', number: 765}]);

onMounted(() => {
  forceRerender();
})

</script>
