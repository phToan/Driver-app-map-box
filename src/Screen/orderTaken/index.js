import React, { useState, useEffect, useContext } from "react";
import { View, SafeAreaView, Text, ScrollView, Linking } from "react-native";
import { styles } from "./styles";
import moment from "moment-timezone";
import { Map } from "../../Components/MapView";
import { Header } from "../../Components/Header";
import { Button } from "../../Components/Button";
import { InfoOrderUser } from "../../Components/infoOrderUser";
import { onClickPhone } from "../../Helper/linkPhone";
import { instance } from "../../Api/instance";
import { NameScreen } from "../../Constants/nameScreen";
import LoadingModal from "../../Components/LoadingModal";
import NotificationModal from "../../Components/notificationModal";
import color from "../../assets/color";
import { update, getDatabase, ref } from "firebase/database";
import AppContext from "../../Context";
import { useIsFocused } from "@react-navigation/native";
import { PhoneIcon } from "../../assets/Icons";
import { useDispatch } from "react-redux";
import { updateOrder } from "../../Redux/Reducer/orderSlice";

const OrderTaken = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const {
    setIsOrderSelected,
    setFocusScreen,
    focusScreen,
    keySelected,
    setKeySelected,
    visiblePopup,
    setVisiblePopup,
    id,
  } = useContext(AppContext);
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const isFocused = useIsFocused();
  const database = getDatabase();
  const item = route?.params.item;
  const dataRef = ref(database, `order/${item.key}/driver`);
  const onHide = () => {
    setVisible(false);
  };
  const currentTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");

  const data = {
    id_Order: item.id,
    takeAt: currentTime,
  };
  const onClickReturn = () => {
    navigation.navigate(NameScreen.BOTTOM_TAB);
  };
  const onClickDetail = () => {
    navigation.navigate(NameScreen.WATCH_DETAIL_SCREEN, {
      item,
    });
  };

  const openGoogleMaps = () => {
    navigation.navigate(NameScreen.DIRECTION_MAP_SCREEN, {
      longDestination: item?.senderInfo?.long,
      latDestination: item?.senderInfo?.lat,
    });
  };

  const onclickDel = async () => {
    setLoading(true);
    const updateData = {
      id: 0,
      status: 0,
      onReceive: "",
    };
    update(dataRef, updateData)
      .then(() => {
        setIsOrderSelected(false);
        setLoading(false);
        navigation.navigate(NameScreen.BOTTOM_TAB);
      })
      .catch((e) => {
        setLoading(false);
        setVisible(true);
        setMessage(
          "Huỷ đơn hàng thất bại. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!"
        );
        console.log("err: ", e);
      });
  };

  const onClickSuccess = async () => {
    setLoading(true);
    const updateData = {
      status: 2,
      onTaken: currentTime,
    };
    dispatch(
      updateOrder({
        status: 2,
        takeAt: currentTime,
      })
    );
    update(dataRef, updateData)
      .then(() => {
        // saveDB();
        setLoading(false);
        navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
      })
      .catch((e) => {
        setLoading(false);
        setVisible(true);
        setMessage(
          "Xác nhận lấy hàng không thành công. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!"
        );
        console.log("err: ", e);
      });
  };

  const saveDB = async () => {
    await instance
      .put("/driver/update", data)
      .then((res) => {
        console.log(res);
        if (res.data.err == 0) {
          navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
        } else {
          console.log("failure");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (isFocused) {
      setFocusScreen("TakenScreen");
      console.log(item?.key);
      setKeySelected(item?.key);
    }
  }, [isFocused]);
  console.log(keySelected);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <NotificationModal Message={message} Visible={visible} onHide={onHide} />
      <NotificationModal
        Message={"Đơn hàng này đã bị huỷ. Vui lòng nhận đơn hàng khác!"}
        Visible={visiblePopup}
        onHide={() => {
          setVisiblePopup(false);
          navigation.navigate(NameScreen.BOTTOM_TAB);
        }}
      />
      <LoadingModal visible={loading} />
      <Header onClickReturn={onClickReturn} title={"Thông tin lấy hàng"} />

      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles._body_title}>
            <Text style={styles.labelLocate}>Địa điểm lấy hàng</Text>
          </View>
          <View style={styles.map}>
            <Map
              lat={item?.senderInfo?.lat}
              lng={item?.senderInfo?.long}
              delta={0.01}
            />
          </View>
          <View style={styles.address}>
            <Text style={styles.t_address}>{item.senderInfo.address}</Text>
            <Button
              colorBackground={"#ff6833"}
              colorTitle={"white"}
              title={"Đường đi"}
              onPress={openGoogleMaps}
            />
          </View>
          {item.senderInfo.subAddress !== "" && (
            <View style={styles.detailAddressArea}>
              <Text style={styles.labelLocate}>Địa chỉ chi tiết: </Text>
              <View style={styles.detailAddress}>
                <Text
                  numberOfLines={4}
                  ellipsizeMode="tail"
                  style={{ color: "black", fontSize: 16 }}
                >
                  {item.senderInfo.subAddress}
                </Text>
              </View>
            </View>
          )}
          <InfoOrderUser name={item.senderInfo.name} label={"người gửi"} />
          <View style={{ marginHorizontal: "20%", gap: 10 }}>
            <Button
              colorBackground={"green"}
              colorTitle={"white"}
              title={item?.senderInfo?.phone}
              onPress={onClickPhone}
              icon={() => (
                <PhoneIcon height={30} width={30} color={color.white} />
              )}
            />
            <Button
              colorBackground={"#e60aa4"}
              colorTitle={"white"}
              title={"Xem chi tiết đơn hàng"}
              onPress={onClickDetail}
            />
          </View>
          {item?.COD && (
            <View style={styles.bt_detail_order}>
              <Text style={styles.text}>Thu hộ (COD)</Text>
              <Text style={styles.cast}>{item.COD} đ</Text>
            </View>
          )}
          {item?.transportFee && (
            <View
              style={[
                styles.payment,
                {
                  marginTop: item?.COD ? 5 : 20,
                },
              ]}
            >
              <Text style={styles.text}>Phí Giao hàng</Text>
              <Text style={styles.cast}>{item?.transportFee} đ</Text>
            </View>
          )}
          <View style={styles.payment}>
            <Text style={styles.text}>Thanh toán</Text>
            <Text style={styles.cast}>{item?.price} đ</Text>
          </View>
          <View style={styles.payment}>
            <Text style={styles.text}>Hình thức thanh toán</Text>
            <Text style={styles.text}>Tiền mặt</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button
          colorBackground={"silver"}
          colorTitle={"black"}
          onPress={onclickDel}
          title={"Hủy đơn hàng"}
        />
        <Button
          colorBackground={color.orange}
          colorTitle={"white"}
          onPress={onClickSuccess}
          title={"Lấy hàng thành công"}
        />
      </View>
    </SafeAreaView>
  );
};

export default OrderTaken;
