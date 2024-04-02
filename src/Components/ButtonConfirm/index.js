import React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import color from "../../assets/color"
import { styles } from "./styles"
export const ButtonConfirm = ({
    footerStyle,
    validate,
    onPress,
    title
}) => (
    <View style={footerStyle}>
        <TouchableOpacity
            activeOpacity={0.5}
            onPress={onPress}
            style={[styles.bt_ok, { backgroundColor: validate ? color.orange : color.silver }]}
            disabled={!validate}
        >
            <Text style={styles.bt_title}>{title}</Text>
        </TouchableOpacity>
    </View>
)