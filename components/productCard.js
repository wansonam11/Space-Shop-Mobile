import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import { API_URL } from "../config/constants";
import Avatar from "../assets/logo/avatar.png";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/ja";

dayjs.extend(relativeTime);
dayjs.locale("ja");

function ProductCard(props) {
  const product = props.product;
  return (
    <TouchableOpacity
      onPress={() => {
        props.navigation.navigate("Product", {
          id: product.id,
        });
      }}
    >
      <View style={styles.productCard}>
        {product.soldout === 1 && <View style={styles.productBlur} />}
        <View>
          <Image
            style={styles.productImage}
            source={{ uri: `${API_URL}/${product.imageUrl}` }}
            resizeMode={"contain"}
          />
        </View>
        <View style={styles.productContents}>
          <Text style={styles.productName}>{product.name}</Text>
          <Text style={styles.productPrice}>¥ {product.price}</Text>
          <View style={styles.productFooter}>
            <View style={styles.productSeller}>
              <Image style={styles.productAvatar} source={Avatar} />
              <Text style={styles.productSellerName}>{product.seller}</Text>
            </View>
            <Text style={styles.productDate}>
              {dayjs(product.createdAt).fromNow()}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default ProductCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  productCard: {
    overflow: "hidden",
    width: 270,
    borderColor: "rgb(200, 200, 200)",
    borderWidth: 1,
    borderRadius: 14,
    backgroundColor: "white",
    marginBottom: 10,
  },

  productImage: {
    width: "100%",
    height: 270,
    overflow: "hidden",
  },

  productContents: {
    padding: 8,
  },

  productSeller: {
    flexDirection: "row",
    alignItems: "center",
  },

  productAvatar: {
    width: 24,
    height: 24,
  },

  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 12,
  },

  productName: {
    fontSize: 16,
  },

  productPrice: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 8,
  },
  productSellerName: {
    fontSize: 16,
  },

  productDate: {
    fontSize: 16,
  },

  productList: {
    alignItems: "center",
  },

  headline: {
    fontSize: 24,
    fontWeight: "700",
    marginBottom: 6,
    textAlign: "center",
  },
  headline2: {
    fontSize: 18,
    fontWeight: "200",
    marginBottom: 15,
    textAlign: "center",
  },
  productBlur: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "#ffffffaa",
    zIndex: 999,
  },

  bannerImage: {
    width: "100%",
    height: 200,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "#fff",
    marginVertical: 16,
  },
});
