import type { THourEntry } from '@/types/THourEntry'
import { LOCAL_STORAGE_KEY_HOUR_ENTRY } from '@/Globals'
import { v4 as uuidv4 } from 'uuid'

export const LocalStorageDB = {
  GetHours(): THourEntry[] {
    const existingHours = window.localStorage.getItem(LOCAL_STORAGE_KEY_HOUR_ENTRY)
    if (!existingHours) {
      return []
    }

    return JSON.parse(existingHours)
  },
  SetHours(hours: THourEntry) {
    const existingHours = this.GetHours()
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY_HOUR_ENTRY,
      JSON.stringify([...existingHours, { ...hours, id: uuidv4() }])
    )
  },
  DeleteHours(id: string) {
    const hours = this.GetHours()
    const indexToDelete = hours.findIndex((element) => element.id === id)
    hours.splice(indexToDelete, 1)
    window.localStorage.setItem(LOCAL_STORAGE_KEY_HOUR_ENTRY, JSON.stringify(hours))
  }
}
