import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    payment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopWidth: 0.5,
        marginTop: 20,
    },
    form: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    t_payment: {
        fontSize: 16,
        fontWeight: '500',
    },
    cast: {
        fontSize: 16,
        fontWeight: '500',
        color: 'green',
    },
    labelAddress: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '500',
    },
    body: {
        flex: 5,
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
        paddingBottom: 20,
    },
    _body_title: {
        borderBottomWidth: 0.5,
        paddingBottom: 5,
    },
    address: {
        flexDirection: 'row',
        marginTop: 10,
        justifyContent: 'space-between',
        gap: 10,
    },
    t_address: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 3,
    },
    footer: {
        flex: 0.5,
        marginTop: 10,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    map: {
        height: 170,
        backgroundColor: 'white',
        marginTop: 10,
        borderColor: 'darkorange',
        borderWidth: 0.5,
    },
    button: {
        marginHorizontal: '15%',
        gap: 10,
        marginTop: 10,
    },
});
