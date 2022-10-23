import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import React, { useCallback, useState, useEffect } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { StyleSheet, Text, View, TouchableWithoutFeedback } from "react-native";

export default function ShopsContainer({ navigation }) {
	const [shops, setShops] = useState([]);

	useEffect(() => {
		const shopsData = [
			{
				id: 1,
				name: "Biedronka",
				adress: "Warszawska 62, Kraków",
				avgPrice: "48.99",
				trend: "up",
				products: [
					{ productName: "Ziemniaki", price: "3.5" },
					{ productName: "Sos słodki", price: "10.2" },
					{ productName: "Sos kwaśny", price: "9.99" },
				],
			},
			{ id: 2, name: "Lidl", adress: "Długa 20, Kraków", avgPrice: "54.23", trend: "down", products: [{ productName: "Grzyby", price: "3.29" }] },
			{ id: 3, name: "Biedronka", adress: "Prosta 33, Kraków", avgPrice: "32.23", trend: "up", products: [{ productName: "Sos", price: "4.29" }] },
		];

		setShops(shopsData.sort((a, b) => a.avgPrice.localeCompare(b.avgPrice)));
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
						<TouchableWithoutFeedback key={shop.id} onPress={() => navigation.navigate("ShopScreen", { props: shop })}>
							<View style={styles.shopBox}>
								<Text style={styles.shopPossitonNum}>{i + "."}</Text>
								<View style={{ marginRight: 30 }}>
									<Text style={styles.shopName}>{shop.name}</Text>
									<Text style={styles.shopAddress}>{shop.adress}</Text>
								</View>
								<Icon name={"triangle-" + shop.trend} style={{ color: shop.trend === "up" ? "#4FE3B4" : "#EF094A", ...styles.triangleIcon }} size={40} />
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
	triangleIcon: {
		position: "absolute",
		right: 0,
	},
});
