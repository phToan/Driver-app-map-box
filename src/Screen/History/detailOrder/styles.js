import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    component: {
        flex: 1,
    },
    body: {
        flex: 8,
        padding: 10,
        backgroundColor: 'white',
    },
    infoTransferTitle: { fontSize: 16, fontWeight: '500' },
    footer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
    },
    labelOrder: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 5,
    },
    property: { color: '#3c3c38', marginTop: 5 },
    statusTitle: {
        color: '#26ab9a',
        marginLeft: 5,
    },
    _body_delivery: {
        backgroundColor: 'white',
        padding: 10,
        borderWidth: 0.5,
        marginTop: 20,
        borderRadius: 5,
        borderColor: 'orange',
    },
    distance: {
        backgroundColor: 'white',
        marginTop: 10,
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomWidth: 0.3,
    },
    t_distance: {
        fontSize: 16,
        fontWeight: '500',
        marginHorizontal: 10,
    },
    order: {
        backgroundColor: 'white',
        marginTop: 20,
        borderWidth: 0.5,
        borderColor: 'green',
        borderRadius: 5,
        padding: 10,
    },
    unit: {
        textDecorationLine: 'underline',
        color: 'red',
    },
    t_order: {
        fontWeight: '500',
        fontSize: 16,
        marginLeft: 10,
    },
    payment: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    t_payment: {
        fontSize: 16,
        fontWeight: '500',
    },
    id_order: {
        backgroundColor: 'white',
        marginTop: 10,
    },
    _id_order_item: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
});
