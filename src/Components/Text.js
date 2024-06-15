import { Text } from "react-native";

export const TextFont = ({
  title,
  fs,
  fw,
  al,
  mt,
  mb,
  ml,
  mr,
  mh,
  mv,
  m,
  p,
  pb,
  pt,
  pl,
  pr,
  ph,
  pv,
  ta,
  underline,
  color,
  key,
}) => {
  return (
    <Text
      key={key}
      style={{
        fontSize: fs,
        fontWeight: fw,
        alignItems: al,
        marginTop: mt,
        marginBottom: mb,
        marginLeft: ml,
        marginRight: mr,
        marginHorizontal: mh,
        marginVertical: mv,
        margin: m,
        padding: p,
        paddingBottom: pb,
        paddingTop: pt,
        paddingLeft: pl,
        paddingRight: pr,
        paddingHorizontal: ph,
        paddingVertical: pv,
        textDecorationLine: underline,
        color: color,
        textAlign: ta,
      }}
    >
      {title}
    </Text>
  );
};
