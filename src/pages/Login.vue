<template>
  <div
    style="
      padding-top: 0%;
      background: #f0f2f5;
      position: fixed;
      height: 100%;
      width: 100%;
      left: 0;
      bottom: 0;
      z-index: -1;
    "
  >
    <div style="position: absolute; width: 400px;  margin: 0; right: 0; top: 50%; transform: translateY(-50%) translateX(-35%);">
      <div  >
      <q-card style="background: white; box-shadow: 0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1); padding: 10px 0 10px 0; border-radius: 10px;">
        <q-card-section>
          <q-form ref="myForm" class="q-gutter-md" @submit.prevent="Login()">
            <div>
              <div style="text-align: center; font-size: 21px;">Inicio de Sesión</div>
            </div>

              <div>
                <q-input
                  outlined
                  v-model="login.identifier"
                  type="text"
                  label="Correo Electrónico"
                  dense
                  style="width: 100%"
                  :rules="[(val) => !!val || '* Campo Requerido']"
                  lazy-rules
                >
                  <template #prepend>
                    <q-icon name="email"></q-icon>
                  </template>
                </q-input>
              </div>

              <div style="margin-top: 5px;">
                <q-input
                  :type="isPwd ? 'password' : 'text'"
                  outlined
                  label="Contraseña"
                  v-model="login.password"
                  dense

                >
                  <template v-slot:append>
                    <q-icon
                      :name="isPwd ? 'visibility_off' : 'visibility'"
                      class="cursor-pointer"
                      @click="isPwd = !isPwd"
                    />
                  </template>
                  <template v-slot:prepend>
                    <q-icon name="lock" />
                  </template>
                </q-input>
              </div>

              <div  >
                <q-btn
                  style="width: 100%; background-color: #1877f2; color: white; height: 40px; border-radius: 10px;"
                  label="Iniciar Sesión"
                  type="submit"
                ></q-btn>
              </div>
              <div style="display: flex; justify-content: center; margin: 10px 0 0 0; padding: 0; font-size: 14px;" ><a style="color: #18a4f7; text-decoration: none;" href="/#/passwordrecovery">¿Olvidaste la contraseña?</a></div>

              <q-separator></q-separator>
              <div style="display: flex; justify-content: center;">
                <q-btn
                  style=" width: 80%; background-color: #42b72a; color: white; height: 40px; border-radius: 10px;"
                  label="Crear Cuenta Nueva"
                  @click="modalnewaccount = true"
                ></q-btn>
              </div>
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </div>
  </div>

  <q-dialog
    v-model="modalnewaccount"
    transition-show="scale"
    transition-hide="scale"
    persistent
  >
    <q-card style="max-width: 600px; width: 432px">
      <q-form autofocus @submit.prevent="createNewCustomer()">
        <q-card-section>
          <div style="display: flex; justify-content: space-between; font-size: 22px; font-weight: bold; align-items: center; margin-bottom: 10px;">
            <span>Registrarte</span> <q-icon name="close" class="cursor-pointer" style="font-weight: bold;" @click="cerrarmodalnewaccount()"></q-icon>
          </div>
          <q-separator></q-separator>
        </q-card-section>
        <q-card-section>
          <div style="display: flex; align-items: center; justify-content: space-between; ">
            <div style="width: 49%">
              <q-input
                outlined
                dense
                v-model="customer.data.first_name"
                :label="'Nombre'"
                type="text"
                color="#f5f6f7"
                lazy-rules
                style="background-color: #f5f6f7"
              />
            </div>
            <div style="width: 49%">
              <q-input
                outlined
                dense
                v-model="customer.data.last_name"
                :label="'Apellidos'"
                type="text"
                lazy-rules
                style="background-color: #f5f6f7"
              />
            </div>
          </div>

            <div style="width: 100%; margin: 10px 0 10px 0;">
              <q-input
                outlined
                dense
                v-model="customer.data.email"
                :label="'Correo Electrónico'"
                type="text"
                lazy-rules
                style="background-color: #f5f6f7"
              />
            </div>

            <div style="width: 100%; margin: 0 0 10px 0;">
              <q-input
                outlined
                dense
                v-model="customer.data.password"
                :label="'Contraseña'"
                type="password"
                lazy-rules
                style="background-color: #f5f6f7"
              />
            </div>

            <div style="width: 100%; margin: 0 0 10px 0;">
              <q-input
                outlined
                dense
                v-model="passwordConfirm"
                :label="'Confirmar Contraseña'"
                type="password"
                lazy-rules
                style="background-color: #f5f6f7"
              />
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; ">
              <div style="width: 49%" >
                <q-select
                outlined
                options-cover
                dense
                v-model="customer.data.identificationtype"
                :options="listIdTypes"
                map-options
                options-dense
                option-value="id"
                option-label="idtype"
                :label="'Tipo De Identificación'"
                stack-label
                emit-value
                style="background-color: #f5f6f7"
              />
            </div>
            <div style="width: 49%">
              <q-input
                onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
                outlined
                dense
                v-model="customer.data.identification"
                :label="'Identificación'"
                type="string"
                lazy-rules
                style="background-color: #f5f6f7"
              />
            </div>
          </div>

          <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 10px;">
              <div style="width: 49%" >
              <q-input
              onkeydown="javascript: return ['Backspace','Delete','ArrowLeft','ArrowRight'].includes(event.code) ? true : !isNaN(Number(event.key)) && event.code!=='Space'"
                outlined
                dense
                v-model="customer.data.phone"
                :label="'Teléfono'"
                type="text"
                lazy-rules
                style="background-color: #f5f6f7"
              />
            </div>
            <q-input
                filled
                :label="'Fecha De Nacimiento'"
                dense
                v-model="customer.data.birthdate"
                style="width: 49%;"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="customer.data.birthdate"
                        mask="YYYY-MM-DD"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Cerrar"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

              </q-input>
          </div>

          <!-- <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 20px;">
            <q-input
                filled
                :label="'Fecha De Nacimiento'"
                dense
                v-model="customer.birthday"
                :readonly="ModalVer"
                style="width: 49%;"
              >
                <template v-slot:prepend>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy
                      cover
                      transition-show="scale"
                      transition-hide="scale"
                    >
                      <q-date
                        v-model="customer.birthday"
                        mask="YYYY-MM-DD"
                      >
                        <div class="row items-center justify-end">
                          <q-btn
                            v-close-popup
                            label="Cerrar"
                            color="primary"
                            flat
                          />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>

              </q-input>
              <div style="width: 49%;">
            <q-select
                outlined
                options-cover
                dense
                v-model="customer.gender"
                :options="listGenders"
                map-options
                options-dense
                option-value="id"
                option-label="gender"
                :label="'Género'"
                stack-label
                emit-value
                style="background-color: #f5f6f7"
              />
          </div>
          </div> -->
          <div style="margin: 20px 0 0 0; display: flex; align-items: center; transform: translateX(-5px);">
            <q-checkbox
                size="lg"
                v-model="condYSer"
                :label="''"
                checked-icon="task_alt"
                unchecked-icon="highlight_off"
                />
                <div style="text-align: justify;width: 88%; font-size: 11px; transform: translateX(-5px);">
                  Acepto las Condiciones del servicio y la Política de privacidad de XXXXXX. Es posible que te enviemos notificaciones por SMS y Correo Electrónico, que podrás desactivar cuando quieras.
                </div>
          </div>

        </q-card-section>

        <div style="display: flex; align-items: center; justify-content: center; margin: 10px 0 20px 0;">

          <q-btn
            :disable="!condYSer"
            flat
            style="background-color: #42b72a; width: 50%; border-radius: 5px;"
            :label="'Registrarte'"
            type="submit"
            text-color="white"
            no-caps
          />
        </div>
      </q-form>
    </q-card>
  </q-dialog>

