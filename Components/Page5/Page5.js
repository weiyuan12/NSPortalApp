import { FontAwesome } from "@expo/vector-icons";
import { StatusBar } from "expo-status-bar";
import {
  Text,
  StyleSheet,
  View,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Countdown from "./Countdown";
import React, { useState } from "react";
import Score from "./Score";
import Webcam from "react-webcam";
import StartRecord from "./StartRecord";

export default function Page5() {
  const [pushupCam, setpushupCam] = useState(false);
  const [situpCam, setsitupCam] = useState(false);
  const [pushupTime, setpushupTime] = useState(false);
  const [situpTime, setsitupTime] = useState(false);
  const [runCam, setrunCam] = useState(false);
  const [runTime, setrunTime] = useState(false);

  return (
    <ScrollView>
      <View style={styles.container}>
        {!pushupCam && !pushupTime? <View ><FontAwesome
          name="camera"
          size={200}
          style={styles.camera}
          onClick={() => {
            alert("camera will start recording");
            setpushupCam(true);
          }}
        />
          <Text>Press camera button to start IPPT recording</Text></View>
          : null}
        {pushupCam ? (
          <View>
            <Text>Pushups will end in:</Text>
            <Countdown
              time={5}
              finishComponent={setpushupTime}
              setCam={setpushupCam}
            ></Countdown>
            <Webcam></Webcam>
          </View>
        ) : null}

        {pushupTime ? (
          <View>
            <Score name="Pushups" data="48" points="23/25"></Score>
            <Text>Time to situp: Autorecording will start in: </Text>
            <StartRecord time={10} setCam={setsitupCam}></StartRecord>
          </View>
        ) : null}
        {situpCam ? (
          <View>
            <Text>Situps will end in:</Text>
            <Countdown
              time={5}
              finishComponent={setsitupTime}
              setCam={setsitupCam}
            ></Countdown>
            <Webcam></Webcam>
          </View>
        ) : null}
        {situpTime ? (
          <View>
            <Score name="Situps" data="50" points="24/25"></Score>
            <Text>Time to 2.4km: Autorecording will start in:</Text>
            <StartRecord time={10} setCam={setrunCam}></StartRecord>
          </View>
        ) : null}
        {runCam ? (
          <View>
            <Webcam></Webcam>
            <TouchableOpacity style={styles.button}
              onPress={() => {
                alert("Submitting log file and video file...");
                setrunTime(true);
                setrunCam(false);
              }}
            >
              <Text>Press button to stop 2.4km run</Text>
            </TouchableOpacity>
          </View>
        ) : null}
        {runTime ? (
          <Score name="2.4km" data="10 mins 15 sec" points="39/50"></Score>
        ) : null}
        <StatusBar style="auto" />
      </View>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    padding: 10,
    margin: 10
  }
});
