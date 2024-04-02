import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
export const Map = ({ lat, lng, delta }) =>
    lat &&
    lng && (
        <MapView
            style={{ flex: 1 }}
            region={{
                latitude: lat,
                longitude: lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            }}
        >
            <Marker
                coordinate={{
                    latitude: lat,
                    longitude: lng,
                }}
            />
        </MapView>
    );
