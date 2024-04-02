import { StyleSheet, View } from 'react-native';
import { TextFont } from '../../../Components/Text';
import { memo } from 'react';

export const Item = memo(({ title, content, color, backgroundColor }) => (
    <View
        style={[
            styles.body,
            {
                backgroundColor: backgroundColor,
            },
        ]}
    >
        <TextFont title={title} fs={18} color={color} fw={'bold'} />
        <TextFont title={content} fs={18} color={color} fw={'bold'} />
    </View>
));

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        shadowColor: 'black',
        elevation: 4,
        padding: 15,
        backgroundColor: 'white',
        borderRadius: 5,
        marginTop: 10,
        justifyContent: 'space-between',
    },
});
