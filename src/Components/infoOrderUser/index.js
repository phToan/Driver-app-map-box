import { UserIcon } from '../../assets/Icons';
import { FontAwesome } from '../../assets/icon';
import { View, Text, StyleSheet } from 'react-native';

export const InfoOrderUser = ({ label, name }) => (
    <>
        <Text style={styles.labelLocate}>Thông tin {label}</Text>
        <View style={styles.user}>
            <UserIcon height={40} width={40} color={'black'} />
            <View style={{ marginLeft: 10 }}>
                <Text style={styles.name}>{name}</Text>
                <Text>{label}</Text>
            </View>
        </View>
    </>
);

const styles = StyleSheet.create({
    user: {
        flexDirection: 'row',
        marginHorizontal: 10,
        marginVertical: 10,
        alignItems: 'center',
    },
    labelLocate: {
        fontWeight: 'bold',
        fontSize: 16,
        marginTop: 30,
    },
    name: {
        fontSize: 16,
        fontWeight: '500',
    },
});
