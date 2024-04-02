import React, { useState } from 'react';
import {
    View,
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    ScrollView,
} from 'react-native';
import HeaderBottomTab from '../../Components/HeaderBottomTab';
import { format } from 'date-fns';
import Chart from './components/chart';
import { instance } from '../../Api/instance';
import TimeReminder from './components/timerRender';
import dayjs from 'dayjs';
import { Item } from './components/item';
import color from '../../assets/color';
import { TextFont } from '../../Components/Text';

const Statistics = () => {
    const [selectedDate, setSelectedDate] = React.useState(null);
    const [sum, setSum] = React.useState(0);
    const [completeOr, setcompleteOr] = React.useState(0);
    const [income, setIncome] = React.useState(0);
    const [display, setDisplay] = React.useState(false);
    const [date, setDate] = React.useState('');

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
                setcompleteOr(count);
                setSum(res.data.data.count);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    React.useEffect(() => {
        var ngayHienTai = new Date();
        var ngay = ngayHienTai.getDate();
        var thang = ngayHienTai.getMonth() + 1;
        var nam = ngayHienTai.getFullYear();
        const date = 2023 + '-' + '0' + 8 + '-' + ngay;
        fetchData('2023-09-16');
        setDisplay(true);
        setDate(16 + '/' + '0' + thang + '/' + nam);
    }, []);

    const [selectDate, setSelectDate] = useState(dayjs().startOf('day'));
    const [pickDateModalVisible, setPickDateModalVisible] = useState(false);
    const onSelectDate = (date) => {
        setSelectDate(date.startOf('day'));
        console.log('date: ', date);
    };
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <HeaderBottomTab />
            <View style={{ padding: 10 }}>
                <TimeReminder
                    currentDay={selectDate}
                    onSelectDate={(date) => onSelectDate(date)}
                />
            </View>

            <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.body}>
                    <Chart text={sum} percentage={(completeOr / sum) * 100} />
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
                                    content={completeOr}
                                    color={color.GoodStatusGreen}
                                    backgroundColor={color.BackgroundGreen}
                                />
                                <Item
                                    title={'Số đơn bị hủy:'}
                                    content={sum - completeOr}
                                    color={color.Red}
                                    backgroundColor={color.BackgroundRed}
                                />
                                <Item
                                    title={'Tỷ lệ thành công :'}
                                    content={`${(
                                        (completeOr / sum) *
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
                {selectedDate && (
                    <View style={styles.selectedDateContainer}>
                        <Text style={styles.selectedDateText}>
                            Thống kê trong ngày:{' '}
                            {format(selectedDate, 'dd/MM/yyyy')}
                        </Text>
                    </View>
                )}

                {display ? (
                    <View style={styles.selectedDateContainer}>
                        <Text style={styles.selectedDateText}>
                            Thống kê trong ngày: {date}
                        </Text>
                    </View>
                ) : null}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Statistics;

const styles = StyleSheet.create({
    body: {
        // flex: 5,
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
