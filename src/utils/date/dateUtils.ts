import { type TTime } from '@/types/TTime'

export const DateUtils = {
  formatDate(_date: Date): string {
    const date = new Date(_date)
    return date.toLocaleDateString('nl-NL', { dateStyle: 'full' })
  },
  formatTime(time: TTime): string {
    const hours = time.hours > 9 ? time.hours : '0' + time.hours.toString()
    const minutes = time.minutes > 9 ? time.minutes : '0' + time.minutes.toString()
    return `${hours}:${minutes}`
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
