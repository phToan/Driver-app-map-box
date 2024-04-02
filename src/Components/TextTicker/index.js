import TextTicker from "react-native-text-ticker";

export const TextTickerItem = ({ message }) => (
    <TextTicker
        style={{ fontSize: 16 }}
        duration={10000}
        animationType="scroll"
        repeatSpacer={100}
        marqueeDelay={3000}
    >
        {message}
    </TextTicker>
)