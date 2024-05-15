import React from 'react';
import { StyleSheet, TouchableOpacity, View, Switch } from 'react-native';
import { TextFont } from '../../../Components/Text';
import {
    FolderIcon,
    LogoutIcon,
    PackageBoxIcon,
    QuestionIcon,
    RightICon,
    SettingIcon,
} from '../../../assets/Icons';
import color from '../../../assets/color';

const icon = (id) => {
    switch (id) {
        case 1: {
            return <PackageBoxIcon height={40} width={40} />;
        }
        case 2: {
            return <FolderIcon height={40} width={40} />;
        }
        case 3: {
            return <QuestionIcon height={40} width={40} />;
        }
        case 4: {
            return <SettingIcon height={40} width={40} />;
        }
        case 5: {
            return <LogoutIcon height={40} width={40} />;
        }
    }
};

export const OptionItem = ({
    content,
    secondText,
    onPress,
    id,
    toggleSwitch,
    isEnabled,
}) => (
    <TouchableOpacity style={styles.body} onPress={onPress} activeOpacity={0.9}>
        <View style={styles.iconView}>
            {icon(id)}
            <TextFont title={content} mh={10} fs={16} fw={'500'} />
        </View>
        <View style={styles.iconView}>
            {/* <TextFont title={secondText} mr={10} fs={16} /> */}
            {toggleSwitch && (
                <Switch
                    trackColor={{
                        false: '#767577',
                        true: color.LightGreen,
                    }}
                    thumbColor={isEnabled ? color.StatusGreen : '#f4f3f4'}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={isEnabled}
                />
            )}
            {!toggleSwitch && (
                <RightICon height={20} width={20} style={{ color: 'black' }} />
            )}
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    body: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 5,
        backgroundColor: 'white',
        padding: 15,
    },
    iconView: {
        flexDirection: 'row',
        alignItems: 'center',
    },
});
