import { View, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '../../../../assets/icon';

export const StatusLabel = ({ title1, title2, iconName }) => (
    <View style={styles._body_status}>
        <View>
            <Text style={styles.t_status}>{title1}</Text>
            <Text style={styles.title2}>{title2}</Text>
        </View>
        <MaterialCommunityIcons name={iconName} size={40} color={'yellow'} />
    </View>
);

const styles = StyleSheet.create({
    t_status: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 16,
    },
    title2: {
        color: 'white',
        marginTop: 5,
    },
    _body_status: {
        height: 90,
        backgroundColor: '#26ab9a',
        alignItems: 'center',
        paddingHorizontal: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
});
