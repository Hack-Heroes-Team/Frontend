import { View, TextInput, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import React, { useLayoutEffect, useEffect, useState, useCallback } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function ShopScreen({ navigation, route }) {
	// Setting up variable to handle data in search bar
	const [search, onChangeSearch] = useState("");

	const [products, setProducts] = useState();

	// Getting previous receipts from db
	const getData = async () => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				place: route.params.place,
			}),
		};
		const shopItems = await fetch("https://hack-heroes-back.herokuapp.com/priceForEveryItemInShop", requestOptions);
		const data = await shopItems.json();
		setProducts(data.items);
	};
	useEffect(() => {
		getData();
	}, []);

	// Adding fonts
	const [fontsLoaded] = useFonts({
		MavenPro_Bold: require("../fonts/MavenPro-Bold.ttf"),
		MavenPro_SemiBold: require("../fonts/MavenPro-SemiBold.ttf"),
		Montserrat_Bold: require("../fonts/Montserrat-Bold.ttf"),
	});

	// Waiting for font to load
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) {
		return null;
	}

	return (
		<View style={{ flex: 1, backgroundColor: "#f9f9ff" }}>
			{/* Adding TopBar component (underneath) */}
			<SafeAreaView style={styles.topBar}>
				<Text style={styles.title}>{route.params.name}</Text>
				<Text style={styles.adress}>
					{route.params.street} {route.params.number}, {route.params.city}
				</Text>
				<View style={styles.avgPriceBox}>
					<Text style={{ fontSize: 24, fontFamily: "MavenPro_SemiBold" }}>Średnia cena {"\n"}w sklepie: </Text>
					<Text style={{ fontFamily: "Montserrat_Bold", fontSize: 36, color: "#002047" }}>{route.params.avgPrice.toFixed(2)}zł</Text>
				</View>
			</SafeAreaView>

			{/* Search window */}
			<View style={styles.searchBar}>
				<Icon style={{ lineHeight: 35, color: "#fe2926" }} name="magnifying-glass" size={20} />
				<TextInput style={styles.search} onChangeText={onChangeSearch} value={search} placeholder="Wyszukaj produkt..." autoCorrect={true} placeholderTextColor={"#002047"} />
			</View>

			{/* Scrollable part of view */}
			<ScrollView>
				{products
					? products
							.filter((product) => {
								return product.Name.includes(search) ? product : null;
							})
							.map((product) => {
								return (
									<View style={styles.product} key={product.Id}>
										<Text style={styles.productName}>{product.Name}</Text>
										<Text style={styles.productPrice}>{parseFloat(product.AvgPrice).toFixed(2)}zł</Text>
									</View>
								);
							})
					: null}
			</ScrollView>
		</View>
	);
}

// Style sheet
const styles = StyleSheet.create({
	// TopBar styles
	topBar: {
		backgroundColor: "#fe2926",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	title: {
		color: "#fff",
		marginHorizontal: "7.5%",
		fontSize: 36,
		fontFamily: "MavenPro_Bold",
		marginTop: 20,
	},
	adress: {
		color: "#002047",
		marginHorizontal: "7.5%",
		fontSize: 18,
		fontFamily: "MavenPro_SemiBold",
		marginBottom: 10,
	},
	avgPriceBox: {
		backgroundColor: "#fff",
		flexDirection: "row",
		justifyContent: "space-between",
		borderRadius: 7.5,
		alignItems: "center",
		width: "90%",
		alignSelf: "center",
		height: 100,
		margin: "5%",
		padding: 20,
	},

	// Search styles
	searchBar: {
		borderColor: "#002047",
		borderWidth: 1,
		backgroundColor: "#fff",
		height: 35,
		margin: "5%",
		paddingHorizontal: 20,
		width: "90%",
		flexDirection: "row",
		borderRadius: 50,
	},
	search: {
		paddingLeft: 10,
		backgroundColor: "#fff",
	},

	// Product styling
	product: {
		width: "80%",
		flexDirection: "row",
		paddingHorizontal: "2%",
		marginHorizontal: "8%",
		paddingVertical: 10,
		borderBottomColor: "#002047",
		borderBottomWidth: 1,
		justifyContent: "space-between",
		alignItems: "flex-end",
	},

	productName: {
		fontSize: 17.5,
		fontFamily: "Montserrat_Bold",
	},
	productPrice: {
		fontSize: 17.5,
		fontWeight: "600",
	},
});
