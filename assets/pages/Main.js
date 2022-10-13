import { StatusBar } from "expo-status-bar";
import { useFonts } from "@expo-google-fonts/dev";
import React, { useState } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { Image, Platform, SafeAreaView, ScrollView, StyleSheet, TextInput, Text, TouchableOpacity, View } from "react-native";

export default function Main({ navigation }) {
	return (
		<View>
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
	let [fontsLoaded] = useFonts({});
	return (
		<SafeAreaView style={stylesTopBar.topBar}>
			<View style={{ marginTop: 15, marginBottom: 20, flexDirection: "row", justifyContent: "space-evenly" }}>
				<View style={stylesTopBar.search}>
					<Icon style={{ lineHeight: 35, color: "#fe2926" }} name="magnifying-glass" size={20} />
					<TextInput style={{ paddingLeft: 10, width: "95%" }} onChangeText={onChangeSearch} value={search} placeholder="Wyszukaj..." />
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
		paddingTop: Platform.OS === "android" ? StatusBar.curentHeight : 0,
	},
	user: {
		borderColor: "#fff",
		borderWidth: 1,
		width: 35,
		height: 35,
		borderRadius: "50%",
	},
	search: {
		backgroundColor: "#fff",
		width: "75%",
		height: 35,
		paddingHorizontal: 20,
		flexDirection: "row",
		color: "red",
		borderRadius: "50%",
	},
	verticalContainer: {
		flexDirection: "row",
		marginLeft: 25,
		marginTop: 10,
	},
	icon: {
		backgroundColor: "#fe2926",
		position: "absolute",
		bottom: 15,
		padding: 10,
		alignSelf: "center",
		borderRadius: "50%",
	},
});

function ShopsContainer({ navigation }) {
	return (
		<View style={{ padding: 25, backgroundColor: "#f9f9ff" }}>
			<View style={stylesContainer.mainBox}>
				<Text style={stylesContainer.title}>Najniższe ceny w okolicy:</Text>
			</View>
		</View>
	);
}

const stylesContainer = StyleSheet.create({
	mainBox: {
		padding: 25,
		backgroundColor: "#fff",
		minHeight: 1000,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,

		elevation: 5,
	},
	title: {
		color: "#002047",
		textAlign: "center",
		fontWeight: "bold",
		fontSize: 25,
	},
});
