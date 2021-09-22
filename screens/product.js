import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
  ScrollView,
} from "react-native";
import { API_URL } from "../config/constants";
import Avatar from "../assets/logo/avatar.png";
import dayjs from "dayjs";
import ProductCard from "../components/productCard";

export default function ProductScreen(props) {
  const { id } = props.route.params;
  const [product, setProduct] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios
      .get(`${API_URL}/products/${id}`)
      .then((result) => {
        console.log("product result: ", result.data);
        setProduct(result.data.product);
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get(`${API_URL}/products/${id}/recommendation`)
      .then((result) => {
        setProducts(result.data.products);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  // const onPressButton = () => {
  //   if (product.soldout !== 1) {
  //     Alert.alert("購入が完了しました。");
  //   }
  // };

  if (!product) {
    return <ActivityIndicator />;
  }

  const onClickPurchase = () => {
    axios
      .post(`${API_URL}/purchase/${id}`)
      .then((result) => {
        message.info("購入が完了しました。");
        getProduct();
      })
      .catch((error) => {
        message.error(`에러가 발생했습니다. ${error.message}`);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView>
        <View>
          <Image
            style={styles.productImage}
            source={{ uri: `${API_URL}/${product.imageUrl}` }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.productSection}>
          <View style={styles.productSeller}>
            <Image style={styles.avatarImage} source={Avatar} />
            <Text>{product.seller}</Text>
          </View>

          <View style={styles.divider} />
          <View>
            <Text style={styles.productName}>【 {product.name}】</Text>
            <Text style={styles.productPrice}>¥ {product.price}</Text>
            <Text style={styles.productDate}>
              {dayjs(product.createAt).format("YYYY年 MM月 DD日")}
            </Text>
            <Text style={styles.productDescription}>{product.description}</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.recommendationHeadline}> 『 おすすめ商品 』</Text>
          <View style={styles.recommendationSection}>
            {products.map((product, index) => {
              return (
                <ProductCard
                  product={product}
                  key={index}
                  navigation={props.navigation}
                />
              );
            })}
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onClick={onClickPurchase}>
        <View
          style={
            product.soldout === 1
              ? styles.purchaseDisabled
              : styles.purchaseButton
          }
        >
          <Text style={styles.purchaseText}>
            {product.soldout === 1 ? "購入完了" : "購入する"}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  productImage: {
    width: "100%",
    height: 300,
  },

  productSeller: {
    flexDirection: "row",
    alignItems: "center",
    fontSize: 30,
  },

  avatarImage: {
    width: 45,
    height: 45,
  },

  productSection: {
    padding: 12,
  },

  divider: {
    backgroundColor: "rgb(200, 200, 200)",
    height: 1,
    marginVertical: 10,
  },

  productName: {
    fontSize: 20,
    fontWeight: "400",
  },

  productPrice: {
    fontSize: 18,
    fontWeight: "700",
    marginTop: 8,
    color: "rgb(255, 80, 88)",
  },

  productDate: {
    fontSize: 14,
    marginTop: 4,
    color: "rgb(180, 180, 180 )",
  },

  productDescription: {
    marginTop: 16,
    fontSize: 13,
    marginBottom: 32,
  },

  purchaseButton: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "rgb(255, 80, 88)",
    alignItems: "center",
    justifyContent: "center",
  },

  purchaseText: {
    color: "white",
    fontSize: 20,
    fontWeight: "800",
  },

  purchaseDisabled: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "gray",
    alignItems: "center",
    justifyContent: "center",
  },

  recommendationSection: {
    alignItems: "center",
    marginTop: 16,
    paddingBottom: 70,
  },

  recommendationHeadline: {
    fontSize: 25,
    fontWeight: "bold",
  },
});
