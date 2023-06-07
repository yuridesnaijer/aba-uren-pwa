<template>
  <v-form>
    <v-container>
      <v-row>
        <v-col>
          <v-text-field v-model="client" label="label"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-btn @click="addClient" color="primary" :block="true">toevoegen</v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<script lang="ts">
import { LOCAL_STORAGE_KEY_CLIENTS } from '@/Globals'

export default {
  name: 'AddClientForm',
  data() {
    return {
      client: ''
    }
  },
  methods: {
    addClient() {
      const existingClients: string[] =
        JSON.parse(window.localStorage.getItem(LOCAL_STORAGE_KEY_CLIENTS) || '') || []

      window.localStorage.setItem(
        LOCAL_STORAGE_KEY_CLIENTS,
        JSON.stringify([...existingClients, this.client])
      )
      this.$emit('onSave')
    }
  }
}
</script>
