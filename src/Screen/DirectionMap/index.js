import React, { useState, useEffect, useContext } from 'react';
import MapboxGL from '@rnmapbox/maps';
import {
    TouchableOpacity,
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import {
    DotIcon,
    ArrowLeftIcon,
    LocationIcon,
    ListPointers,
    ArrowTop,
} from '../../assets/Icons';
import color from '../../assets/color';
import { TextFont } from '../../Components/Text';
import { Button } from '../../Components/Button';
import { NameScreen } from '../../Constants/nameScreen';
import { useRoute } from '@react-navigation/native';
import Geolocation from '@react-native-community/geolocation';
import NotificationModal from '../../Components/notificationModal';
import AppContext from '../../Context';

const accessToken =
    'pk.eyJ1IjoicGh0b2FuIiwiYSI6ImNsczhxaWo2ajAwcDkyaHBlZHc4emZ4M3EifQ.crMxOzzk-VaIGZ3x8UlV4Q';
MapboxGL.setAccessToken(accessToken);

const DirectionMap = ({ navigation }) => {
    const routes = useRoute();
    const { visiblePopup, setVisiblePopup } = useContext(AppContext);
    const { latDestination, longDestination } = routes?.params;
    const [directionData, setDirectionData] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(15);
    const [index, setIndex] = useState(0);
    const [route, setRoute] = useState({});
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [start, setStart] = useState(false);
    const [endDirection, setEndDirection] = useState(false);
    const [latCurrent, setLatCurrent] = useState(null);
    const [longCurrent, setLongCurrent] = useState(null);
    const [coordinates, setCoordinates] = useState([]);
    Geolocation.getCurrentPosition((info) => {
        setLatCurrent(info.coords.latitude);
        setLongCurrent(info.coords.longitude);
    });

    const destination = [longDestination, latDestination];
    const origin = [longCurrent, latCurrent];
    useEffect(() => {
        if (latCurrent && longCurrent) {
            fetchDirectionData();
        }
    }, [longCurrent, latCurrent]);

    const fetchDirectionData = async () => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?alternatives=true&geometries=geojson&overview=full&steps=true&language=vi&access_token=${accessToken}`
            );
            const data = await response.json();
            setDirectionData(data.routes[index].geometry);
            setDistance(data.routes[index].distance);
            setDuration(data.routes[index].duration);
            setCoordinates(data.routes[index]?.geometry?.coordinates);
            setRoute(data.routes[index]);
        } catch (error) {
            console.error('Error fetching direction data:', error);
        }
    };

    const onPressExit = () => {
        navigation.goBack();
    };

    useEffect(() => {
        if (start) {
            const interval = setInterval(() => {
                setCurrentIndex(
                    (prevIndex) => (prevIndex + 1) % coordinates.length
                );
            }, 100);
            if (currentIndex === coordinates.length - 1) {
                console.log('Đã đến điểm cuối');
                setStart(false);
                setEndDirection(true);
                clearInterval(interval);
            }
            return () => clearInterval(interval);
        }
    }, [coordinates, currentIndex, start]);

    const onStart = () => {
        if (!start) {
            setStart(true);
        } else {
            setCurrentIndex(coordinates.length - 1);
            setStart(false);
            setEndDirection(true);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <NotificationModal
                Message={'Đơn hàng này đã bị huỷ. Vui lòng nhận đơn hàng khác!'}
                Visible={visiblePopup}
                onHide={() => {
                    setVisiblePopup(false);
                    navigation.navigate(NameScreen.BOTTOM_TAB);
                }}
            />
            {longCurrent && latCurrent && directionData ? (
                <>
                    <MapboxGL.MapView
                        style={{ flex: 5 }}
                        zoomEnabled={true}
                        logoEnabled={false}
                    >
                        <MapboxGL.Camera
                            zoomLevel={zoomLevel}
                            centerCoordinate={coordinates[currentIndex]}
                            pitch={60}
                            animationDuration={0}
                        />
                        <MapboxGL.ShapeSource
                            id="directionSource"
                            shape={directionData}
                        >
                            <MapboxGL.LineLayer
                                id="directionLine"
                                style={{
                                    lineWidth: 6,
                                    lineColor: '#1d68d8',
                                }}
                            />
                        </MapboxGL.ShapeSource>
                        <MapboxGL.PointAnnotation
                            id="marker1"
                            coordinate={coordinates[currentIndex]}
                        >
                            <View style={styles.locateCurrent}>
                                <DotIcon
                                    width={20}
                                    height={20}
                                    color={'#1558bb'}
                                />
                            </View>
                        </MapboxGL.PointAnnotation>
                        <MapboxGL.PointAnnotation
                            id="marker2"
                            coordinate={destination}
                        >
                            <View>
                                <LocationIcon
                                    width={30}
                                    height={30}
                                    color={'red'}
                                />
                            </View>
                        </MapboxGL.PointAnnotation>
                    </MapboxGL.MapView>

                    <View style={styles.zoomLevelArea}>
                        <TouchableOpacity
                            style={styles.icon}
                            onPress={onPressExit}
                        >
                            <ArrowLeftIcon
                                width={30}
                                height={30}
                                color={'black'}
                            />
                        </TouchableOpacity>
                        <View style={styles.zoom}>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setZoomLevel((prev) => prev - 1)}
                            >
                                <Text
                                    style={[
                                        styles.zoomLevel,
                                        { paddingHorizontal: 15 },
                                    ]}
                                >
                                    -
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                activeOpacity={0.8}
                                onPress={() => setZoomLevel((prev) => prev + 1)}
                            >
                                <Text
                                    style={[
                                        styles.zoomLevel,
                                        { paddingHorizontal: 12 },
                                    ]}
                                >
                                    +
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View
                        style={[
                            styles.footer,
                            {
                                height: endDirection ? '8%' : '16%',
                            },
                        ]}
                    >
                        <View style={styles.route}>
                            <TextFont
                                fs={22}
                                color={color.Orange}
                                title={`${(distance / 1000).toFixed(1)} km`}
                            />
                            <TextFont
                                fs={22}
                                title={` (${(duration / 60).toFixed(0)} phút)`}
                                color={color.StatusGreen}
                            />
                        </View>
                        {!endDirection && (
                            <View style={styles.buttonArea}>
                                <Button
                                    colorTitle={'white'}
                                    colorBackground={color.Blue}
                                    onPress={onStart}
                                    title={!start ? 'Bắt đầu' : 'Kết thúc'}
                                    icon={() => {
                                        return (
                                            <ArrowTop
                                                height={20}
                                                width={20}
                                                color="white"
                                            />
                                        );
                                    }}
                                />
                                <Button
                                    colorTitle={color.RoyalBlue}
                                    colorBackground={color.white}
                                    onPress={() => {
                                        navigation.navigate(
                                            NameScreen.STEPS_SCREEN,
                                            (params = {
                                                distance,
                                                duration,
                                                route,
                                            })
                                        );
                                    }}
                                    title={'Các bước'}
                                    icon={() => {
                                        return (
                                            <ListPointers
                                                height={30}
                                                width={30}
                                                color={color.RoyalBlue}
                                            />
                                        );
                                    }}
                                />
                            </View>
                        )}
                    </View>
                </>
            ) : (
                <ActivityIndicator></ActivityIndicator>
            )}
        </View>
    );
};

export default DirectionMap;

const styles = StyleSheet.create({
    zoom: {
        flexDirection: 'row',
        gap: 10,
    },
    buttonArea: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
        marginTop: 15,
    },
    route: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 5,
    },
    zoomLevel: {
        fontSize: 30,
        backgroundColor: 'white',
        paddingHorizontal: 12,
        paddingVertical: 5,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
    },
    zoomLevelArea: {
        position: 'absolute',
        flexDirection: 'row',
        top: '5%',
        justifyContent: 'space-between',
        width: '100%',
        paddingHorizontal: 10,
    },
    footer: {
        position: 'absolute',
        padding: 18,
        backgroundColor: 'white',
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        width: '100%',
        bottom: 1,
        // height: '16%',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
    },
    icon: {
        padding: 10,
        backgroundColor: 'white',
        borderRadius: 100,
        shadowOffset: { width: 1, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        shadowColor: 'black',
        elevation: 4,
    },
    locateCurrent: {
        backgroundColor: 'rgba(23, 100, 216, 0.3)',
        borderRadius: 100,
        padding: 5,
    },
});