</template>

<script setup>
import { ref, onMounted, reactive } from 'vue';
import { useRouter, useRoute } from "vue-router";
import { useQuasar, date } from "quasar";
import { api } from "boot/axios";
import Constants from "src/boot/globalConstants.js";
import { showNotify } from 'src/utils/global.js';

let $q = useQuasar();
const URL = Constants.SERVER_URL;

const router = useRouter();
const modalnewaccount = ref(false);
const isPwd = ref(true);

const condYSer = ref(false);
const publicidad = ref(false);
const myForm = ref(null);

const passwordConfirm = ref("");

const user = ref(
  {
  username: "",
  email: "",
  password: ""
})

const customer = ref({
  data: {
    identification: "",
    first_name: "",
    last_name: "",
    address: "",
    birthdate: "",
    email: "",
    identificationtype: "",
    phone: "",
    password: ""
  }
}
);

const listIdTypes = ref([
{id: 1,
idtype: "Cédula de Ciudadanía"},
{id: 2,
idtype: "Tarjeta de Identidad"},
{id: 3,
idtype: "Cédula de Extranjería"},
{id: 4,
idtype: "Registro Civil"},
{id: 5,
idtype: "DNI (País de Orígen)"},
{id: 6,
idtype: "DNI (Pasaporte)"},
{id: 7,
idtype: "Salvoconducto Para Refugiado"},
{id: 8,
idtype: "Permiso Especial de Permanencia"},
{id: 9,
idtype: "Permiso Por Protección Temporal"}
])

