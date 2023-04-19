<template>
  <q-layout >
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <q-btn round flat>
          <q-avatar size="35px" color="grey-4">
            <q-img
              style="
                width: 35px;
                max-width: 120vw;
                height: 35px;
                max-height: 120vh;
              "
              :src="datosUsuario"
            />
            <q-menu style="transform: translateX(8px) translateY(3px);">
              <q-list bordered>
                <q-item clickable v-ripple to="/perfil">
                  <q-item-section avatar>
                    <q-icon name="account_circle" size="1.5em" />
                  </q-item-section>
                  <q-item-section>Perfil</q-item-section>
                </q-item>
                <q-item
                  clickable
                  @click="
                    null
                  "
                  v-ripple
                >
                  <q-item-section avatar style="margin 0; padding: 0;">
                    <q-icon name="verified_user" size="1.5em" />
                  </q-item-section>
                  <q-item-section>Cambiar Contraseña</q-item-section>
                </q-item>

                <q-item id="CerrarSesion" clickable @click="null">
                  <q-item-section avatar>
                    <q-icon name="logout" size="1.5em" />
                  </q-item-section>

                  <q-item-section>Cerrar Sesión</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-avatar>
          <q-tooltip>{{ "Mi Cuenta" }}</q-tooltip>
        </q-btn>

      </q-toolbar>
    </q-header>

    <q-drawer

    v-model="leftDrawerOpen"
      show-if-above
      :width="250"
      :breakpoint="400"
      style="box-shadow: 5px 2px 2px #dfdfdf"
    >
      <q-list>
        <q-item-label
          header
        >
          Menú
        </q-item-label>

        <div style="max-width: 350px; margin-bottom: 100px">
            <q-list v-for="(parent, i) in Menu" :key="i">
              <div v-if="parent.length == 0">
                <q-expansion-item
                  :content-inset-level="0.5"
                  expand-separator
                  :icon="parent.icon"
                  :label="parent.title"
                  @click="Redirect(parent.path)"
                >
                </q-expansion-item>
              </div>
              <div v-else>
                <q-expansion-item
                  :content-inset-level="0.5"
                  expand-separator
                  :icon="parent.icon"
                  :label="parent.title"
                >
                  <q-list v-for="(child, j) in parent.children" :key="j">
                    <div
                      v-if="
                        child.grandchildren.length == 0
                      "
                    >
                      <q-item
                        clickable
                        :content-inset-level="0.5"
                        @click="Redirect(child.path)"
                      >
                      <q-item-section avatar>
                          <q-icon :name=child.icon />
                        </q-item-section>
                      <q-item-section>{{ child.title }}</q-item-section>

                      </q-item>
                    </div>

                    <div
                      v-if="
                        child.grandchildren.length != 0
                      "
                    >
                      <q-expansion-item
                        :content-inset-level="0.5"
                        :label="child.title"
                      >
                        <q-list v-for="(grandchild, j) in child.grandchildren" :key="j">
                          <q-item clickable @click="Redirect(grandchild.path)">
                            <q-item-section avatar>
                              <q-item-label>{{ grandchild.title }}</q-item-label>
                            </q-item-section>
                          </q-item>
                        </q-list>
                      </q-expansion-item>
                    </div>

                  </q-list>
                </q-expansion-item>
              </div>
            </q-list>
          </div>

      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { defineComponent, ref, onMounted } from 'vue'
import { useRouter, useRoute } from "vue-router";
import EssentialLink from 'components/EssentialLink.vue'

const router = useRouter();

const leftDrawerOpen = ref(false)
const datosUsuario = ref('data:image/png;base64,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')

const Menu = ref([]);

const Redirect = (path) =>{
  router.push("/" + path);
}

onMounted(() =>{
  Menu.value.push({
    title: 'Administrativo',
    icon: 'display_settings',
    path: 'managment',
    children: [{
      title: 'Créditos',
      icon: 'payments',
      path: 'managment/credits',
      grandchildren: []
    },
    {
      title: 'Clientes',
      icon: 'groups',
      path: 'managment/customers',
      grandchildren: []
    },
    {
      title: 'Calculadora',
      icon: 'calculate',
      path: 'managment/calculator',
      grandchildren: []
    },
    {
      title: 'Plazos',
      icon: 'calendar_month',
      path: 'managment/deadlines',
      grandchildren: []
    }]
  },
  {
    title: 'Ventas',
    icon: 'trending_up',
    path: 'sales',
    children: [{
      title: 'Créditos',
      icon: 'payments',
      path: 'sales/credits',
      grandchildren: []
    },
    {
      title: 'Consultas',
      icon: 'query_stats',
      path: 'sales/queries',
      grandchildren: []
    },
  ]
  },
  {
    title: 'Cartera',
    icon: 'monetization_on',
    path: 'portfolio',
    children: [
    {
      title: 'Consultas',
      icon: 'query_stats',
      path: 'portfolio/queries',
      grandchildren: []
    },
  ]
  },
  {
    title: 'Sistema',
    icon: 'school',
    path: '/systems'
  },
  {
    title: 'Call Center',
    icon: 'school',
    path: '/systems'
  })


})
</script>

<style scoped>
</style>
