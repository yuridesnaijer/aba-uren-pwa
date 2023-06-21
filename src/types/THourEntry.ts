import { TTravelOption } from '@/views/WriteHoursView.vue'
import { TTime } from '@/types/TTime'

export type THourEntry = {
  id: string
  client: string
  startTime: TTime
  endTime: TTime
  date: Date
  travelOption: TTravelOption
}
