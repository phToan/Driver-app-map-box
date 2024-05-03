import React, { useState } from 'react';
import { HistoryTab } from '../../navigation/topTab';
import HeaderBottomTab from '../../Components/HeaderBottomTab';
import NotificationModal from '../../Components/notificationModal';

const HistoryScreen = () => {
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useState('');
    return (
        <React.Fragment>
            <NotificationModal
                Message={message}
                Visible={visible}
                onHide={() => setVisible(false)}
            />
            <HeaderBottomTab setMessage={setMessage} setVisible={setVisible} />
            <HistoryTab />
        </React.Fragment>
    );
};

export default HistoryScreen;
