<template>
  <q-page>
    <div class="container">
      <div class="inputscontainer">
        <div
          style="
            display: flex;
            align-items: center;
            justify-content: start;
            margin: 2rem 0 0 0;
            font-size: 38px;
            font-weight: bolder;
          "
        >
          Simula tu Crédito
        </div>
        <span style="font-size: 14px"
          >Solicita hasta $XX.XXX.XXX y disfruta del abono inmediato en tu
          cuenta.</span
        >
        <div
          style="
            align-items: center;
            display: flex;
            align-items: center;
            justify-content: start;
            margin: 1rem 0 0 0;
          "
        >
          <q-input
            v-model="moneyRequired"
            :ref="moneyRequired"
            @update:modelValue="updateMoneda"
            label="ㅤ¿Cuánto dinero necesitas?"
            prefix="ㅤ$"
            type="text"
            onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
            class="inputmoney"
          />
        </div>
        <div style="margin: 3rem 0 3rem 0.3rem; width: 510px">
          <q-slider
            class="q-mt-xl"
            v-model="priceModel"
            color="teal-10"
            label-always
            markers
            :marker-labels="arrayMarkerLabel"
            :label-value="priceLabel"
            :min="0"
            :max="4"
            :inner-min="0"
            :inner-max="4"
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
      <div class="infocontainer" >
        <div v-if="!showprogress">
          <span
            style="margin: 20px 0 0 20px; font-size: 32px; font-weight: bold"
            >$
            <!-- {{ cuotamensual }} -->
            394.248 <span style="font-size: 20px; font-weight: 300">/mes</span>
          </span>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 90%;
              margin: 15px 0 0 20px;
            "
          >
            <span style="font-size: 16px">Monto Solicitado: </span>
            <span style="font-size: 16px; font-weight: bold">$10.000.000</span>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 90%;
              margin: 8px 0 0 20px;
            "
          >
            <span style="font-size: 16px">Tasa Efectiva Anual: </span>
            <span style="font-size: 16px; font-weight: bold">15.70%</span>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 90%;
              margin: 8px 0 0 20px;
            "
          >
            <span style="font-size: 16px">Tarifa Administrativa: </span>
            <span style="font-size: 16px; font-weight: bold">$25.000</span>
          </div>
          <div
            style="
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 90%;
              margin: 8px 0 0 20px;
            "
          >
            <span style="font-size: 16px">Total Pagar: </span>
            <span style="font-size: 16px; font-weight: bold">$11.800.000</span>
          </div>
        </div>

        <div v-if="showprogress" style="padding: 0; margin: -2rem 0 -1.15rem 0">
          <apex-donut :progress="progress" :key="componentKey" />
        </div>
        <div
          v-if="showTwoButtons"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 40px 0 0 0px;
            position: static;
            justify-content: space-around;
          "
        >
          <q-btn
            push
            label="Recalcular"
            color="primary"
            :disable="disableButtonRecalcular"
            @click="funcionParaRecalcular()"
          ></q-btn>
          <q-btn
            push
            label="Solicitar Crédito"
            color="green"
            @click="null"
          ></q-btn>
        </div>

        <div
          v-if="!showTwoButtons"
          style="
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            margin: 40px 0 0 0px;
            position: static;
            justify-content: space-around;
          "
        >
          <q-btn
            push
            label="Calcular"
            color="primary"
            size="15px"
            :disable="disableButtonCalcular"
            @click="funcionParaMetodoQueCalculaElCredito()"
          ></q-btn>
        </div>
      </div>
    </div>

    <div
      style="
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 4% 0 0 0;
        font-size: 25px;
        color: blue;
      "
    >
      ¡Utiliza tu crédito para lo que quieras!
      <span style="font-size: 16px; margin-top: 10px; color: black"
        >Dentro del proceso puedes elegir qué destino quieres para tu
        dinero</span
      >
    </div>
    <div
      style="
        display: flex;
        justify-content: space-around;
        margin: 4% auto 0 auto;
        width: 75%;
      "
    >
      <q-card :flat="true">
        <q-card-section
          style="display: flex; flex-direction: column; align-items: center"
        >
          <q-icon name="payments" size="2.5em" style="opacity: 80%" />
          <div
            style="
              display: flex;
              margin-top: 10px;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
            "
          >
            Libranza
          </div>
        </q-card-section>
      </q-card>
      <q-card :flat="true">
        <q-card-section
          style="display: flex; flex-direction: column; align-items: center"
        >
          <q-icon name="menu_book" size="2.5em" style="opacity: 80%" />
          <div
            style="
              display: flex;
              margin-top: 10px;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
            "
          >
            Estudio
          </div>
        </q-card-section>
      </q-card>
      <!-- &nbsp; Compra <br> de Cartera -->
      <q-card :flat="true">
        <q-card-section
          style="display: flex; flex-direction: column; align-items: center"
        >
          <q-icon name="flight" size="2.5em" style="opacity: 80%" />
          <div
            style="
              display: flex;
              margin-top: 10px;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
            "
          >
            Viajes
          </div>
        </q-card-section>
      </q-card>
      <q-card :flat="true">
        <q-card-section
          style="display: flex; flex-direction: column; align-items: center"
        >
          <q-icon name="trending_up" size="2.5em" style="opacity: 80%" />
          <div
            style="
              display: flex;
              margin-top: 10px;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
            "
          >
            Invertir
          </div>
        </q-card-section>
      </q-card>
      <q-card :flat="true">
        <q-card-section
          style="display: flex; flex-direction: column; align-items: center"
        >
          <q-icon name="directions_car" size="2.5em" style="opacity: 80%" />
          <div
            style="
              display: flex;
              margin-top: 10px;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
            "
          >
            Comprar<br />Vehículo
          </div>
        </q-card-section>
      </q-card>
      <q-card :flat="true">
        <q-card-section
          style="display: flex; flex-direction: column; align-items: center"
        >
          <q-icon name="medication" size="2.5em" style="opacity: 80%" />
          <div
            style="
              display: flex;
              margin-top: 5px;
              align-items: center;
              justify-content: center;
              font-size: 14px;
              font-weight: bold;
            "
          >
            &nbsp;Salud y<br />Bienestar
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref, onMounted, computed, defineAsyncComponent, watch } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();

