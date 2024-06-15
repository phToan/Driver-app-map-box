import { instance } from "./instance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDatabase, onValue, ref } from "firebase/database";
import { updateUser } from "../Redux/Reducer/userSlice";

export const getData = async (dispatch) => {
  const accessToken = await AsyncStorage.getItem("access_token");
  const data = {
    headers: {
      Authorization: accessToken,
    },
  };
  await instance
    .get("/driver", data)
    .then(async (res) => {
      dispatch(
        updateUser({
          id: res?.data?.userData?.id,
          name: res?.data?.userData?.name,
          dob: res?.data?.userData?.dob,
          gender: JSON.stringify(res?.data?.userData?.gender),
          phone: res?.data?.userData?.phone,
          vehicle_num: res?.data?.userData?.vehicle_num,
        })
      );
      getKey(dispatch, res?.data?.userData?.id);
    })
    .catch((err) => {
      console.log(err);
    });
};

const getKey = (dispatch, id) => {
  const database = getDatabase();
  const dataRef = ref(database, "active_status");
  const onDataChange = (snapshot) => {
    const newData = snapshot.val() ?? [];
    const keys = Object.keys(snapshot.val() ?? []);
    const arr = Object.values(newData);
    arr.filter((item, index) => {
      item?.id === id &&
        (dispatch(
          updateUser({
            point: item?.point,
            status: item?.status,
            avatar: item?.avatar,
            key: keys[index],
          })
        ),
        item?.isActive &&
          dispatch(
            updateUser({
              isAuto: true,
            })
          ));
    });
  };
  onValue(dataRef, onDataChange);
};

export const updateData = async (data) => {
  try {
    const response = await instance.put("/customer", data);
    const status = response.data.err;
    return status;
  } catch (error) {
    console.log(error);
  }
};

export const updatePassword = async (data) => {
  try {
    const res = await instance.put("/customer/password", data);
    return res.data.err;
  } catch (error) {
    console.log(error);
  }
};
