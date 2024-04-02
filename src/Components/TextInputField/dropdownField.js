import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export const DropdownField = ({
    placeholder,
    data,
    labelField,
    valueField,
    onChange,
    value
}) => (
    <View style={styles.dropdown_gender}>
        {value !== null &&
            <View style={[{ flexDirection: 'row' }]}>
                <Text style={[styles.label]}>{placeholder}</Text>
            </View>
        }
        <Dropdown
            style={{ width: '100%' }}
            placeholderStyle={styles.textStyle}
            selectedTextStyle={styles.textStyle}
            data={data}
            labelField={labelField}
            valueField={valueField}
            placeholder={placeholder}
            onChange={onChange}
        />
    </View>
)

const styles = StyleSheet.create({
    dropdown_gender: {
        justifyContent: 'center',
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        marginTop: 20,
        marginBottom: 10,

    },
    textStyle: {
        fontSize: 16,
    },
    label: {
        fontSize: 14,
        backgroundColor: 'white',
        paddingHorizontal: 3,
        position: 'absolute',
        bottom: 4,
        left: 10
    },
    tranform: {
        transform: [{ translateX: 10 }, { translateY: -15 }]
    },
})