import {
    FlatList,
    Text,
    TouchableOpacity,
    View,
    StyleSheet,
    Dimensions,
} from 'react-native';
import { TextFont } from '../../../Components/Text';
import { styles } from './styles';
import { memo, useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons } from '../../../assets/icon';

import dayjs from 'dayjs';
import { LeftIcon, RightICon } from '../../../assets/Icons';

const getWeekDates = (date, currentWeek) => {
    const today = dayjs(date);
    const startOfWeek = today.startOf('week').add(currentWeek - 1, 'week');
    const endOfWeek = today.endOf('week').add(currentWeek - 1, 'week');
    return { startOfWeek, endOfWeek };
};

const TimeReminder = ({ currentDay, onSelectDate }) => {
    const [currentWeek, setCurrentWeek] = useState(1);
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const scrollRef = useRef(null);

    const goToPreviousWeek = () => {
        setCurrentWeek(currentWeek - 1);
    };

    const goToNextWeek = () => {
        setCurrentWeek(currentWeek + 1);
    };
    const { startOfWeek, endOfWeek } = getWeekDates(currentDay, currentWeek);
    const data = [];
    let currentDate = startOfWeek;
    while (
        currentDate.isBefore(endOfWeek) ||
        currentDate.isSame(endOfWeek, 'day')
    ) {
        const dayOfWeek = daysOfWeek[currentDate.day()];

        const isFutureDate =
            currentDate.startOf('day') >= dayjs().startOf('day');

        data.push({
            day: currentDate.startOf('day'),
            dayOfWeek,
            isFutureDate: isFutureDate,
        });
        currentDate = currentDate.add(1, 'day');
    }
    useEffect(() => {
        const itemScroll = data?.findIndex(
            (item) => item.day.toISOString() === currentDay.toISOString()
        );
        if (!itemScroll) return;
        scrollRef?.current?.scrollToIndex({
            index: itemScroll,
            animated: true,
        });
    }, [currentDay]);

    const renderSeparator = () => <View style={styles.driver} />;

    return (
        <>
            <View style={styles.time}>
                <View style={styles.headerTime}>
                    <TouchableOpacity
                        onPress={goToPreviousWeek}
                        style={styles.iconNextWeek}
                    >
                        <LeftIcon height={25} width={25} color="black" />
                    </TouchableOpacity>
                    <View style={styles.row}>
                        <TextFont
                            fs={16}
                            fw={'bold'}
                            title={
                                daysOfWeek[currentDay.day()] +
                                ' ' +
                                currentDay.format('MMMM DD, YYYY')
                            }
                        />
                    </View>
                    <TouchableOpacity
                        onPress={goToNextWeek}
                        style={styles.iconNextWeek}
                    >
                        <RightICon height={25} width={25} color={'black'} />
                    </TouchableOpacity>
                </View>
                <FlatList
                    ref={scrollRef}
                    initialScrollIndex={0}
                    onScrollToIndexFailed={(info) => {
                        const wait = new Promise((resolve) =>
                            setTimeout(resolve, 500)
                        );
                        wait.then(() => {
                            scrollRef.current?.scrollToIndex({
                                index: info.index,
                                animated: true,
                            });
                        });
                    }}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => onSelectDate(item.day)}
                            style={[
                                styles.dayItem,
                                item.day.toISOString() ===
                                    currentDay.toISOString() && styles.select,
                            ]}
                        >
                            <TextFont
                                fs={16}
                                color={'black'}
                                title={item.day.date()}
                                fw={'600'}
                            />
                            <TextFont
                                m={5}
                                fs={15}
                                color={'black'}
                                title={item.dayOfWeek}
                            />
                            {item.isFutureDate ? (
                                <View style={styles.dot} />
                            ) : (
                                <View style={styles.nightDot} />
                            )}
                        </TouchableOpacity>
                    )}
                    ItemSeparatorComponent={renderSeparator}
                />
            </View>
        </>
    );
};
export default memo(TimeReminder);
