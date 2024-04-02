import React from 'react';
import { View, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { Header } from '../../Components/Header';
import { TextFont } from '../../Components/Text';
import { useRoute } from '@react-navigation/native';
import color from '../../assets/color';
import { ArrowHeadIcon, LocationMapIcon } from '../../assets/Icons';

const Steps = ({ navigation }) => {
    const { distance, duration, route } = useRoute().params;
    console.log('route: ', route.legs[0].steps[0].intersections);
    const exchangeDistance = (number) => {
        const integerPart = Math.floor(Math.abs(number));
        const integerPartString = integerPart.toString();
        if (integerPartString.length >= 4) {
            return (number / 1000).toFixed(1) + ' km';
        }
        return number.toFixed(0) + ' m';
    };

    return (
        <SafeAreaView style={styles.container}>
            <Header
                onClickReturn={() => {
                    navigation.goBack();
                }}
                title="Các bước"
            />
            <View style={styles.body}>
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
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.steps}
                >
                    {route.legs[0].steps.map((item, index) => {
                        return (
                            <View key={index} style={styles.itemStep}>
                                <ArrowHeadIcon
                                    height={30}
                                    width={35}
                                    style={styles.icon}
                                />
                                <View style={styles.item}>
                                    <TextFont
                                        title={`${item.maneuver.instruction}`}
                                        fs={18}
                                        mb={15}
                                        fw={'500'}
                                        color={'black'}
                                    />
                                    <View style={styles.distance}>
                                        <TextFont
                                            title={exchangeDistance(
                                                item.distance
                                            )}
                                            fs={16}
                                            color={color.silver}
                                        />
                                        <View style={styles.line} />
                                    </View>
                                </View>
                            </View>
                        );
                    })}
                    <View style={styles.iconMap}>
                        <LocationMapIcon height={45} width={45} />
                        <TextFont
                            title={'Bạn đã đến địa điểm đích'}
                            color={color.StatusGreen}
                            fs={18}
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

export default Steps;

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    itemStep: {
        marginBottom: 25,
        flexDirection: 'row',
        flex: 1,
    },
    icon: {
        marginHorizontal: 20,
    },
    iconMap: {
        marginBottom: 30,
        marginHorizontal: 20,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    item: {
        flex: 1,
    },
    line: {
        borderBottomWidth: 0.5,
        width: '100%',
        position: 'absolute',
        left: '15%',
        bottom: '40%',
        borderColor: color.silver,
    },
    distance: {
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    route: {
        flexDirection: 'row',
        marginBottom: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
        backgroundColor: 'white',
        padding: 15,
    },
    body: {
        flex: 1,
    },
    steps: {
        padding: 10,
        marginBottom: 10,
    },
});
