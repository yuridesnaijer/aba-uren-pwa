import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore'
import { THourEntry } from '@/types/THourEntry'
import { TTravelOption } from '@/views/WriteHoursView.vue'

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
  private static app
  private static db
  private static data
  private static userRef

  public static async initializeUser(user: any) {
    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)

    console.log('initalize')
    this.userRef = doc(this.db, 'users', '/' + user.uid)
    const docSnap = await getDoc(this.userRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
      this.data = docSnap.data()
    } else {
      console.log('No such document!')
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

  public static async getHours() {
    const docSnap = await getDoc(this.userRef)
    const { hours } = docSnap.data()
    return hours ? hours : []
  }

  public static async setHours(hours: THourEntry) {
    const existingHours = await this.getHours()
    await setDoc(this.userRef, { hours: [...existingHours, hours] }, { merge: true })
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
    const { travelOptions } = docSnap.data()
    console.log('travelOptions', travelOptions)
    return travelOptions ? travelOptions : []
  }

  public static async getClients() {
    const docSnap = await getDoc(this.userRef)
    const { clients } = docSnap.data()
    return clients ? clients : []
  }

  public static async addTravelOption(travelOption: TTravelOption) {
    const existingTravelOptions = await this.getTravelOptions()
    console.log('existingTravelOptions', existingTravelOptions)
    await setDoc(
      this.userRef,
      { travelOptions: [...existingTravelOptions, travelOption] },
      { merge: true }
    )
  }
}