const moneyRequired = ref("");

const priceModel = ref(0);
const months = ref("");

const showprogress = ref(true);
const showTwoButtons = ref(false);

const priceLabel = ref("");

const componentKey = ref(0);

const forceRerender = () => {
  componentKey.value += 1;
  console.log("componentKey: " + componentKey.value);
};

function getlabel() {
  for (var i = 0; i < arrayMarkerLabel.value.length; i++) {
    if (arrayMarkerLabel.value[i].value == priceModel.value) {
      months.value = arrayMarkerLabel.value[i].label;
      return months.value;
    }
  }
}

const funcionParaMetodoQueCalculaElCredito = () => {
  //Para deshabilitar el botón de Recalcular
  disableButtonRecalcular.value = true;
  //En code 200
  showTwoButtons.value = true;
  ////////////////////////////
  //Para ocultar donut de progreso y mostrar la info del crédito
  showprogress.value = false;
  ////////////////////////////
  //disableButtonCalcular.value = true;
};

const funcionParaRecalcular = () => {
  disableButtonRecalcular.value = true;
};

const ApexArea = defineAsyncComponent(() =>
  import("components/charts/ApexArea.vue")
);

const ApexDonut = defineAsyncComponent(() =>
  import("components/charts/ApexDonut.vue")
);

const dineroFormateado = ref(null);

const progress = ref([]);
var bool = false;

const disableButtonCalcular = ref(true);
const disableButtonRecalcular = ref(true);

