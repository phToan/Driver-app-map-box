import React from 'react';
import { HistoryTab } from '../../navigation/topTab';
import HeaderBottomTab from '../../Components/HeaderBottomTab';

const HistoryScreen = () => {
    return (
        <React.Fragment>
            <HeaderBottomTab />
            <HistoryTab />
        </React.Fragment>
    );
};

export default HistoryScreen;
