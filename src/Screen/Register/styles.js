import { StyleSheet } from "react-native"
export const mainStyles = StyleSheet.create({
    component: {
        flex: 1
    },
    error: {
        color: 'red',
        marginHorizontal: 20
    },
    body: {
        flex: 7,
        backgroundColor: 'white',
        padding: 15
    },
    footer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white'
    },
})

export const passwordStyles = StyleSheet.create({
    component: {
        flex: 1,
        backgroundColor: 'white'
    },
    error: {
        color: 'red',
        marginHorizontal: 20
    },
    body: {
        backgroundColor: 'white',
        flex: 6,
        padding: 15
    },
    footer: {
        flex: 1,
        justifyContent: 'center'
    },
    t_condition: {
        textAlign: 'center',
        marginHorizontal: 20
    },
})