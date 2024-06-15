import React from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NameScreen } from "../../Constants/nameScreen";
import { FieldInfo, FieldLabel } from "./components/fieldInfo";
import { Header } from "../../Components/Header";
import { styles } from "./styles";
import { useSelector } from "react-redux";

const UserAccount = () => {
  const navigation = useNavigation();
  const userData = useSelector((data) => data.userSlice);
  const onClickReturn = () => {
    navigation.navigate(NameScreen.BOTTOM_TAB);
  };
  const onClickChangePass = () => {
    navigation.navigate(NameScreen.EDIT_PASSWORD_SCREEN, {
      id: userData?.id,
    });
  };
  const onClickChangeInforUser = () => {
    navigation.navigate(NameScreen.EDIT_PROFILE_SCREEN, { data });
  };

  const data = {
    name: userData?.name,
    dob: userData?.dob,
    phone: userData?.phone,
    gender: userData?.gender,
    id: userData?.id,
    avatar: userData?.avatar,
  };

  return (
    <SafeAreaView>
      <Header onClickReturn={onClickReturn} title="Tài khoản của tôi" />
      <View style={styles.body}>
        <FieldLabel
          labelStyle={styles.textItem}
          onPress={onClickChangeInforUser}
          label={"Thông tin cá nhân"}
          id={1}
        />
        <FieldInfo info={userData?.name} label={"Họ và tên"} />
        <FieldInfo info={userData?.dob} label={"Ngày sinh"} />
        <FieldInfo info={userData?.phone} label={"Số điện thoại"} />
        <FieldLabel
          labelStyle={styles.textItem}
          onPress={onClickChangePass}
          label={"Password"}
          id={2}
        />
      </View>
    </SafeAreaView>
  );
};

export default UserAccount;
