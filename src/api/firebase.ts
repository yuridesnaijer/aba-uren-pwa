import { initializeApp } from 'firebase/app'
import { getFirestore, doc, getDoc, setDoc, collection } from 'firebase/firestore'
import { THourEntry } from '@/types/THourEntry'

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

  // public GetHours(): THourEntry[] {},
  public static async initializeUser(user: any) {
    // console.log('docSnap', docSnap)
    this.app = initializeApp(firebaseConfig)
    this.db = getFirestore(this.app)

    console.log('user', user)
    const docRef = doc(this.db, 'user', '/' + user.uid)
    const docSnap = await getDoc(docRef)

    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data())
    } else {
      // docSnap.data() will be undefined in this case
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
}
