<template>
  <v-container v-if="currentUserName">
    <v-row>
      Selecteer maand:
      <v-select
        outlined
        v-model="selectedMonth"
        item-value="index"
        item-title="label"
        :items="[
          { index: 0, label: 'Januari' },
          { index: 1, label: 'Februari' },
          { index: 2, label: 'Maart' },
          { index: 3, label: 'April' },
          { index: 4, label: 'Mei' },
          { index: 5, label: 'Juni' },
          { index: 6, label: 'Juli' },
          { index: 7, label: 'Augustus' },
          { index: 8, label: 'September' },
          { index: 9, label: 'Oktober' },
          { index: 10, label: 'November' },
          { index: 11, label: 'December' }
        ]"
      >
      </v-select>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-center">
            <span class="text-pink text-h6">
              {{ currentUserName }} uren overzicht <v-icon icon="mdi-heart"></v-icon>
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
                <tr v-for="item in filteredHoursOverview" :key="item.client + item.date">
                  <td>{{ item.client }}</td>
                  <td>{{ $date.formatDate(item.date) }}</td>
                  <td>{{ $date.formatTime(item.startTime) }}</td>
                  <td>{{ $date.formatTime(item.endTime) }}</td>
                  <td>{{ $date.durationString($date.duration(item.startTime, item.endTime)) }}</td>
                  <td>{{ item.travelOption.value }}km / {{ item.travelOption.label }}</td>
                  <td>
                    <v-btn color="error" @click="showConfirmationDialogForItemId = item.id"
                      >verwijderen</v-btn
                    >
                    <v-dialog v-model="showConfirmationDialogForItemId">
                      <v-card>
                        <v-card-title>
                          Weet je zeker dat je dit wil verwijderen Yasmin??????
                        </v-card-title>
                        <v-card-actions>
                          <v-btn
                            variant="tonal"
                            color="error"
                            @click="deleteHours(showConfirmationDialogForItemId)"
                            >ja</v-btn
                          >
                          <v-btn @click="showConfirmationDialogForItemId = null">nee</v-btn>
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
          <v-card-title
            >Totaal uren:{{ $date.durationString(totalWrittenHours(filteredHoursOverview)) }}
          </v-card-title>
          <v-card-text
            ><v-table>
              <thead>
                <tr>
                  <th class="text-left">Client</th>
                  <th class="text-left">Aantal uren</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(value, key) in totalWrittenHoursInSecondsPerClient(filteredHoursOverview)"
                >
                  <td>{{ key }}</td>
                  <td>{{ $date.durationString($date.secondsToTime(value)) }}</td>
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
import { DateUtils } from '@/utils/date/dateUtils'
import { useAuthStore } from '@/stores/authStore'
import { mapStores } from 'pinia'
import { firebaseDB } from '@/api/firebase'

export default {
  name: 'HoursOverview',
  data(): {
    selectedMonth: number
    showConfirmationDialogForItemId: string | null
    writtenHours: THourEntry[]
  } {
    return {
      selectedMonth: new Date().getMonth(),
      showConfirmationDialogForItemId: null,
      writtenHours: []
    }
  },
  created() {
    this.updateHoursOverview()
    this.sortWrittenHours()
  },
  computed: {
    ...mapStores(useAuthStore),
    currentUserName: function (): string | null {
      if (!this.authStore.user) {
        return null
      }
      return this.authStore.user?.displayName + "'s"
    },
    filteredHoursOverview: function (): THourEntry[] {
      return this.writtenHours.filter((entry: THourEntry) => {
        if (new Date(entry.date).getMonth() === this.selectedMonth) {
          return entry
        }
      })
    }
  },
  methods: {
    sortWrittenHours() {
      this.writtenHours = this.writtenHours.sort((a: THourEntry, b: THourEntry) => {
        return new Date(a.date) - new Date(b.date)
      })
    },
    async updateHoursOverview() {
      this.writtenHours = await firebaseDB.getHours()
    },
    deleteHours(id: string) {
      firebaseDB.deleteHourEntry(id)
      this.showConfirmationDialogForItemId = null
      this.updateHoursOverview()
    },
    totalWrittenHoursInSecondsPerClient(hourEntries: THourEntry[]): { [key: string]: number } {
      const accumulator: { [key: string]: number } = {}
      return hourEntries.reduce((accumulator, currentValue: THourEntry) => {
        const value =
          accumulator[currentValue.client] !== undefined ? accumulator[currentValue.client] : 0
        accumulator[currentValue.client] =
          value +
          DateUtils.timeToSeconds(DateUtils.duration(currentValue.startTime, currentValue.endTime))
        return accumulator
      }, accumulator)
    },
    totalWrittenHours(hourEntries: THourEntry[]): TTime {
      const totalTime: TTime = {
        hours: 0,
        minutes: 0,
        seconds: 0
      }

      hourEntries.forEach((currentValue: THourEntry) => {
        const currentTime: TTime = DateUtils.duration(currentValue.startTime, currentValue.endTime)
        totalTime.hours += currentTime.hours
        totalTime.minutes += currentTime.minutes
        totalTime.seconds += currentTime.seconds
      }, totalTime)

      return DateUtils.secondsToTime(DateUtils.timeToSeconds(totalTime))
    }
  }
}
</script>
