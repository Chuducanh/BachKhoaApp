import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
  Linking,
  FlatList,
  Alert
} from "react-native";
import { CommonActions, useNavigation } from "@react-navigation/native";
import colors from "../colors";
import { AntDesign, Entypo, FontAwesome } from "@expo/vector-icons";
import { reload, signOut } from "firebase/auth";
import { auth, database } from "../config/firebase";
import {
  collection,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

const Home = () => {
  const navigation = useNavigation();
  const [news, setNews] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const usersCollectionRef = collection(database, "news");

  const onSignOut = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };

  const changeDelete = () => {
    if (isDelete) {
      setIsDelete(false);
    } else {
      setIsDelete(true);
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={{
            marginRight: 10,
          }}
          onPress={onSignOut}
        >
          <AntDesign
            name="logout"
            size={24}
            color={colors.gray}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
      ),
    });
    
  }, [navigation]);

  useLayoutEffect(() => {
    const getNews = async () => {
      const data = await getDocs(usersCollectionRef);
      setNews(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getNews();
  }, []);

  const deleteNews = async (id) => {
    const newsDoc = doc(database, "news", id);
    await deleteDoc(newsDoc);
  };

  return (
    <View>
      <FlatList
        data={news}
        numColumns={1}
        renderItem={({ item }) => (
          <View>
            <Text
              style={{ marginTop: 20 }}
              onPress={() => Linking.openURL(item.link)}
            >
              <Text>
                <Text style={{ color: "red" }}>{item.dayWrite}{`:`}</Text>
                {` `}
                {item.title}
              </Text>
            </Text>
            {isDelete ? (
              <FontAwesome
                name="trash-o"
                color="red"
                onPress={async() => {
                  await deleteNews(item.id); 
                  navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "Home" }],
                  })
                );}}
                style={{ fontSize: 20 }}
              />
            ) : null}
          </View>
        )}
      />
      <View style={styles.container}>
        <TouchableOpacity onPress={changeDelete} style={styles.buttonDelete}>
          <Entypo name="trash" size={24} color={colors.lightGray} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("News")}
          style={styles.button}
        >
          <Entypo name="add-to-list" size={24} color={colors.lightGray} />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Chat")}
          style={styles.chatButton}
        >
          <Entypo name="chat" size={24} color={colors.lightGray} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 60,
  },
  chatButton: {
    backgroundColor: colors.uhm,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.uhm,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 50,
  },
  button: {
    backgroundColor: colors.primary,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 10,
  },
  buttonDelete: {
    backgroundColor: colors.red,
    height: 50,
    width: 50,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.red,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.9,
    shadowRadius: 8,
    marginRight: 20,
    marginBottom: 10,
  },
});
