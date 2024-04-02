import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Notification from '../Screen/Notification';
import History from '../Screen/History';
import Statistic from '../Screen/Statistic';
import User from '../Screen/User';
import Home from '../Screen/Home';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icon2 from 'react-native-vector-icons/Ionicons';
import {
    BellICon,
    CategoryIcon,
    ChartIcon,
    ClockICon,
    HomeIcon,
    NoteIcon,
    UserIcon,
} from '../assets/Icons';

const Tab = createBottomTabNavigator();

const BottomTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'orange',
                tabBarStyle: {
                    height: '9%',
                    // paddingBottom: 5,
                },
                headerShown: false,
                tabBarLabelStyle: {
                    fontSize: 14,
                    marginTop: 5,
                    alignItems: 'center',
                },
                tabBarIconStyle: {
                    marginTop: 5,
                },
            }}
        >
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <HomeIcon
                            height={30}
                            width={30}
                            style={{ color, marginBottom: 2 }}
                        />
                    ),
                }}
                name="Đơn hàng"
                component={Home}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <ClockICon height={24} width={24} style={{ color }} />
                    ),
                }}
                name="Lịch sử"
                component={History}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <BellICon height={30} width={30} style={{ color }} />
                    ),
                }}
                name="Thông báo"
                component={Notification}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <ChartIcon height={30} width={30} style={{ color }} />
                    ),
                }}
                name="Thống kê"
                component={Statistic}
            />
            <Tab.Screen
                options={{
                    tabBarIcon: ({ color }) => (
                        <CategoryIcon
                            height={30}
                            width={30}
                            style={{ color }}
                        />
                    ),
                }}
                name="Thêm"
                component={User}
            />
        </Tab.Navigator>
    );
};

export default BottomTab;
