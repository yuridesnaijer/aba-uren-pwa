import type { TTravelOption } from '@/views/WriteHoursView.vue'
import type { TTime } from '@/types/TTime'

export type THourEntry = {
  id: string
  client: string
  startTime: TTime
  endTime: TTime
  date: Date
  travelOption: TTravelOption
  description?: string
}
