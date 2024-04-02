import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    t_shipping: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    under: {
        flexDirection: 'row',
        borderTopWidth: 0.5,
        marginTop: 10,
        paddingTop: 10,
        borderColor: '#bec0c2',
    },
    footer: {
        borderTopWidth: 0.5,
        borderColor: '#bec0c2',
        padding: 10,
        marginTop: 10,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignContent: 'center',
    },
    body: {
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 15,
        borderRadius: 10,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
    },
    image: {
        height: 50,
        width: 50,
    },
    icon: {
        flex: 1,
    },
    title: {
        flex: 5,
    },
    t_money: {
        color: 'red',
        marginTop: 5,
    },
    t_initmoney: {
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 16,
    },
    t_locate: {
        marginLeft: 10,
    },
    line: {
        borderLeftWidth: 1,
        height: 30,
        position: 'absolute',
        top: '16%',
        left: '10.1%',
        borderColor: '#bec0c2',
    },
});
