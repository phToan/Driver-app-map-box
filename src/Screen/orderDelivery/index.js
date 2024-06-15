import React, { useState, useCallback, useContext, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView, Linking, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import * as ImagePicker from "expo-image-picker";
import moment from "moment-timezone";
import { Map } from "../../Components/MapView";
import { Header } from "../../Components/Header";
import { Button } from "../../Components/Button";
import { InfoOrderUser } from "../../Components/infoOrderUser";
import { NameScreen } from "../../Constants/nameScreen";
import { PhoneCallIcon, PhoneIcon } from "../../assets/Icons";
import color from "../../assets/color";
import LoadingModal from "../../Components/LoadingModal";
import NotificationModal from "../../Components/notificationModal";
import { update, getDatabase, ref, remove } from "firebase/database";
import { instance } from "../../Api/instance";
import AppContext from "../../Context";
import { useSelector } from "react-redux";
import { TextFont } from "../../Components/Text";

const OrderDelivery = ({ navigation, route }) => {
  const { driver_id, id_Order, takeAt } = useSelector(
    (state) => state.orderSlice
  );
  const {key} = useSelector((state) => state.userSlice);

  const { setIsOrderSelected, id } = useContext(AppContext);
  const item = route?.params.item;
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [uri, setUri] = useState('')
  const database = getDatabase();
  const dataRef = ref(database, `order/${item.key}/driver`);
  const currentTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  const onclickDel = () => {
    navigation.navigate("Đơn hàng");
  };
  const onClickReturn = () => {
    navigation.navigate(NameScreen.BOTTOM_TAB);
  };
  const data = {
    id_Order: item.id,
    confirmAt: currentTime,
    status: 1,
  };

  const openGoogleMaps = () => {
    navigation.navigate(NameScreen.DIRECTION_MAP_SCREEN, {
      longDestination: item?.receiverInfo?.long,
      latDestination: item?.receiverInfo?.lat,
    });
  };

  const payload = {
    id_Order: item?.id,
    driver_id: driver_id,
    status: 3,
    takeAt: takeAt,
    confirmAt: currentTime,
  };
  const onClickSuccess = useCallback(async () => {
    setLoading(true);
    await instance
      .post("/order/driver", payload)
      .then((res) => {
        console.log(res.status);
        if (res.status === 200) {
          saveData({
            id: item?.id,
            sender_name: item?.senderInfo?.name,
            sender_phone: item?.senderInfo?.phone,
            sender_address: item?.senderInfo?.address,
            sender_detail_address: item?.senderInfo?.subAddress,
            receiver_name: item?.receiverInfo?.name,
            receiver_phone: item?.receiverInfo?.phone,
            receiver_address: item?.receiverInfo?.address,
            receiver_detail_address: item?.receiverInfo?.subAddress,
            size_item: item?.size_item,
            detail_item: item?.detail_item,
            infor_shipping: item?.info_shipping,
            distance: item?.distance,
            price: item?.price,
            customer_id: item?.customer_id,
            status: 3,
            driver_id: item?.driver?.id,
            confirm_order_at: currentTime,
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        setVisible(true);
        setMessage(
          "Xác nhận giao hàng không thành công. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!"
        );
        console.log(": ", err);
      });
  }, []);

  const updateData = () => {
    const dataRef = ref(database, `active_status/${key}`);
    update(dataRef, {
      isPause: false,
      routing: '',
    }).catch((err) => {
      console.log(err);
    })
  }

  const saveData = useCallback(async (myOrder) => {
    const dataRef = ref(database, `order/${item?.key}`);
    await instance
      .post("/order/customer", myOrder)
      .then((res) => {
        if (res.data.err == 0) {
          remove(dataRef)
            .then(() => {
              console.log("delete : ", item?.key);
              setLoading(false);
              setIsOrderSelected(false);
              updateData()
              navigation.navigate(NameScreen.BOTTOM_TAB);
            })
            .catch((err) => {
              console.log(err);
              setLoading(false);
              setVisible(true);
              setMessage(
                "Xác nhận giao hàng không thành công. Vui lòng liên hệ với bộ phận chăm sóc khách hàng hoặc thử lại sau ít phút!"
              );
            });
        }
      })
      .catch((err) => {
        console.log("err: ", err);
      });
  }, []);
  const onClickPhone = async () => {
    const isAvailable = await Linking.canOpenURL(
      `tel:${item.receiverInfo.phone}`
    );
    if (isAvailable) {
      // Mở ứng dụng gọi điện thoại
      Linking.openURL(`tel:${item.receiverInfo.phone}`);
    } else {
      console.log("Ứng dụng gọi điện thoại không khả dụng trên thiết bị.");
    }
  };
  const onClickDetail = () => {
    navigation.navigate(NameScreen.WATCH_DETAIL_SCREEN, { item });
  };
  const handleImageOrder = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.canceled) {
        setUri(result.assets[0].uri)
      }
    } catch (error) {
      console.log("err: ", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <LoadingModal visible={loading} />
      <NotificationModal
        Message={message}
        Visible={visible}
        onHide={() => setVisible(false)}
      />
      <Header onClickReturn={onClickReturn} title="Thông tin giao hàng" />
      <View style={styles.body}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles._body_title}>
            <Text style={{ fontWeight: "bold" }}>Địa điểm giao hàng</Text>
          </View>
          <View style={styles.map}>
            <Map
              lat={item?.receiverInfo?.lat}
              lng={item?.receiverInfo?.long}
              delta={0.001}
            />
          </View>
          <View style={styles.address}>
            <Text style={styles.t_address}>{item.receiverInfo.address}</Text>
            <Button
              colorBackground={"#ff6833"}
              colorTitle={"white"}
              title={"Đường đi"}
              onPress={openGoogleMaps}
            />
          </View>

          {item.receiverInfo.subAddress !== "" && (
            <View>
              <Text style={styles.labelAddress}>Địa chỉ chi tiết</Text>
              <Text style={{ color: "silver" }}>
                {item.receiverInfo.subAddress}
              </Text>
            </View>
          )}
          <InfoOrderUser label={"người nhận"} name={item.receiverInfo.name} />
          <View style={styles.button}>
            <Button
              colorBackground={"green"}
              colorTitle={"white"}
              title={item.receiverInfo.phone}
              onPress={onClickPhone}
              icon={() => (
                <PhoneIcon height={30} width={30} color={color.white} />
              )}
            />
            <Button
              colorBackground={"#ec09a8"}
              colorTitle={"white"}
              title={"Xem chi tiết đơn hàng"}
              onPress={onClickDetail}
            />
          </View>

          <View>
            <TextFont 
            title={'Hình ảnh đơn hàng'} 
            fw={'700'} 
            fs={16}
            mt={20}
            mb={10}
            />
            <TouchableOpacity onPress={handleImageOrder}>
              <Image source={uri ? {uri: uri} : require('../../assets/images/imagePlaceholder.png')} style={styles.image}/>
            </TouchableOpacity>
          </View>

          <View style={styles.payment}>
            <Text style={styles.t_payment}>Thanh toán</Text>
            <Text style={styles.cast}>{item.price} đ</Text>
          </View>

          <View style={styles.form}>
            <Text style={styles.t_payment}>Hình thức thanh toán</Text>
            <Text style={styles.cast}>Tiền mặt</Text>
          </View>
        </ScrollView>
      </View>

      <View style={styles.footer}>
        <Button
          colorBackground={"silver"}
          colorTitle={"black"}
          title={"Thất bại"}
          onPress={onclickDel}
        />
        <Button
          disabled={uri === ''}
          colorBackground={color.orange}
          colorTitle={"white"}
          title={"Giao hàng thành công"}
          onPress={onClickSuccess}
        />
      </View>
    </SafeAreaView>
  );
};
export default OrderDelivery;
