import AppContext from "../../Context";
import React, { memo, useContext } from "react";
import { View, TouchableOpacity } from "react-native";
import { DotIcon, RightICon } from "../../assets/Icons";
import { TextFont } from "../Text";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../Redux/Reducer/userSlice";
import { update, ref, getDatabase } from "firebase/database";

const HeaderBottomTab = memo(({ setMessage, setVisible }) => {
  const dispatch = useDispatch();
  const database = getDatabase();
  const { isOrderSelected } = useContext(AppContext);
  const { status, key } = useSelector((state) => state.userSlice);
  console.log('key: ',status);
  const handleLightDot = () => {
    if (isOrderSelected) {
      setVisible(true);
      setMessage(
        "Bạn đang có đơn hàng chưa hoàn thành. Vui lòng hoàn thành đơn hàng hiện tại và thay đổi trạng thái hoạt động!"
      );
      return;
    }
    
    update(ref(database, `active_status/${key}`), {
      status: !status,
    }).then(() => {
      dispatch(
        updateUser({
          status: !status,
        })
      );
    });
  };
  return (
    <View
      style={{
        height: 110,
        backgroundColor: status ? "#fff1d6" : "#c2bdbd",
        justifyContent: "flex-end",
        alignItems: "flex-end",
      }}
    >
      <TouchableOpacity
        style={{
          backgroundColor: status ? "#f47c2a" : "#4d4d85",
          flexDirection: "row",
          borderRadius: 30,
          alignItems: "center",
          width: "40%",
          margin: 10,
          paddingVertical: 12,
          justifyContent: "space-between",
          paddingHorizontal: 10,
        }}
        onPress={handleLightDot}
      >
        <DotIcon
          height={20}
          width={20}
          style={{ color: status ? "green" : "red" }}
        />
        <TextFont
          title={status ? "Trực tuyến" : "Ngoại tuyến"}
          color={"white"}
          fw={"bold"}
        />
        <RightICon height={20} width={20} style={{ color: "white" }} />
      </TouchableOpacity>
    </View>
  );
});

export default HeaderBottomTab;
