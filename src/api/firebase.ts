import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { collection, addDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC82Fz-65X0hPMQfd8QObR8N09CBinaBKM',
  authDomain: 'aba-admin-abf9a.firebaseapp.com',
  projectId: 'aba-admin-abf9a',
  storageBucket: 'aba-admin-abf9a.appspot.com',
  messagingSenderId: '549472373713',
  appId: '1:549472373713:web:221613f24da06d9f4eeef0',
  measurementId: 'G-JRKHFNHEL9'
}

// const app = initializeApp(firebaseConfig)
// const db = getFirestore()
//
// export const createUser = async () => {
//   const docRef = await addDoc(collection(db, 'users'), {
//     userName: 'Yuri'
//   })
//
//   console.log('docRef.id', docRef.id)
// }
