import React, { memo, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';
import { EyeOff, EyeShow } from '../../assets/Icons';

const styles = StyleSheet.create({
    body: {
        marginTop: 15,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: 'space-between',
        borderRadius: 10,
        marginBottom: 5,
        height: 55,
        flexDirection: 'row',
        alignItems: 'center',
    },
    tranform: {
        transform: [{ translateX: 10 }, { translateY: -15 }],
    },
    label: {
        fontSize: 14,
        backgroundColor: 'white',
        paddingHorizontal: 3,
    },
    input: {
        width: '93%',
    },
    textinput: {
        fontSize: 16,
    },
});

export const PasswordField = memo(
    ({ password, onChangeText, label, hide, onClickEye, validate }) => {
        const [focus, setFocus] = useState(false);
        const onFocus = () => {
            setFocus(true);
        };
        const onBlur = () => {
            if (password.length == 0) {
                setFocus(false);
            }
        };
        return (
            <View
                style={[
                    styles.body,
                    { borderColor: validate ? 'black' : 'red' },
                ]}
            >
                <View style={styles.input}>
                    {focus && (
                        <View
                            style={[{ flexDirection: 'row' }, styles.tranform]}
                        >
                            <Text
                                style={[
                                    styles.label,
                                    {
                                        color: validate ? 'black' : 'red',
                                    },
                                ]}
                            >
                                {label}
                            </Text>
                        </View>
                    )}
                    <TextInput
                        style={[{ bottom: focus ? 9 : 0 }, styles.textinput]}
                        defaultValue={password}
                        secureTextEntry={hide ? true : false}
                        placeholderTextColor={'black'}
                        placeholder={focus ? '' : label}
                        onChangeText={(text) => onChangeText(text)}
                        onFocus={onFocus}
                        onBlur={onBlur}
                    />
                </View>
                <TouchableOpacity onPress={onClickEye}>
                    {hide ? (
                        <EyeOff height={20} width={20} />
                    ) : (
                        <EyeShow height={20} width={20} />
                    )}
                </TouchableOpacity>
            </View>
        );
    }
);
