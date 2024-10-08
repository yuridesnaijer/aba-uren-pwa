<template>
  <v-container class="pb-16" v-if="currentUserName">
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>
            <span class="text-pink text-h6">
              Uren schrijven <v-icon icon="mdi-pencil"></v-icon>
            </span>
          </v-card-title>
          <v-card-text>
            <v-form ref="form" @submit.prevent="addHours">
              <v-row>
                <v-col>
                  <v-select
                    :rules="rules"
                    v-model="hourEntry.client"
                    label="client"
                    :items="clients"
                    variant="outlined"
                    density="compact"
                  />
                  <v-dialog v-model="isClientFormOpen">
                    <template v-slot:activator="{ props }">
                      <v-btn size="small" variant="outlined" v-bind="props">Client toevoegen</v-btn>
                    </template>
                    <v-card>
                      <v-card-text><AddClientForm @onSave="onClientAdded" /></v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label for="date">datum:</label>
                  <VueDatePicker
                    :auto-apply="true"
                    required
                    id="date"
                    placeholder="datum"
                    v-model="hourEntry.date"
                    :enable-time-picker="false"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label for="startTime">Starttijd:</label>
                  <VueDatePicker
                    required
                    id="startTime"
                    v-model="hourEntry.startTime"
                    time-picker
                    :teleport="true"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label for="endTime">Eindtijd:</label>
                  <VueDatePicker
                    required
                    id="endTime"
                    v-model="hourEntry.endTime"
                    time-picker
                    :teleport="true"
                  />
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <label for="travel">Reis:</label>
                  <v-select
                    :rules="rules"
                    id="travel"
                    v-model="hourEntry.travelOption"
                    label="reis"
                    :items="travelOptions"
                    :return-object="true"
                    item-title="label"
                    item-value="value"
                    variant="outlined"
                    density="compact"
                  />
                  <v-dialog v-model="isTravelOptionFormOpen">
                    <template v-slot:activator="{ props }">
                      <v-btn size="small" variant="outlined" v-bind="props"
                        >reisoptie toevoegen</v-btn
                      >
                    </template>
                    <v-card>
                      <v-card-text
                        ><AddTravelOptionForm @onSave="onTravelOptionAdded"
                      /></v-card-text>
                    </v-card>
                  </v-dialog>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                  <v-textarea
                    v-model="hourEntry.description"
                    label="omschrijving"
                    variant="outlined"
                    dense
                  />
                </v-col>
              </v-row>

              <v-btn
                :disabled="!isFormValid"
                class="mt-8"
                color="primary"
                type="submit"
                :block="true"
                >toevoegen</v-btn
              >
            </v-form></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import VueDatePicker from '@vuepic/vue-datepicker'
import { LOCAL_STORAGE_KEY_CLIENTS, LOCAL_STORAGE_KEY_TRAVEL_OPTIONS } from '@/Globals'
import AddTravelOptionForm from '@/components/AddTravelOptionForm.vue'
import AddClientForm from '@/components/AddClientForm.vue'
import { LocalStorageDB } from '@/api/localStorage'
import type { THourEntry } from '@/types/THourEntry'
import { firebaseDB } from '@/api/firebase'
import { mapStores } from 'pinia'
import { useAuthStore } from '@/stores/authStore'

export type TTravelOption = {
  label: string
  value: number
}

const formRules = {
  required: (value: string | number) => {
    if (value) {
      return true
    }
    return 'Verplicht veld'
  }
}

export default defineComponent({
  components: {
    AddClientForm,
    AddTravelOptionForm,
    VueDatePicker
  },
  data: function () {
    return {
      isTravelOptionFormOpen: false,
      isClientFormOpen: false,
      rules: [formRules.required],
      travelOptions: [],
      clients: [],
      hourEntry: {
        client: undefined,
        date: undefined,
        startTime: undefined,
        endTime: undefined,
        travelOption: undefined,
        description: undefined
      }
    }
  },
  created() {
    this.updateTravelOptions()
    this.updateClients()
  },
  methods: {
    async updateTravelOptions() {
      const existingTravelOptions = await firebaseDB.getTravelOptions() //window.localStorage.getItem(LOCAL_STORAGE_KEY_TRAVEL_OPTIONS)
      if (!existingTravelOptions) {
        this.travelOptions = []
        return
      }

      this.travelOptions = existingTravelOptions
    },
    async updateClients() {
      const existingClients = await firebaseDB.getClients()
      if (!existingClients) {
        this.clients = []
        return
      }

      this.clients = existingClients.map((client) => client.name)
    },
    onTravelOptionAdded() {
      this.isTravelOptionFormOpen = false
      this.updateTravelOptions()
    },
    onClientAdded() {
      this.isClientFormOpen = false
      this.updateClients()
    },
    reset() {
      this.hourEntry = {
        client: undefined,
        date: undefined,
        startTime: undefined,
        endTime: undefined,
        travelOption: undefined,
        description: undefined
      }
    },
    addHours() {
      //TODO: figure out how to type this
      // @ts-ignore
      const hours: THourEntry = this.hourEntry
      LocalStorageDB.SetHours(hours)
      firebaseDB.setHours(hours)
      this.reset()
    }
  },
  computed: {
    ...mapStores(useAuthStore),
    currentUserName: function (): string | null {
      if (!this.authStore.user) {
        return null
      }
      return this.authStore.user?.displayName + "'s"
    },
    isFormValid(): boolean {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { description, ...entryWithoutDescription } = this.hourEntry
      return !Object.values(entryWithoutDescription).includes(undefined)
    }
  }
})
</script>
