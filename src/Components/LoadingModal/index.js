import {
    Modal,
    Text,
    View,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import color from '../../assets/color';

const LoadingModal = ({ visible }) => {
    return (
        <Modal visible={visible} transparent={true}>
            <View style={styles.background}>
                <View style={styles.component}>
                    <ActivityIndicator
                        size={'large'}
                        color={color.darkorange}
                    />
                    <Text style={styles.indicator}> Loading...</Text>
                </View>
            </View>
        </Modal>
    );
};

export default LoadingModal;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(00,00,00,.5)', //trong suot 50%
        justifyContent: 'center',
        alignItems: 'center',
    },
    indicator: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: '500',
    },
    component: {
        width: '70%',
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
        height: '12%',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    header: {
        paddingBottom: 15,
    },
    body: {},
    footer: {
        width: '30%',
        backgroundColor: 'orange',
        borderRadius: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
        marginTop: 15,
    },
    message: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'orange',
    },
});