const listGenders = ref([
{id: 1,
gender: "Masculino"},
{id: 2,
gender: "Femenino"},
{id: 3,
gender: "No Binario"},
{id: 4,
gender: "Otro"},
{id: 5,
gender: "Prefiero no decirlo"}
]);

const cerrarmodalnewaccount = () => {
  modalnewaccount.value = false;
  condYSer.value = false;
  customer.value = {
  data: {
    identification: "",
    first_name: "",
    last_name: "",
    address: "",
    birthdate: "",
    email: "",
    identificationtype: "",
    phone: "",
    password: ""
  }
};
}

const createNewCustomer = () => {
 customer.value.data.identificationtype = customer.value.data.identificationtype.toString();
  api
    .post("/v1/customers", customer.value)
    .then((response) => {
      console.log("Status: "+ response.status)
      if(response.status == 200){
        modalnewaccount.value = false;
        condYSer.value = false;
        customer.value = {};
        showNotify("Usuario Registrado Correctamente", "success")
      }else if (response.status == 400){
        showNotify("No fue posible crear el usuario, intente nuevamente.", "warning")
      }


      /* modalnewaccount.value = false;
      condYSer.value = false;
      customer.value = {}; */

    })
    .catch((error) => {
      console.log(error.response.data.error.message)
      if(error.response.data.error.message.includes("valid email")){
        showNotify(error.response.data.error.message, "error")
      }else{
        showNotify(error.response.data.error.message, "error")
      }
    });

}

let login = reactive({
  identifier: "",
  password: "",
});

const infoIniSesion = ref([]);

function Login() {
  myForm.value.validate().then((success) => {
    $q.loading.show();
    if (success) {

      api
        .post("auth/local", login)
        .then((response) => {
          /* store.inicio(response.data); */

          infoIniSesion.username = response.data.username;
          infoIniSesion.email = response.data.email;

          api.defaults.headers.common.Authorization =
            "Bearer " + response.data.jwt;
            console.log(api.defaults.headers.common.Authorization)
            $q.sessionStorage.set("finansofttoken", response.data.jwt);
            $q.loading.hide();
            router.push("/");

        })
        .catch((error) => {
          $q.loading.hide();

        });
    } else {
      $q.notify({
        type: "negative",
        message: /* $t */ "Key",
        timeout: 3000,
      });
      $q.loading.show();
    }
  });
}

onMounted(() => {
/*   for(var i = 0; i = 1; i++){
    location.reload();
  } */


})

</script>

<style scoped>
.q-field__bottom.row.items-start.q-field__bottom--animated{
  margin: 0 !important;
  padding: 0 !important;
}
.inputId::-webkit-outer-spin-button,
.inputId::-webkit-inner-spin-button {
  display: none !important;
  margin: 0;
}

input[type="number"]::-webkit-outer-spin-button,
  input[type="number"]::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

</style>
