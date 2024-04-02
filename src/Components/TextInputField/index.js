import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    body: {
        marginTop: 20,
        borderWidth: 1,
        paddingHorizontal: 10,
        justifyContent: 'center',
        borderRadius: 10,
        marginBottom: 5,
        height: 55,
    },
    tranform: {
        transform: [{ translateX: 10 }, { translateY: -'17' }],
    },
    label: {
        fontSize: 14,
        backgroundColor: 'white',
        paddingHorizontal: 3,
    },
});

export const InputField = ({
    value,
    onChangeText,
    disable,
    label,
    validate,
    isLabel,
}) => {
    const [focus, setFocus] = useState(isLabel);
    const onFocus = () => {
        setFocus(true);
    };
    const onBlur = () => {
        if (value.length == 0) {
            setFocus(false);
        }
    };
    return (
        <View
            style={[styles.body, { borderColor: validate ? 'black' : 'red' }]}
        >
            {focus && (
                <View style={[{ flexDirection: 'row' }, styles.tranform]}>
                    <Text
                        style={[
                            styles.label,
                            { color: validate ? 'black' : 'red' },
                        ]}
                    >
                        {label}
                    </Text>
                </View>
            )}
            <TextInput
                style={{ fontSize: 16, bottom: focus ? 9 : 0 }}
                defaultValue={value}
                placeholderTextColor={'black'}
                placeholder={focus ? '' : label}
                onChangeText={(text) => onChangeText(text)}
                onFocus={onFocus}
                onBlur={onBlur}
                editable={disable}
            />
        </View>
    );
};
