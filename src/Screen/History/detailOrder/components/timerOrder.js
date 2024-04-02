import { renderTime } from '../../../../Helper/rederTime';
import { View, Text } from 'react-native';

export const TimerOrder = ({ label, timer }) => (
    <View
        style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
        }}
    >
        <Text style={{ color: '#3c3c38' }}>{label}</Text>
        <Text style={{ color: '#3c3c38' }}>{renderTime(timer)}</Text>
    </View>
);
