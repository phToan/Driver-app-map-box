import React, {
  useState,
  useEffect,
  useContext,
  useCallback,
  memo,
} from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { styles } from "./styles";
import AppContext from "../../Context";
import { BlankDataImage } from "../../assets/images";
import { OrderItem } from "./components/orderItem";
import color from "../../assets/color";
import HeaderBottomTab from "../../Components/HeaderBottomTab";
import { NameScreen } from "../../Constants/nameScreen";
import NotificationModal from "../../Components/notificationModal";
import {
  getDatabase,
  onValue,
  off,
  onChildRemoved,
  update,
  ref,
} from "firebase/database";
import { TextFont } from "../../Components/Text";
import { Button } from "../../Components/Button";
import moment from "moment-timezone";
import LoadingModal from "../../Components/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../Redux/Reducer/userSlice";
import firebaseDB from "../../../firebaseConfig";

const Home = ({ navigation }) => {
  const dispatch = useDispatch()
  const { status, isAuto, key, id } = useSelector((state) => state.userSlice);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const {
    setIsOrderSelected,
    keySelected,
    setVisiblePopup,
    setKeySelected,
    setIsAuto,
  } = useContext(AppContext);
  const [data, setData] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderSelected, setOrderSelected] = useState([]);
  const [visibleOrder, setVisibleOrder] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentTime = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  const database = getDatabase(firebaseDB);

  useEffect(() => {
    if (status) {
      const dataRef = ref(database, "order");
      const onDataChange = (snapshot) => {
        setOrderSelected([]);
        const newData = snapshot.val() ?? [];
        const arr = Object.values(newData);
        if (arr.length > 0) {
          const arrItem = arr.filter(
            (item) => item?.driver?.id === Number(id) || item?.driver?.id === 0
          );
          console.log(arr);
          let arrData = [];
          const keys = Object.keys(snapshot.val() ?? []);
          arrItem.map((item, index) => {
            item.key = keys[index];
            arrData.unshift(item);
            item.driver.status > 0 &&
              item.driver.id === Number(id) &&
              (setOrderSelected((prev) => [...prev, item]),
                setIsOrderSelected(true),
                console.log("e.key: ", item.driver.id),
                setKeySelected(item.key),
                (arrData = arrData.filter(e => e.id !== item.id)));
          });
          setData(arrData);
        }
      };
      const unsubscribe = onValue(dataRef, onDataChange);

      const onRemoved = onChildRemoved(dataRef, (snapshot) => {
        const removedFieldId = snapshot.key;
        if (keySelected === removedFieldId) {
          setVisiblePopup(true);
          setIsOrderSelected(false);
        }
      });
      return () => {
        off(dataRef, onDataChange);
        unsubscribe();
        onRemoved();
      };
    }
  }, [status]);

  useEffect(() => {
    if (isAuto && status) {
      const dataRef = ref(database, `active_status/${key}`);
      const onDataChange = (snapshot) => {
        const newData = snapshot.val();
        if (!!newData.isAssign) {
          const orderRef = ref(database, `order/${newData.isAssign}`);
          const onDataChangeOrder = (order) => {
            const autoOrder = order.val();
            autoOrder.key = newData.isAssign;
            setOrder((prev) => [...prev, autoOrder]);
          };
          onValue(orderRef, onDataChangeOrder);
        } else {
          setVisibleOrder(false);
          setOrder([]);
        }
      };
      const unsubscribe = onValue(dataRef, onDataChange);
      return () => {
        off(dataRef, onDataChange);
        unsubscribe();
      };
    }
  }, [isAuto, status]);

  useEffect(() => {
    if (order.length > 0) {
      setVisibleOrder(true);
    }
  }, [order]);

  const getItem = useCallback((item) => {
    console.log(item.driver.id === Number(id));
    if (item.driver.id === 0) {
      navigation.navigate(NameScreen.ORDER_INFO_SCREEN, { item });
      return;
    }
    if (item.driver.id === Number(id)) {
      if (item.driver.status === 1) {
        navigation.navigate(NameScreen.TAKE_ORDER_SCREEN, { item });
      } else {
        navigation.navigate(NameScreen.DELIVERY_SCREEN, { item });
      }
    }
    
  }, []);
  const handleOffAuto = useCallback(() => {
    const ref1 = ref(database, `active_status/${key}`);
    setIsAuto(false);
    update(ref1, { isActive: false })
      .then(() => {
        dispatch(updateUser({
          isAuto: false
        }))
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleRefuse = () => {
    const autoRef = ref(database, `active_status/${key}`);
    update(autoRef, {
      isPause: true,
      isTaken: false,
      isAssign: ''
    })
      .then(() => {
        setVisibleOrder(false);
      })
      .catch((err) => {
        console.log('err: ', isPause)
      })

  };

  const handleOrder = (item) => {
    setLoading(true);
    const updateData = {
      id: 1,
      status: 1,
      onReceive: currentTime,
    };
    const autoRef = ref(database, `active_status/${key}`);
    const dataRef = ref(database, `order/${item.key}/driver`);
    update(autoRef, { isAssign: "" })
      .then(() => {
        update(dataRef, updateData)
          .then(() => {
            setLoading(false);
            navigation.navigate(NameScreen.TAKE_ORDER_SCREEN, {
              item,
            });
            setOrder([])
          })
          .catch((err) => {
            setLoading(false);
            console.log("err: ", err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ListEmptyComponent = memo(() => (
    <View style={styles.componentBlank}>
      <ActivityIndicator size={"large"} color={color.orange} />
      <Text style={styles.titleBlank}>Đang tìm kiếm đơn hàng</Text>
    </View>
  ));

  return (
    <View
      style={[
        styles.component,
        {
          backgroundColor: status ? color.base : "#f7f8fa",
        },
      ]}
    >
      <HeaderBottomTab setMessage={setMessage} setVisible={setVisible} />
      {isAuto && status && (
        <View style={styles.autoField}>
          <TextFont
            title={"Tự động nhận đơn đang bật"}
            fs={16}
            fw={"500"}
            color={color.white}
          />
          <TouchableOpacity onPress={handleOffAuto}>
            <TextFont
              title={"TẮT"}
              fs={18}
              fw={"500"}
              color={color.palebrown}
            />
          </TouchableOpacity>
        </View>
      )}
      <NotificationModal
        Message={message}
        Visible={visible}
        onHide={() => setVisible(false)}
      />

      {status ? (
        <>
          {orderSelected.length > 0 &&
            orderSelected[0].driver.id === Number(id) && (
              <View style={styles.itemSelected}>
                <OrderItem
                  item={orderSelected[0]}
                  onPress={() => getItem(orderSelected[0])}
                  style={{
                    backgroundColor: color.BackgroundGreen,
                  }}
                  lineStyle={{
                    top: "16%",
                  }}
                />
              </View>
            )}
          <FlatList
            style={{ flex: 1, padding: 10 }}
            data={data}
            renderItem={({ item }) => (
              <OrderItem item={item} onPress={() => getItem(item)} />
            )}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={ListEmptyComponent}
            initialNumToRender={5}
            maxToRenderPerBatch={5}
          />
        </>
      ) : (
        <View style={styles._not_list}>
          <Image source={BlankDataImage} style={styles.Image} />
          <Text style={styles.titleOffline}>Không có đơn hàng</Text>
          <Text>Hãy chuyển sang chế độ Trực tuyến để nhận đơn</Text>
        </View>
      )}
      {visibleOrder && status && isAuto && order.length > 0 && (
        <SafeAreaView
          style={{
            ...StyleSheet.absoluteFill,
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderRadius: 10,
              padding: 20,
              minWidth: 300,
            }}
          >
            <TextFont
              title={"Đơn hàng gợi ý"}
              color={color.orange}
              fs={22}
              fw={"600"}
              ta={"center"}
              mb={20}
            />
            <OrderItem item={order[0]} onPress={() => { }} />
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                paddingHorizontal: 40,
                marginTop: 20,
              }}
            >
              <Button
                colorTitle={color.white}
                colorBackground={color.red}
                onPress={handleRefuse}
                title={"Từ chối"}
              />
              <Button
                colorTitle={color.white}
                colorBackground={color.StatusGreen}
                onPress={() => handleOrder(order[0])}
                title={"Nhận đơn"}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
      <LoadingModal visible={loading} />
    </View>
  );
};

export default Home;
