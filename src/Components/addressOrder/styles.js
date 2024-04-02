import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    sender: {
        flexDirection: 'row',
        padding: 10,
        borderWidth: 0.5,
        marginTop: 10,
        borderRadius: 5,
        flex: 1,
    },
    infor: {
        marginHorizontal: 10,
        flex: 9,
    },
    infor_title: {
        fontSize: 15,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    infor_address: {
        fontWeight: '500',
        fontSize: 15,
        marginBottom: 3,
    },
    infor_blank: {
        color: 'blue',
        fontWeight: '500',
    },
    star: {
        color: 'red',
        fontSize: 16,
    },
    express: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        marginTop: 10,
        borderBottomColor: 'orange',
        borderBottomWidth: 0.5,
    },
});
