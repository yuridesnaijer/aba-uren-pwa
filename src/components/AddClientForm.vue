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
import { firebaseDB } from '@/api/firebase'

export default {
  name: 'AddClientForm',
  data() {
    return {
      client: ''
    }
  },
  methods: {
    async addClient() {
      let data = [this.client]
      const existingClients = window.localStorage.getItem(LOCAL_STORAGE_KEY_CLIENTS)
      if (existingClients) {
        const parsedClients = JSON.parse(existingClients)
        data = [this.client, ...parsedClients]
      }

      window.localStorage.setItem(LOCAL_STORAGE_KEY_CLIENTS, JSON.stringify(data))
      await firebaseDB.addClient(this.client)
      this.$emit('onSave')
    }
  }
}
</script>
