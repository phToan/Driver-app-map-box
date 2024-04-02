import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    cast: {
        fontSize: 16,
        fontWeight: '500',
        color: 'green',
    },
    detailAddressArea: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        // flex: 1,
        marginTop: 20,
    },
    bt_detail_order: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 10,
        borderTopWidth: 0.5,
        marginTop: 20,
    },
    detailAddress: {
        borderWidth: 0.5,
        borderColor: 'green',
        borderRadius: 10,
        height: 100,
        padding: 10,
        width: '70%',
        marginHorizontal: 5,
    },
    text: {
        fontSize: 16,
        fontWeight: '500',
    },
    labelLocate: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 10,
    },
    labelAddress: {
        fontSize: 14,
        marginTop: 5,
        fontWeight: '500',
    },
    payment: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
    },
    body: {
        flex: 10,
        marginTop: 10,
        backgroundColor: 'white',
        padding: 10,
    },
    _body_title: {
        borderBottomWidth: 0.5,
        paddingBottom: 5,
    },

    address: {
        flexDirection: 'row',
        marginTop: 20,
        justifyContent: 'space-between',
    },

    t_address: {
        fontSize: 16,
        fontWeight: 'bold',
        flex: 3,
    },
    footer: {
        flex: 1,
        marginTop: 5,
        padding: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    map: {
        height: 200,
        backgroundColor: 'white',
        marginTop: 10,
        borderColor: 'darkorange',
        borderWidth: 0.5,
    },
});
