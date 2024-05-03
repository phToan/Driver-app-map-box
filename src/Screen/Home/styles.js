import { StyleSheet } from 'react-native';
import color from '../../assets/color';
export const styles = StyleSheet.create({
    componentBlank: {
        marginTop: '50%',
    },
    titleOffline: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    titleBlank: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
    },
    component: {
        flex: 1,
        marginBottom: 5,
    },
    itemSelected: {
        padding: 10,
        // backgroundColor: color.BackgroundGreen,
    },
    Image: {
        width: '70%',
        height: 250,
        marginBottom: 30,
    },
    _not_list: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
});
