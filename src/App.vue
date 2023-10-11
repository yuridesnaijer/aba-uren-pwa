<script setup lang="ts">
import { RouterView } from 'vue-router'
import firebase from 'firebase/compat/app'
import * as firebaseui from 'firebaseui'
import 'firebaseui/dist/firebaseui.css'
import { useAuthStore } from '@/stores/authStore'
import { getAuth } from 'firebase/auth'
import { firebaseConfig, firebaseDB } from '@/api/firebase'

firebase.initializeApp(firebaseConfig)

const auth = getAuth()
const store = useAuthStore()

if (!auth.currentUser) {
  const ui = new firebaseui.auth.AuthUI(firebase.auth())
  ui.start('#firebaseui-auth-container', {
    signInOptions: [firebase.auth.EmailAuthProvider.PROVIDER_ID],
    callbacks: {
      signInSuccessWithAuthResult(authResult: any, redirectUrl?: string): boolean {
        store.setUser(authResult.user)
        firebaseDB.initializeUser(authResult.user)
        return false
      }
    }
  })
}
</script>

<template>
  <div id="firebaseui-auth-container"></div>
  <v-app>
    <v-main>
      <RouterView />
    </v-main>
    <v-bottom-navigation>
      <v-btn @click="$router.push('/')" value="recent">
        <v-icon>mdi-history</v-icon>
        Overzicht
      </v-btn>

      <v-btn @click="$router.push('/schrijven')" value="favorites">
        <v-icon>mdi-heart</v-icon>
        Uren schrijven
      </v-btn>
    </v-bottom-navigation>
  </v-app>
</template>
