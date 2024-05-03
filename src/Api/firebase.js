import { getDatabase, ref, push, set, get, onValue, off } from 'firebase/database';
import firebaseDB from '../../firebaseConfig';

export const initOrder = async () => {
    const db = getDatabase(firebaseDB);
    const databaseRef = ref(db);
    onValue()
    try {
        const res = await get(databaseRef);
        if (res.exists()) {
            return res.val().order;
        } else {
            console.log('No data available');
        }
    } catch (error) {
        console.error('Error getting data:', error);
    }
};
