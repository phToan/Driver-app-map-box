import React, { useState, useEffect } from 'react';
import MapboxGL from '@rnmapbox/maps';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
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

const accessToken =
    'pk.eyJ1IjoicGh0b2FuIiwiYSI6ImNsczhxaWo2ajAwcDkyaHBlZHc4emZ4M3EifQ.crMxOzzk-VaIGZ3x8UlV4Q';
MapboxGL.setAccessToken(accessToken);
const DirectionMap = ({ navigation }) => {
    const [directionData, setDirectionData] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(15);
    const [index, setIndex] = useState(0);
    const [route, setRoute] = useState({});
    const [distance, setDistance] = useState(0);
    const [duration, setDuration] = useState(0);
    const origin = [105.7854364, 20.9787633];
    const destination = [105.82884520100004, 21.065551010000036];
    useEffect(() => {
        fetchDirectionData();
    }, []);

    const fetchDirectionData = async () => {
        try {
            const response = await fetch(
                `https://api.mapbox.com/directions/v5/mapbox/driving/${origin[0]},${origin[1]};${destination[0]},${destination[1]}?alternatives=true&geometries=geojson&overview=full&steps=true&language=vi&access_token=${accessToken}`
            );
            const data = await response.json();
            setDirectionData(data.routes[index].geometry);
            setDistance(data.routes[index].distance);
            setDuration(data.routes[index].duration);
            setRoute(data.routes[index]);
        } catch (error) {
            console.error('Error fetching direction data:', error);
        }
    };
    const onPressExit = () => {
        navigation.goBack();
    };

    return (
        <View style={{ flex: 1 }}>
            <MapboxGL.MapView
                style={{ flex: 5 }}
                zoomEnabled={true}
                logoEnabled={false}
            >
                <MapboxGL.Camera
                    zoomLevel={zoomLevel}
                    centerCoordinate={origin}
                    pitch={60}
                    animationDuration={0}
                />
                {directionData && (
                    <MapboxGL.ShapeSource
                        id="directionSource"
                        shape={directionData}
                    >
                        <MapboxGL.LineLayer
                            id="directionLine"
                            style={{ lineWidth: 6, lineColor: '#1d68d8' }}
                        />
                    </MapboxGL.ShapeSource>
                )}
                <MapboxGL.PointAnnotation id="marker1" coordinate={origin}>
                    <View style={styles.locateCurrent}>
                        <DotIcon width={20} height={20} color={'#1558bb'} />
                    </View>
                </MapboxGL.PointAnnotation>
                <MapboxGL.PointAnnotation id="marker1" coordinate={destination}>
                    <View>
                        <LocationIcon width={30} height={30} color={'red'} />
                    </View>
                </MapboxGL.PointAnnotation>
            </MapboxGL.MapView>

            <View style={styles.zoomLevelArea}>
                <TouchableOpacity style={styles.icon} onPress={onPressExit}>
                    <ArrowLeftIcon width={30} height={30} color={'black'} />
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
            <View style={styles.footer}>
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
                <View style={styles.buttonArea}>
                    <Button
                        colorTitle={'white'}
                        colorBackground={color.Blue}
                        onPress={() => {}}
                        title={'Bắt đầu'}
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
            </View>
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
        height: '16%',
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
