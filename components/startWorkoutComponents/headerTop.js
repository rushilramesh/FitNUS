import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Dimensions,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Divider } from "react-native-elements";
import ReadMore from "react-native-read-more-text";

const image = "../../assets/logan-weaver-9D_rUDe7xvA-unsplash.jpg";

const HeaderTop = ({ name, image, desc }) => {
  const [title, onChangeTitle] = useState(null);
  const [heart, onLike] = useState(false);
  const onLikePress = () => onLike(!heart);

  return (
    <View>
      {image !== "" ? (
        <Image source={{ uri: image }} style={styles.image} />
      ) : (
        <View />
      )}
      <View style={styles.top}>
        <TextInput
          style={{ height: 40, borderWidth: 0, fontSize: 22 }}
          onChangeTitle={(text) => onChangeTitle(text)}
          title={title}
          maxLength={40}
          defaultValue={name !== "" ? name : "Custom Workout"}
        />
      </View>
      <View>
        <Text
          style={[{ paddingTop: 5, marginHorizontal: 10, fontWeight: "bold" }]}
        >
          Description
        </Text>
        <View style={styles.body}>
          <ReadMore numberOfLines={3}>
            <Text style={styles.body}>{desc ? desc : ""}</Text>
          </ReadMore>
        </View>
      </View>
    </View>
  );
};

export default HeaderTop;

const styles = StyleSheet.create({
  imageheader: {
    width: "100%",
    minHeight: 250,
    overflow: "hidden",
  },
  heart: {
    position: "absolute",
    top: 20,
    left: 100,
  },
  image: {
    width: "100%",
    height: "20%",
    minHeight: 250,
  },
  body: {
    marginVertical: 5,
    marginHorizontal: 10,
    textAlign: "justify"
  },
  top: {
    marginVertical: 5,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#C0C0C0",
  },
});
