import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState, useEffect, useContext } from "react";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";
import { AuthContext } from "../UseAuth";

export default function ShopsContainer({ navigation }) {
	const [shops, setShops] = useState([]);

	// Getting email from context
	const { city } = useContext(AuthContext);

	// Getting previous receipts from db
	const getData = async () => {
		const requestOptions = {
			method: "POST",
			body: JSON.stringify({
				city: city,
			}),
		};
		const shopItems = await fetch("https://hack-heroes-back.herokuapp.com/shopStats", requestOptions);
		const data = await shopItems.json();

		setShops(data.stats.sort((a, b) => a.AvgPrice - b.AvgPrice));
	};
	useEffect(() => {
		getData();
	}, []);

	// Adding font
	const [fontsLoaded] = useFonts({
		Lato_Black: require("../fonts/Lato-Black.ttf"),
		Montserrat_Regular: require("../fonts/Montserrat-Regular.ttf"),
	});

	// Waiting for fonts to load
	const onLayoutRootView = useCallback(async () => {
		if (fontsLoaded) {
			await SplashScreen.hideAsync();
		}
	}, [fontsLoaded]);
	if (!fontsLoaded) {
		return null;
	}

	let i = 0;

	return (
		<View style={{ padding: 25, backgroundColor: "#f9f9ff" }}>
			{/* Box with title and shops */}
			<View style={styles.mainBox}>
				{/* Title */}
				<Text style={styles.title}>Najniższe ceny w okolicy:</Text>

				{/* Shops */}
				{shops.map((shop) => {
					i += 1;
					return (
						<TouchableWithoutFeedback
							key={shop.Place}
							onPress={() =>
								navigation.navigate("ShopScreen", { place: shop.Place, avgPrice: shop.AvgPrice, name: shop.Name, city: shop.City, street: shop.Street, number: shop.Number })
							}
						>
							<View style={styles.shopBox}>
								<Text style={styles.shopPossitonNum}>{i + "."}</Text>
								<View>
									<Text style={styles.shopName}>{shop.Name}</Text>
									<Text style={styles.shopAddress}>
										{shop.Street} {shop.Number}, {shop.City}
									</Text>
								</View>
							</View>
						</TouchableWithoutFeedback>
					);
				})}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	mainBox: {
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		shadowColor: "#002047",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 2,
		borderRadius: 15,
	},
	title: {
		marginVertical: 25,
		color: "#002047",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 25,
	},
	shopBox: {
		alignItems: "center",
		flexDirection: "row",
		justifyContent: "space-between",
		borderTopWidth: 1,
		padding: 15,
		borderTopColor: "#002047",
	},

	// Individual shop styling
	shopPossitonNum: {
		color: "#fe2926",
		fontSize: 40,
		fontFamily: "Lato_Black",
	},
	shopName: {
		textAlign: "right",
		fontWeight: "bold",
		fontSize: 20,
	},
	shopAddress: {
		textAlign: "right",
		fontWeight: "200",
		fontSize: 15,
	},
});
