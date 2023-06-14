<template>
  <v-container class="pb-16">
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
import {
  LOCAL_STORAGE_KEY_CLIENTS,
  LOCAL_STORAGE_KEY_HOUR_ENTRY,
  LOCAL_STORAGE_KEY_TRAVEL_OPTIONS
} from '@/Globals'
import AddTravelOptionForm from '@/components/AddTravelOptionForm.vue'
import AddClientForm from '@/components/AddClientForm.vue'

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
        travelOption: undefined
      }
    }
  },
  created() {
    this.updateTravelOptions()
    this.updateClients()
  },
  methods: {
    updateTravelOptions() {
      const existingTravelOptions = window.localStorage.getItem(LOCAL_STORAGE_KEY_TRAVEL_OPTIONS)
      if (!existingTravelOptions) {
        this.travelOptions = []
        return
      }

      this.travelOptions = JSON.parse(existingTravelOptions)
    },
    updateClients() {
      const existingClients = window.localStorage.getItem(LOCAL_STORAGE_KEY_CLIENTS)
      if (!existingClients) {
        this.clients = []
        return
      }

      this.clients = JSON.parse(existingClients)
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
        travelOption: undefined
      }
    },
    addHours() {
      const existingHours = window.localStorage.getItem(LOCAL_STORAGE_KEY_HOUR_ENTRY)

      if (!existingHours) {
        JSON.stringify([{ ...this.$data.hourEntry }])
        return
      }

      const parsedExistingHours = JSON.parse(existingHours)
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY_HOUR_ENTRY,
        JSON.stringify([...parsedExistingHours, { ...this.$data.hourEntry }])
      )
      this.reset()
    }
  },
  computed: {
    isFormValid(): boolean {
      return !Object.values(this.hourEntry).includes(undefined)
    }
  }
})
</script>
