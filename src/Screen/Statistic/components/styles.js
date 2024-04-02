import { StyleSheet, Dimensions } from 'react-native';
import color from '../../../assets/color';

const windowDimensions = {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
};

export const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    dayItem: {
        height: 88,
        width: 72,
        padding: 12,
        borderWidth: 1,
        borderRadius: 4,
        borderColor: color.InputGray2,
        alignItems: 'center',
    },
    time: {
        gap: 10,
        paddingBottom: 16,
    },
    headerTime: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    iconNextWeek: {
        width: windowDimensions.width * 0.064,
        height: windowDimensions.width * 0.064,
        zIndex: 999,
    },
    driver: {
        width: 12,
    },
    select: {
        borderColor: color.BlueColor2,
        backgroundColor: color.BlueColor3,
    },
    iconDown: {
        width: 12,
        height: 12,
    },
    textStyle: {
        marginBottom: 18,
    },
    dot: {
        width: windowDimensions.width * 0.025,
        height: windowDimensions.width * 0.025,
        borderRadius: windowDimensions.width * 0.025,
        backgroundColor: color.BlueColor2,
        margin: 5,
    },
    nightDot: {
        width: windowDimensions.width * 0.025,
        height: windowDimensions.width * 0.025,
        borderRadius: windowDimensions.width * 0.025,
        backgroundColor: color.GrayMedium,
        margin: 5,
    },
});
