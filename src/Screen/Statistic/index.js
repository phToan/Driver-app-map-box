import React, { useState, useEffect } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import HeaderBottomTab from '../../Components/HeaderBottomTab';
import { format } from 'date-fns';
import { Chart } from './components/chart';
import { instance } from '../../Api/instance';
import TimeReminder from './components/timerRender';
import dayjs from 'dayjs';
import { Item } from './components/item';
import color from '../../assets/color';
import { TextFont } from '../../Components/Text';

const Statistics = () => {
    const isFocus = useIsFocused();
    const [selectDate, setSelectDate] = useState(dayjs().startOf('day'));
    const [sum, setSum] = useState(0);
    const [completeOrder, setCompleteOrder] = useState(0);
    const [income, setIncome] = useState(0);
    const [date, setDate] = useState('');

    const fetchData = async (Day) => {
        await instance
            .get('/order/driver/day', {
                params: { day: Day },
            })
            .then((res) => {
                // console.log('res: ', res.data);
                let count = 0;
                let price = 0;
                res.data.data.rows.map((e) => {
                    if (e.status) {
                        count++;
                        price += e.orderData.price;
                    }
                });
                setIncome(price);
                setCompleteOrder(count);
                setSum(res.data.data.count);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        if (isFocus) {
            fetchData('2023-09-16');
            setDate(
                selectDate.date() +
                    '/' +
                    (selectDate.month() + 1) +
                    '/' +
                    selectDate.year()
            );
        }
    }, [isFocus]);

    const onSelectDate = (date) => {
        setSelectDate(date.startOf('day'));
        setDate(
            date.startOf('day').date() +
                '/' +
                (date.startOf('day').month() + 1) +
                '/' +
                date.startOf('day').year()
        );
    };
    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderBottomTab />
            <View style={{ padding: 10 }}>
                <TimeReminder
                    currentDay={selectDate}
                    onSelectDate={(date) => onSelectDate(date)}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    <Chart
                        text={sum}
                        percentage={sum > 0 ? (completeOrder / sum) * 100 : 0}
                    />
                    {sum > 0 && (
                        <>
                            <View
                                style={{
                                    marginTop: 30,
                                    width: '85%',
                                }}
                            >
                                <Item
                                    title={'Số đơn hoàn thành: '}
                                    content={completeOrder}
                                    color={color.GoodStatusGreen}
                                    backgroundColor={color.BackgroundGreen}
                                />
                                <Item
                                    title={'Số đơn bị hủy:'}
                                    content={sum - completeOrder}
                                    color={color.Red}
                                    backgroundColor={color.BackgroundRed}
                                />
                                <Item
                                    title={'Tỷ lệ thành công :'}
                                    content={`${(
                                        (completeOrder / sum) *
                                        100
                                    ).toFixed(2)}%`}
                                    color={color.DarkOrange}
                                    backgroundColor={color.BackgroundOrange}
                                />
                                <Item
                                    title={'Thu nhập trong ngày:'}
                                    content={`${income.toLocaleString(
                                        'vi-VN'
                                    )}đ`}
                                    backgroundColor={color.BackgroundPrimary}
                                    color={color.Primary}
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.detail}
                                activeOpacity={0.9}
                            >
                                <TextFont
                                    title={'Xem chi tiết'}
                                    fs={18}
                                    color={'white'}
                                    fw={'bold'}
                                />
                            </TouchableOpacity>
                        </>
                    )}
                </View>
                <View style={styles.selectedDateContainer}>
                    <Text style={styles.selectedDateText}>
                        Thống kê trong ngày: {date}
                    </Text>
                </View>
            </ScrollView>
        </View>
    );
};

export default Statistics;

const styles = StyleSheet.create({
    body: {
        alignItems: 'center',
        marginTop: 20,
    },
    detail: {
        backgroundColor: color.Red,
        paddingHorizontal: 35,
        paddingVertical: 10,
        borderRadius: 5,
        marginTop: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    week: {
        marginTop: 20,
    },
    day: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    date: {
        marginTop: 7,
        fontSize: 22,
        color: 'white',
    },
    todayText: {
        fontWeight: 'bold',
        fontSize: 22,
        color: 'blue',
    },
    selectedDateContainer: {
        marginVertical: 40,
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedDateText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    selectedText: {
        fontWeight: 'bold',
        color: 'red',
    },
    text: {
        fontSize: 18,
        color: 'black',
    },
    textChild: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
