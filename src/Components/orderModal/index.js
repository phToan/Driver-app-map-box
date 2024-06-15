import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Modal,
} from "react-native";
import { OrderItem } from "../../Screen/Home/components/orderItem";
import React, { memo, useContext, useState } from "react";
import { RocketIcon, FlashIcon } from "../../assets/images";
import color from "../../assets/color";
import { DotCircleIcon, TruckIcon } from "../../assets/Icons";
import { TextFont } from "../../Components/Text";
import AppContext from "../../Context";

const OrderModal = memo(({ itemOrder }) => {
  console.log("order123: ", itemOrder);
  console.log("itemOrder1: ", itemOrder.distance);
  return (
    // <Modal visible={visible} transparent={true}>
    <SafeAreaView style={styles.background}>
      <View style={styles.component}>
        <View style={styles.header}>
          <Text style={styles.message}>Đơn hàng</Text>
        </View>

        <View style={styles.body}>
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
            }}
          >
            <DotCircleIcon height={20} width={20} style={{ color: "green" }} />
            <Text style={{ marginLeft: 10, fontSize: 15 }}>
              {itemOrder?.senderInfo?.address}
            </Text>
          </View>
          <View style={styles.line} />
          <View
            style={{
              flexDirection: "row",
              marginHorizontal: 20,
              marginTop: 21,
            }}
          >
            <DotCircleIcon height={20} width={20} style={{ color: "red" }} />
            <Text style={{ marginLeft: 10, fontSize: 15 }}>
              {itemOrder?.receiverInfo?.address}
            </Text>
          </View>
          <View>
            <View style={styles.under}>
              <View style={{ flex: 1, marginLeft: 20 }}>
                {itemOrder?.info_shipping ? (
                  <Image source={RocketIcon} style={styles.image} />
                ) : (
                  <Image source={FlashIcon} style={styles.image} />
                )}
              </View>
              <View style={{ flex: 5 }}>
                <Text style={styles.t_shipping}>
                  {itemOrder?.info_shipping ? "Hỏa Tốc" : "Tiết kiệm"}
                </Text>
                <Text style={styles.t_money}>
                  <Text style={styles.t_initmoney}>đ</Text> {itemOrder?.price} -
                  <Text style={{ color: "blue" }}>
                    - {itemOrder?.distance} km
                  </Text>
                </Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.footer}
          activeOpacity={0.5}
          onPress={() => {}}
        >
          <Text
            style={{
              fontSize: 18,
              color: "white",
              textAlign: "center",
            }}
          >
            OK
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
    // </Modal>
  );
}, []);

export default OrderModal;

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: "rgba(00,00,00,.5)", //trong suot 50%
  },
  component: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: "white",
    borderRadius: 10,
    position: "absolute",
  },
  header: {
    paddingBottom: 15,
  },
  footer: {
    width: "30%",
    backgroundColor: "orange",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 20,
    marginTop: 15,
  },
  message: {
    fontSize: 18,
    fontWeight: "bold",
    color: "orange",
  },

  image: {
    height: 50,
    width: 50,
  },
  t_shipping: {
    fontSize: 16,
    fontWeight: "bold",
  },
  t_money: {
    color: "red",
    marginTop: 5,
  },
  under: {
    flexDirection: "row",
    borderTopWidth: 0.5,
    borderColor: "#bec0c2",
    marginTop: 10,
    paddingTop: 10,
  },
  body: {
    padding: 10,
    backgroundColor: "white",
    marginBottom: 15,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    shadowColor: "black",
    elevation: 4,
  },
  t_initmoney: {
    textDecorationLine: "underline",
    fontWeight: "bold",
    fontSize: 16,
  },
  line: {
    borderLeftWidth: 1,
    height: 30,
    position: "absolute",
    borderColor: "#bec0c2",
    left: "10.1%",
  },
});
