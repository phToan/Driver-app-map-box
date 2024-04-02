import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingBottom: 15,
        backgroundColor: 'white',
        height: 80,
        alignItems: 'flex-end',
        elevation: 3,
        borderBottomWidth: 0.5,
        borderColor: '#c1c1c1',
    },
    icon: {
        flex: 1,
    },
    title: {
        flex: 5,
        textAlign: 'center',
        fontSize: 18,
        fontWeight: 'bold',
    },
});
