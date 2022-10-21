import { View, TextInput, StyleSheet, ScrollView, SafeAreaView, Text } from "react-native";
import React, { useLayoutEffect, useState, useCallback } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";

export default function ShopScreen({ navigation, route }) {
	// Setting up variable to handle data in search bar
	const [search, onChangeSearch] = useState("");

	// Setting up params
	const props = route.params.props;

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
				<Text style={styles.title}>{props.name}</Text>
				<Text style={styles.adress}>{props.adress}</Text>
			</SafeAreaView>

			{/* Search window */}
			<View style={styles.searchBar}>
				<Icon style={{ lineHeight: 35, color: "#fe2926" }} name="magnifying-glass" size={20} />
				<TextInput style={styles.search} onChangeText={onChangeSearch} value={search} placeholder="Wyszukaj produkt..." autoCorrect={true} placeholderTextColor={"#002047"} />
			</View>

			{/* Scrollable part of view */}
			<ScrollView>
				{props.products
					.filter((product) => {
						return product.productName.includes(search) ? product : null;
					})
					.map((product) => {
						return (
							<View style={styles.product} key={product.productName}>
								<Text style={styles.productName}>{product.productName}</Text>
								<Text style={styles.productPrice}>{product.price}zł</Text>
							</View>
						);
					})}
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
