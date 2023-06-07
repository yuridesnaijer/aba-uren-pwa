<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="travelOption.label" label="label"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <v-text-field type="number" v-model="travelOption.value" label="afstand"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="addTravelOption" color="primary" :block="true">toevoegen</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { LOCAL_STORAGE_KEY_TRAVEL_OPTIONS } from '@/Globals'
import { type TTravelOption } from '@/views/WriteHoursView.vue'

export default {
  name: 'AddTravelOptionForm',
  data() {
    return {
      travelOption: {
        label: '',
        value: ''
      }
    }
  },
  methods: {
    addTravelOption() {
      const existingTravelOptions: TTravelOption[] = JSON.parse(
        window.localStorage.getItem(LOCAL_STORAGE_KEY_TRAVEL_OPTIONS) || '[]'
      )

      const travelOption: TTravelOption = {
        ...this.travelOption,
        value: parseFloat(this.travelOption.value)
      }

      window.localStorage.setItem(
        LOCAL_STORAGE_KEY_TRAVEL_OPTIONS,
        JSON.stringify([...existingTravelOptions, travelOption as TTravelOption])
      )
      this.$emit('onSave')
    }
  }
}
</script>