const updateMoneda = (valor) => {
  disableButtonRecalcular.value = false;
  // Eliminar los puntos y comas del valor recibido
  const valorLimpio = valor.replace(/[^\d]/g, "");
  // Formatear el valor sin afectar el v-model
  const valorFormateado = new Intl.NumberFormat("es-CO").format(valorLimpio);
  dineroFormateado.value = valorFormateado;

  // Actualizar el valor del input
  moneyRequired.value = valorFormateado; //.replace(/[,.]/g, '');

  if (valor.length > 0 && valor != 0 && !bool) {
    forceRerender();
    progress.value[0] = 1;
    bool = true;
    verifyButtonState();
  } else if (moneyRequired.value == 0) {
    forceRerender();
    progress.value[0] = 0;
    bool = false;
    verifyButtonState();
  }
};

const verifyButtonState = () => {
  if (progress.value[0] == 1 && progress.value[1] == 1) {
    disableButtonCalcular.value = false;
  } else {
    console.log(progress.value);
    disableButtonCalcular.value = true;
  }
};

const loadData = () => {
  visible.value = true;
  api
    .get(`/api/UpUser`)
    .then((response) => {
      visible.value = false;
    })
    .catch((error) => {});
};

let listadoVehbyHour = ref([
  { hour: "0:00", number: 765 },
  { hour: "0:00", number: 765 },
  { hour: "1:00", number: 765 },
  { hour: "2:00", number: 765 },
  { hour: "3:00", number: 765 },
  { hour: "4:00", number: 765 },
  { hour: "5:00", number: 765 },
  { hour: "6:00", number: 765 },
  { hour: "7:00", number: 765 },
  { hour: "8:00", number: 765 },
  { hour: "9:00", number: 765 },
]);

const arrayMarkerLabel = ref([
  { value: 0, label: "0" },
  { value: 1, label: "6" },
  { value: 2, label: "23" },
  { value: 3, label: "42" },
  { value: 4, label: "60" },
]);

let x = ref("");

var boolSlider = false;

watch(priceModel, (newValue, oldValue) => {
  disableButtonRecalcular.value = false;
  if (getlabel() != 0 && !boolSlider) {
    progress.value[1] = 1;
    forceRerender();
    verifyButtonState();
    boolSlider = true;
  } else if (getlabel() == 0) {
    progress.value[1] = 0;
    forceRerender();
    verifyButtonState();
    boolSlider = false;
  }
  priceLabel.value = "A Pagar en " + getlabel() + " meses.";
});

onMounted(() => {
  priceLabel.value =
    `A Pagar en ${arrayMarkerLabel.value[0].label}` + ` meses.`;
  forceRerender();
});
</script>

<style scoped>
.container {
  display: flex;

  position: relative;
  margin: auto;
}
.inputscontainer{
  display: block;
  margin: 0 0 0 2rem;
}
.infocontainer{
  display: flexbox;
  margin: auto;
  width: 30rem;
  height: 20rem;
  background-color: #f4f4f4;
  padding: 2rem 1rem 0 1rem;
  border-radius: 5px;
  margin-top: 50px;
}

.inputmoney{
  width: 520px;
  background-color: #f5f6f7;
}

@media (max-width: 768px) {
  .inputscontainer {
    width: calc(100% - 2rem);
    margin: 0 0 0 0;
    padding: 0 2% 0 2%;
    align-items: center;
    width: 100%;
    border: 2px solid blue;
  }
}

@media (max-width: 1050px) {
  .container {
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .inputscontainer {

    /* margin: 0 0 0 0;
    padding: 0 auto 0 auto 0; */
    align-items: center;
    justify-content: center;
    order: 1;
  }
  .infocontainer {
    order: 2;
    width: 60%;
    margin-top: -20px;
  }
  .inputmoney{
    width: 100%;
    background-color: #f5f6f7;
  }

}
</style>
