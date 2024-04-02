import React, { memo } from "react";
import { View, Text, TextInput } from "react-native";
import { styles } from "./styles";

export const textInput = memo(({
    label,
    star,
    placeholder,
    value,
    keyboardType,
    onChangeText,
    validate
}) => (
    <>
        <Text style={styles.label}>{label} <Text style={styles.star}>{star}</Text></Text>
        <View style={[styles.border, {
            borderColor: validate ? 'black' : 'red'
        }]}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                keyboardType={keyboardType}
                onChangeText={(text) => onChangeText(text)}
            />
        </View>
    </>
))