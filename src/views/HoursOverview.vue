<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center">
            <span class="text-pink text-h6">
              Yasmin's uren overzicht <v-icon icon="mdi-heart"></v-icon>
            </span>
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th class="text-left">Client</th>
                  <th class="text-left">Datum</th>
                  <th class="text-left">Starttijd</th>
                  <th class="text-left">Eindtijd</th>
                  <th class="text-left">tijd</th>
                  <th class="text-left">Reisafstand</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in writtenHours" :key="item.client + item.date">
                  <td>{{ item.client }}</td>
                  <td>{{ item.date }}</td>
                  <td>{{ formatTime(item.startTime) }}</td>
                  <td>{{ formatTime(item.endTime) }}</td>
                  <td>{{ duration(item.startTime, item.endTime) }}</td>
                  <td>{{ item.travelOption.value }}km</td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import { LOCAL_STORAGE_KEY_HOUR_ENTRY } from '@/Globals'
import { type TTravelOption } from '@/views/WriteHoursView.vue'

type TTime = {
  hours: number
  minutes: number
  seconds: number
}

type THourEntry = {
  client: string
  startTime: TTime
  endTime: TTime
  date: Date
  travelOption: TTravelOption
}

export default {
  name: 'HoursOverview',
  computed: {
    writtenHours(): THourEntry[] {
      const existingData = window.localStorage.getItem(LOCAL_STORAGE_KEY_HOUR_ENTRY)
      if (!existingData) {
        return []
      }

      return JSON.parse(existingData)
    }
  },
  methods: {
    formatTime(time: TTime): string {
      const hours = time.hours > 9 ? time.hours : '0' + time.hours.toString()
      const minutes = time.minutes > 9 ? time.minutes : '0' + time.minutes.toString()
      return `${hours}:${minutes}`
    },
    duration(startTime: TTime, endTime: TTime): string {
      const start = new Date()
      start.setHours(startTime.hours)
      start.setMinutes(startTime.minutes)

      const end = new Date()
      end.setHours(endTime.hours)
      end.setMinutes(endTime.minutes)

      const hoursDec = (end.getTime() - start.getTime()) / 1000 / 60 / 60
      const minDec = hoursDec % 1
      const hours = hoursDec - minDec
      const minutes = Math.round(minDec * 60)

      return `${hours}:${minutes}`
    }
  }
}
</script>
