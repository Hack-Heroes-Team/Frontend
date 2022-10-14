import { useFonts, Lato_900Black } from "@expo-google-fonts/dev";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Image, Platform, StatusBar, SafeAreaView, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, View, TouchableWithoutFeedback } from "react-native";

export default function Main({ navigation }) {
	return (
		<View style={{ flex: 1 }}>
			<ScrollView style={{ backgroundColor: "#f9f9ff" }}>
				<TopBar navigation={navigation} />
				<ShopsContainer navigation={navigation} />
			</ScrollView>
			<TouchableOpacity onPress={() => navigation.navigate("AddingReceipt")} style={stylesTopBar.icon}>
				<Icon name="plus" style={{ color: "#fff" }} size={50} />
			</TouchableOpacity>
		</View>
	);
}

function TopBar({ navigation }) {
	const [search, onChangeSearch] = useState("");
	return (
		<SafeAreaView style={stylesTopBar.topBar}>
			<View style={{ marginTop: 15, marginBottom: 20, flexDirection: "row", justifyContent: "space-evenly" }}>
				<View style={stylesTopBar.search}>
					<Icon style={{ lineHeight: 35, color: "#fe2926" }} name="magnifying-glass" size={20} />
					<TextInput style={{ paddingLeft: 10, width: "95%" }} onChangeText={onChangeSearch} value={search} placeholder="Wyszukaj..." autoCorrect={true} placeholderTextColor={"#002047"} />
				</View>
				<TouchableOpacity onPress={() => navigation.navigate("Account")}>
					<Image source={require("../person-icon.png")} style={stylesTopBar.user} />
				</TouchableOpacity>
			</View>
		</SafeAreaView>
	);
}

const stylesTopBar = StyleSheet.create({
	topBar: {
		backgroundColor: "#002047",
		paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
	},
	user: {
		borderColor: "#fff",
		borderWidth: 1,
		width: 35,
		height: 35,
		borderRadius: 50,
	},
	search: {
		backgroundColor: "#fff",
		width: "75%",
		height: 35,
		paddingHorizontal: 20,
		flexDirection: "row",
		color: "red",
		borderRadius: 50,
	},
	verticalContainer: {
		flexDirection: "row",
		marginLeft: 25,
		marginTop: 10,
	},
	icon: {
		backgroundColor: "#fe2926",
		position: "absolute",
		bottom: 25,
		padding: 10,
		alignSelf: "center",
		borderRadius: 50,
	},
});

function ShopsContainer({ navigation }) {
	let [fontsLoaded] = useFonts({ Lato_900Black });

	return (
		<View style={{ padding: 25, backgroundColor: "#f9f9ff" }}>
			<View style={stylesContainer.mainBox}>
				<Text style={stylesContainer.title}>Najniższe ceny w okolicy:</Text>

				<TouchableWithoutFeedback onPress={() => navigation.navigate("ShopScreen", { name: "Biedronka" })}>
					<View style={stylesContainer.shopBox}>
						<Text style={{ color: "#fe2926", fontSize: 40, fontFamily: fontsLoaded ? "Lato_900Black" : "Arial" }}>1.</Text>
						<View style={{ marginRight: 30 }}>
							<Text style={stylesContainer.shopName}>Biedronka</Text>
							<Text style={stylesContainer.shopAddress}>Warszawska 62, Kraków</Text>
						</View>
						<Icon name="triangle-down" style={{ color: "#EF094A", position: "absolute", right: 0 }} size={40} />
					</View>
				</TouchableWithoutFeedback>

				<TouchableWithoutFeedback onPress={() => navigation.navigate("ShopScreen", { name: "Lidl" })}>
					<View style={stylesContainer.shopBox}>
						<Text style={{ color: "#fe2926", fontSize: 40, fontFamily: fontsLoaded ? "Lato_900Black" : "Arial" }}>2.</Text>
						<View style={{ marginRight: 30 }}>
							<Text style={stylesContainer.shopName}>Lidl</Text>
							<Text style={stylesContainer.shopAddress}>Długa 20, Kraków</Text>
						</View>
						<Icon name="triangle-up" style={{ color: "#4FE3B4", position: "absolute", right: 0 }} size={40} />
					</View>
				</TouchableWithoutFeedback>
			</View>
		</View>
	);
}

const stylesContainer = StyleSheet.create({
	mainBox: {
		paddingHorizontal: 15,
		backgroundColor: "#fff",
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 1,
		},
		shadowOpacity: 0.25,
		shadowRadius: 2,
		borderRadius: 15,
		elevation: 5,
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
