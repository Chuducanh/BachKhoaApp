import React, { useState, useLayoutEffect, useCallback } from "react";
import { collection, addDoc } from "firebase/firestore";
import { database } from "../config/firebase";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";

export default function News() {
  const navigation = useNavigation();
  const [dayWrite, setDayWrite] = useState("");
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const createNews = async () => {
    if (dayWrite !== "" && title !== "" && link != "") {
      await addDoc(collection(database, "news"), {
        dayWrite,
        title,
        link,
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.whiteSheet} />
      <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Tạo mới bài viết</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập thời gian viết bài"
          autoCapitalize="none"
          autoFocus={true}
          value={dayWrite}
          onChangeText={(text) => setDayWrite(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Nhập chủ đề bài viết"
          autoCapitalize="none"
          value={title}
          onChangeText={(text) => setTitle(text)}
        />

        <TextInput
          style={styles.input}
          placeholder="Nhập đường link"
          autoCapitalize="none"
          value={link}
          onChangeText={(text) => setLink(text)}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await createNews();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{ name: "Home" }],
              })
            );
          }}
        >
          <Text style={{ fontWeight: "bold", color: "#fff", fontSize: 18 }}>
            Tạo mới bài viết
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    color: "orange",
    alignSelf: "center",
    paddingBottom: 25,
    paddingTop: 25,
  },
  input: {
    backgroundColor: "#F6F7FB",
    height: 58,
    marginBottom: 20,
    fontSize: 16,
    borderRadius: 10,
    padding: 12,
  },

  whiteSheet: {
    width: "100%",
    height: "75%",
    position: "absolute",
    bottom: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 60,
  },
  form: {
    flex: 1,
    justifyContent: "center",
    marginHorizontal: 30,
  },
  button: {
    backgroundColor: "#f57c00",
    height: 58,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});
