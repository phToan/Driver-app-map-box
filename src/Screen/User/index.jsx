import React, { useState, useEffect, useContext } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import HeaderBottomTab from "../../Components/HeaderBottomTab";
import { ManIcon } from "../../assets/images";
import { TextFont } from "../../Components/Text";
import { OptionItem } from "./components/optionItem";
import { NameScreen } from "../../Constants/nameScreen";
import NotificationModal from "../../Components/notificationModal";
import { getDatabase, ref, update } from "firebase/database";
import AppContext from "../../Context";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../Redux/Reducer/userSlice";

const Others = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { lightDot, avatar, key } = useContext(AppContext);
  const database = getDatabase();
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const toggleSwitch = () => {
    const ref1 = ref(database, `active_status/${dataUser?.key}`);
    if (dataUser?.isAuto) {
      dispatch(
        updateUser({
          isAuto: false,
        })
      );
      update(ref1, { isActive: false }).catch((err) => {
        console.log(err);
      });
    } else {
      dispatch(
        updateUser({
          isAuto: true,
        })
      );
      update(ref1, { isActive: true }).catch((err) => {
        console.log(err);
      });
    }
  };
  const dataUser = useSelector((data) => data.userSlice);

  const onClickUserAccount = () => {
    navigation.navigate(NameScreen.ACCOUNT_SCREEN);
  };
  const onClickLogOut = () => {
    if (lightDot) {
      setMessage(
        "Bạn đang có đơn hàng chưa hoàn thành. Vui lòng hoàn thành đơn hàng hiện tại và đăng xuất tài khoản!"
      );
      setVisible(true);
      return;
    }
    navigation.popToTop();
  };
  console.log(dataUser);
  return (
    <View style={styles.container}>
      <NotificationModal
        Message={message}
        Visible={visible}
        onHide={() => setVisible(false)}
      />
      <HeaderBottomTab setMessage={setMessage} setVisible={setVisible} />
      <TouchableOpacity style={styles.header} onPress={onClickUserAccount}>
        <View style={styles._header_item}>
          <Image
            source={dataUser?.avatar ? { uri: dataUser?.avatar  } : ManIcon}
            style={styles.avatar}
          />
        </View>
        <View style={styles.labelInfo}>
          <TextFont fs={16} fw={"bold"} title={dataUser.name} />
          <TextFont mt={5} title={dataUser.phone} fs={14} />
        </View>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false}>
        <OptionItem
          content={"Tự động nhận đơn"}
          onPress={() => {}}
          id={1}
          isEnabled={dataUser.isAuto}
          toggleSwitch={toggleSwitch}
        />
        <OptionItem content={"Cập nhật giấy tờ"} onPress={() => {}} id={2} />
        <OptionItem content={"Trợ giúp"} onPress={() => {}} id={3} />
        <OptionItem content={"Cài đặt"} onPress={() => {}} id={4} />
        <View style={styles.logout}>
          <OptionItem content={"Đăng xuất"} onPress={onClickLogOut} id={5} />
        </View>
      </ScrollView>
    </View>
  );
};

export default Others;

const styles = StyleSheet.create({
  container: { flex: 1 },
  labelInfo: {
    marginHorizontal: 10,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 60 / 2,
  },
  _header_item: {
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
    elevation: 4,
    marginHorizontal: 5,
  },
  header: {
    backgroundColor: "#fff1d6",
    borderBottomWidth: 0.5,
    borderBottomColor: "silver",
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  logout: {
    marginTop: 20,
  },
});
