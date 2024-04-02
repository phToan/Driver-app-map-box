import * as Location from 'expo-location';
import { latitude, longitude } from '../Redux/Reducers/senderSlice'

export const getLocation = async (dispatch) => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return
    }
    let location = await Location.getCurrentPositionAsync();
    console.log('lat: ', location.coords.latitude)
    dispatch(latitude(parseFloat(location.coords.latitude)))
    dispatch(longitude(location.coords.longitude))
}