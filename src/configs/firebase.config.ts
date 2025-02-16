import { EnvConfigs } from '@src/EnvConfigs'
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get, child } from 'firebase/database'

const firebaseApp = initializeApp({
    apiKey: EnvConfigs.FIREBASE_WEB_API_KEY,
    databaseURL: EnvConfigs.FIREBASE_DB_URL,
    projectId: EnvConfigs.FIREBASE_PROJECT_ID,
})

const database = getDatabase(firebaseApp)

export async function fetchDataFromRealtimeDatabase() {
    try {
        const dbRef = ref(database)
        const snapshot = await get(child(dbRef, 'devices'))

        if (snapshot.exists()) {
            const data = snapshot.val()
            console.log('Data from Realtime Database:', data)
            return data
        } else {
            console.log('Data not found')
            return null
        }
    } catch (error) {
        console.error('_fetchDataFromRealtimeDatabase_exception:', error)
        return null
    }
}
