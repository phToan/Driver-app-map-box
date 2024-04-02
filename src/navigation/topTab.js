import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import CompletedOrder from '../Screen/History/completedOrder';
import CanceledOrder from '../Screen/History/canceledOrder';

const Tab = createMaterialTopTabNavigator();

export const HistoryTab = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                activeTintColor: 'orange',
                inactiveTintColor: 'gray',
                labelStyle: {
                    fontWeight: 'bold',
                },

                tabBarLabelStyle: {
                    fontSize: 15,
                    color: '#f5741a',
                    fontWeight: 'bold',
                },
                tabBarIndicatorStyle: {
                    backgroundColor: 'orange',
                },
                tabBarStyle: {
                    backgroundColor: '#fff1d6',
                },
            }}
        >
            <Tab.Screen name="HOÀN THÀNH" component={CompletedOrder} />
            <Tab.Screen name="ĐÃ HỦY" component={CanceledOrder} />
        </Tab.Navigator>
    );
};
