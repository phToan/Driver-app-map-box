import { FlatList, StyleSheet, Image, View, Text } from 'react-native';
import { OrderItem } from '../orderItem';
import { ItemSeparatorView } from '../itemSeparatorView';
import { BlankDataImage } from '../../assets/images';
import color from '../../assets/color';
import { memo } from 'react';

export const ListOrders = memo(({ data, onPress }) => {
    return (
        <FlatList
            style={{ padding: 10, marginBottom: 5 }}
            showsVerticalScrollIndicator={false}
            data={data}
            renderItem={({ item }) => (
                <OrderItem item={item} onPress={onPress} />
            )}
            keyExtractor={(item) => item.id}
            // ItemSeparatorComponent={() => <ItemSeparatorView />}
            ListEmptyComponent={() => (
                <View style={styles._not_list}>
                    <Image source={BlankDataImage} style={styles.Image} />
                    <Text style={styles.titleOffline}>Không có đơn hàng</Text>
                    <Text>Hãy chuyển sang chế độ Trực tuyến để nhận đơn</Text>
                </View>
            )}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
        />
    );
});

const styles = StyleSheet.create({
    _not_list: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 150,
        paddingBottom: 250,
        flex: 1,
        backgroundColor: color.base,
    },
    Image: {
        width: '70%',
        height: 250,
        marginBottom: 30,
    },
    titleOffline: {
        fontWeight: 'bold',
        fontSize: 16,
    },
});
