<script setup lang="ts">
import { RouterView } from 'vue-router'
</script>

<template>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
    <v-bottom-navigation>
      <v-btn href="/" value="recent">
        <v-icon>mdi-history</v-icon>
        Overzicht
      </v-btn>

      <v-btn href="/schrijven" value="favorites">
        <v-icon>mdi-heart</v-icon>
        Uren schrijven
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
