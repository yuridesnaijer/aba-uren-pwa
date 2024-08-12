import { initializeApp } from 'firebase/app'
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  Firestore,
  type DocumentData,
  type DocumentReference
} from 'firebase/firestore'
import { type THourEntry } from '@/types/THourEntry'
import { type TTravelOption } from '@/views/WriteHoursView.vue'

export const firebaseConfig = {
  apiKey: 'AIzaSyC82Fz-65X0hPMQfd8QObR8N09CBinaBKM',
  authDomain: 'aba-admin-abf9a.firebaseapp.com',
  projectId: 'aba-admin-abf9a',
  storageBucket: 'aba-admin-abf9a.appspot.com',
  messagingSenderId: '549472373713',
  appId: '1:549472373713:web:221613f24da06d9f4eeef0',
  measurementId: 'G-JRKHFNHEL9'
}

export abstract class firebaseDB {
  private static app: any
  private static db: Firestore
  private static data: unknown
  private static userRef: DocumentReference<DocumentData, DocumentData>

  public static async initializeUser(user: any) {
    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)

    this.userRef = doc(this.db, 'users', '/' + user.uid)
    const docSnap = await getDoc(this.userRef)

    if (docSnap.exists()) {
      this.data = docSnap.data()
    } else {
      await this.createUser(user)
    }
  }
  static async createUser(user: any) {
    const usersRef = collection(this.db, 'users')
    await setDoc(doc(usersRef, user.uid), {
      user: { id: user.uid, displayName: user.displayName },
      hours: [],
      travelOptions: [],
      clients: []
    })
  }

  public static async getHours(): Promise<Array<THourEntry>> {
    const docSnap = await getDoc(this.userRef)
    const { hours } = docSnap.data() as any

    return hours
      ? hours.map((entry: any) => {
          return { ...entry, date: entry.date.toDate() }
        })
      : []
  }

  public static async setHours(hours: THourEntry) {
    const existingHours = await this.getHours()
    await setDoc(this.userRef, { hours: [...existingHours, hours] }, { merge: true })
  }

  public static async deleteHourEntry(id: string) {
    const existingHours = await this.getHours()
    const indexToDelete = existingHours.findIndex((element) => element.id === id)
    const remainingHourEntries = existingHours.splice(indexToDelete, 1)

    await setDoc(this.userRef, { hours: remainingHourEntries }, { merge: true })
  }

  public static async addClient(clientName: string) {
    const existingClients = await this.getClients()
    await setDoc(
      this.userRef,
      { clients: [...existingClients, { name: clientName }] },
      { merge: true }
    )
  }

  public static async getTravelOptions() {
    const docSnap = await getDoc(this.userRef)
    // @ts-ignore
    const { travelOptions } = docSnap.data()
    return travelOptions ? travelOptions : []
  }

  public static async getClients() {
    const docSnap = await getDoc(this.userRef)
    // @ts-ignore
    const { clients } = docSnap.data()
    return clients ? clients : []
  }

  public static async addTravelOption(travelOption: TTravelOption) {
    const existingTravelOptions = await this.getTravelOptions()
    await setDoc(
      this.userRef,
      { travelOptions: [...existingTravelOptions, travelOption] },
      { merge: true }
    )
  }
}
