import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Button } from "react-native";
import React, { useState, useLayoutEffect, useCallback, useContext } from "react";
import Icon from "react-native-vector-icons/Entypo";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import uuid from "react-native-uuid";
import { AuthContext } from "../UseAuth";

export default function AddingItems({ navigation, route }) {
	// Setting up variable to handle data in form
	const [form, setForm] = useState({ shop: "", shopAddress: "", products: [] });
	const [tempItem, setTempItem] = useState({ id: uuid.v4(), name: "", price: "", error: false });

	// Getting email from context
	const { email, city } = useContext(AuthContext);

	// Setting up navbar settings
	useLayoutEffect(() => {
		navigation.setOptions({
			headerLeft: () => <Button onPress={() => navigation.navigate("Main")} title="Anuluj" color="#fff" />,

			headerStyle: {
				backgroundColor: "#002047",
			},
			headerTitleStyle: {
				fontWeight: "bold",
			},
			headerTintColor: "#fff",
			title: "Dodaj produkty",
		});
	});

	// Adding fonts
	const [fontsLoaded] = useFonts({
		Ubuntu_Bold: require("../fonts/Ubuntu-Bold.ttf"),
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

	// Function handling adding new item to receipt
	const handleNewItem = async () => {
		if (tempItem.name && tempItem.price) {
			const requestOptions = {
				method: "POST",
				body: JSON.stringify({
					id: tempItem.id,
					ReceiptId: route.params.id,
					owner: email,
					place: route.params.place,
					shop: route.params.shop,
					name: tempItem.name,
					City: city,
					price: tempItem.price,
				}),
			};

			const newItem = await fetch("https://hack-heroes-back.herokuapp.com/addItem", requestOptions);

			setTempItem({ id: uuid.v4(), name: "", price: "", error: false });
		} else setTempItem({ ...tempItem, error: true });
	};

	return (
		<View style={{ backgroundColor: "#f9f9ff", flex: 1, paddingHorizontal: "5%" }}>
			{/* Subtitle */}
			<Text style={styles.subtitle}>Dodaj nowy produkt</Text>
			{/* Adding new products to receipt */}
			<View style={styles.inputsContainer}>
				{/* Form inputs */}
				<TextInput
					value={tempItem.name}
					onChangeText={(name) => setTempItem({ ...tempItem, name: name })}
					style={{ ...styles.input, width: "80%" }}
					placeholder="Nazwa produktu..."
					placeholderTextColor={"#00204750"}
				/>
				<TextInput
					keyboardType="numeric"
					value={tempItem.price}
					onChangeText={(price) => setTempItem({ ...tempItem, price: price })}
					style={{ ...styles.input, textAlign: "center", width: "17.5%", marginStart: "2.5%" }}
					placeholder="Cena"
					placeholderTextColor={"#00204750"}
				/>

				{/* Confirm button */}
				<TouchableOpacity style={styles.buttonConfirm} onPress={() => handleNewItem()}>
					<Text style={styles.buttonsText}>Dodaj nowy produkt</Text>
				</TouchableOpacity>

				{/* Error display */}
				{tempItem.error ? <Text style={styles.errorText}>Uzupełnij wszystkie pola</Text> : null}
			</View>
			{/* Subtitle */}
			<Text style={styles.subtitle}>Produkty:</Text>

			{/* Displaying products on list */}
			<ScrollView>
				{form.products.map((product) => {
					return (
						<View style={styles.productBox} key={product.key}>
							<Text style={styles.productName}>- {product.name}</Text>
							<Text style={styles.productPrice}>{product.price}zł</Text>
							<TouchableOpacity
								style={styles.productDeleteBox}
								onPress={() => {
									handleItemDelete();
								}}
							>
								<Icon name="cross" style={{ color: "#fe2926" }} size={25} />
							</TouchableOpacity>
						</View>
					);
				})}
			</ScrollView>

			{/* Go to adding receipt by camera window */}
			<TouchableOpacity onPress={() => navigation.goBack()} style={{ ...styles.icon, left: 10 }}>
				<Icon name="arrow-left" style={{ color: "#fff" }} size={30} />
			</TouchableOpacity>

			{/* Check icon */}
			<TouchableOpacity onPress={() => navigation.navigate("Main")} style={{ ...styles.icon, right: 10 }}>
				<Icon name="check" style={{ color: "#fff" }} size={30} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	icon: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		padding: 15,
		borderRadius: 50,
	},

	subtitle: {
		fontFamily: "Ubuntu_Bold",
		fontSize: 20,
		marginTop: 25,
		color: "#002047",
	},

	// Adding item styling
	inputsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	input: {
		marginTop: 20,
		padding: 15,
		borderColor: "#002047",
		borderWidth: 2,
		borderRadius: 12,
	},
	buttonConfirm: {
		marginVertical: 12,
		padding: 12,
		borderColor: "#002047",
		borderWidth: 2,
		width: "100%",
		borderRadius: 12,
	},
	buttonsText: {
		textAlign: "center",
		fontFamily: "Ubuntu_Bold",
		color: "#002047",
		fontSize: 20,
	},
	errorText: {
		textAlign: "left",
		width: "80%",
		marginTop: 5,
		color: "#fe2926",
	},

	// Products styling
	productBox: {
		marginTop: 12,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "flex-end",
	},
	productName: {
		fontSize: 17.5,
	},
	productPrice: {
		fontFamily: "Montserrat_Regular",
		fontSize: 17.5,
		marginEnd: 25,
	},
	productDeleteBox: {
		position: "absolute",
		right: 0,
	},
});
