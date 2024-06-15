import { View, StyleSheet, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
// import Header from "~components/header/header";
// import { translate } from "~utils/language";
// import { Colors, Spacing } from "~styles";
// import {
//   TextFontBold,
//   TextFontMD,
//   TextFontRG,
//   TextFontSM,
// } from "~components/text";
// import { verticalScale } from "~utils/dimensions";
import OTPTextView from "react-native-otp-textinput";
// import Clipboard from "@react-native-clipboard/clipboard";
// import Button from "~components/button/button";
// import Row from "~components/row";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation, useRoute } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import color from "../../assets/color";

// import { useSelector } from "react-redux";
// import LoadingComponent from "~components/loading";
// import Modal from "react-native-modal";
// import { fetchOnboardingIdRequest } from "~redux/onboarding/onboarding.actions";
// import { fetchLoginRequest } from "~redux/authorize/authorize.actions";
const OTFVerificationScreen = () => {
  const input = useRef(null);
  const [otpInput, setOtpInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [resendTimeout, setResendTimeout] = useState(null);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const dispatch = useDispatch();
  const startResendCountdown = () => {
    setResendTimeout(60);
    const timer = setInterval(() => {
      setResendTimeout((prevTime) => (prevTime ? prevTime - 1 : null));
    }, 1000);
    setTimeout(() => {
      clearInterval(timer);
      setResendTimeout(null);
    }, 60000);
  };
  const getOnboardingId = (response) => {
    const payload = {
      userId: response?._id ?? "",
    };
    dispatch(fetchOnboardingIdRequest(payload));
  };
  const onSuccessSubmitOtp = () => {
    setIsLoading(false);

    dispatch(fetchLoginRequest(payload));

    navigate("SelectUserType");
  };
  const onErrorSubmitOtp = () => {
    setIsLoading(false);
    setIsError(true);
  };
  const onSubmitOtp = () => {
    setIsLoading(true);
    const payloadWithOtp = {
      body: { name: name, email: email, password: pass, otp: otpInput },
      onSuccess: onSuccessSubmitOtp,
      onError: onErrorSubmitOtp,
    };
    dispatch(fetchRegisterOtpRequest(payloadWithOtp));
  };
  const toggleShowErrorModal = () => {
    setIsLoading(false);
    setShowErrorModal((prev) => !prev);
  };
  const onResendOtp = () => {
    const payload = {
      body: { name: name, email: email, password: pass, otp: null },
      onSuccess: () => {},
      onError: toggleShowErrorModal,
    };
    dispatch(fetchRegisterRequest(payload));
  };
  const handleCellTextChange = () => {};
  const onResend = () => {
    setOtpInput("");
    input.current?.clear();
    onResendOtp();
    startResendCountdown();
  };
  const onChangeTextOtP = (value) => {
    setOtpInput(value);
    if (isError) {
      setIsError(false);
    }
  };

  return (
    <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
      <OTPTextView
        ref={input}
        containerStyle={styles.textInputContainer}
        textInputStyle={styles.roundedTextInput}
        inputCount={6}
        inputCellLength={1}
        keyboardType="number-pad"
        autoFocus={true}
        // tintColor={isError ? Colors.Red1 : Colors.MainColor}
        // offTintColor={isError ? Colors.Red1 : Colors.Transparent}
        handleTextChange={(text) => {
          console.log(text);
        }}
        handleCellTextChange={handleCellTextChange}
      />
    </View>
  );
};
export default OTFVerificationScreen;
const windowDimensions = {
  width: Dimensions.get("window").width,
  height: Dimensions.get("window").height,
};
const styles = StyleSheet.create({
  textInputContainer: {
    marginBottom: 12,
    borderWidth: 0,
  },
  roundedTextInput: {
    backgroundColor: "white",
    color: color.orange,
    borderWidth: 1,
    borderBottomWidth: 1,
    width: windowDimensions.width * 0.11,
    height: windowDimensions.height * 0.07,
    borderRadius: 5,
  },
});
