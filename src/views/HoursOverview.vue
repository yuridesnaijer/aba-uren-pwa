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
                  <td>{{ formatDate(item.date) }}</td>
                  <td>{{ formatTime(item.startTime) }}</td>
                  <td>{{ formatTime(item.endTime) }}</td>
                  <td>{{ durationString(duration(item.startTime, item.endTime)) }}</td>
                  <td>{{ item.travelOption.value }}km / {{ item.travelOption.label }}</td>
                  <td>
                    <v-btn color="error" @click="showConfirmationDialog = true">verwijderen</v-btn>
                    <v-dialog v-model="showConfirmationDialog">
                      <v-card>
                        <v-card-title>
                          Weet je zeker dat je dit wil verwijderen Yasmin??????
                        </v-card-title>
                        <v-card-actions>
                          <v-btn variant="tonal" color="error" @click="deleteHours(item.id)"
                            >ja</v-btn
                          >
                          <v-btn @click="showConfirmationDialog = false">nee</v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title>Totaal uren:{{ durationString(totalWrittenHours()) }} </v-card-title>
          <v-card-text
            ><v-table>
              <thead>
                <tr>
                  <th class="text-left">Client</th>
                  <th class="text-left">Aantal uren</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in totalWrittenHoursInSecondsPerClient()">
                  <td>{{ key }}</td>
                  <td>{{ durationString(secondsToTime(value)) }}</td>
                </tr>
              </tbody></v-table
            ></v-card-text
          >
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import type { THourEntry } from '@/types/THourEntry'
import type { TTime } from '@/types/TTime'
import { LocalStorageDB } from '@/api/localStorage'

export default {
  name: 'HoursOverview',
  data(): { showConfirmationDialog: boolean; writtenHours: THourEntry[] } {
    return {
      showConfirmationDialog: false,
      writtenHours: []
    }
  },
  created() {
    this.updateHoursOverview()
  },
  methods: {
    updateHoursOverview() {
      this.writtenHours = LocalStorageDB.GetHours()
    },
    deleteHours(id: string) {
      LocalStorageDB.DeleteHours(id)
      this.showConfirmationDialog = false
      this.updateHoursOverview()
    },
    formatDate(_date: Date): string {
      const date = new Date(_date)
      return date.toLocaleDateString('nl-NL', { dateStyle: 'full' })
    },
    formatTime(time: TTime): string {
      const hours = time.hours > 9 ? time.hours : '0' + time.hours.toString()
      const minutes = time.minutes > 9 ? time.minutes : '0' + time.minutes.toString()
      return `${hours}:${minutes}`
    },
    totalWrittenHoursInSecondsPerClient(): { [key: string]: number } {
      const accumulator: { [key: string]: number } = {}
      return this.writtenHours.reduce((accumulator, currentValue: THourEntry) => {
        const value =
          accumulator[currentValue.client] !== undefined ? accumulator[currentValue.client] : 0
        accumulator[currentValue.client] =
          value + this.timeToSeconds(this.duration(currentValue.startTime, currentValue.endTime))
        return accumulator
      }, accumulator)
    },
    totalWrittenHours(): TTime {
      const totalTime: TTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }

      this.writtenHours.forEach((currentValue: THourEntry) => {
        const currentTime: TTime = this.duration(currentValue.startTime, currentValue.endTime)
        totalTime.hours += currentTime.hours
        totalTime.minutes += currentTime.minutes
        totalTime.seconds += currentTime.seconds
      }, totalTime)

      return this.secondsToTime(this.timeToSeconds(totalTime))
    },
    timeToSeconds(time: TTime): number {
      let seconds = 0
      seconds += time.seconds
      seconds += time.minutes * 60
      seconds += time.hours * 60 * 60
      return seconds
    },
    secondsToTime(seconds: number): TTime {
      return {
        seconds: 0,
        minutes: (seconds % (60 * 60)) / 60,
        hours: Math.floor(seconds / (60 * 60))
      }
    },
    durationString(duration: TTime): string {
      return `${duration.hours}:${duration.minutes}`
    },
    duration(startTime: TTime, endTime: TTime): TTime {
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
      return {
        hours,
        minutes,
        seconds: 0
      }
    }
  }
}
</script>
