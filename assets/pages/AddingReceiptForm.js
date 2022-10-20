import { StyleSheet, TouchableOpacity, Button, Text, View, TextInput, ScrollView } from "react-native";
import React, { useState, useLayoutEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Icon from "react-native-vector-icons/Entypo";
import PickerSelect from "react-native-picker-select";

export default function AddingReceiptForm({ navigation }) {
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
			title: "Dodaj nowy pargon",
		});
	});

	// Setting up variable to handle data in form
	const [form, setForm] = useState({ shop: "", shopAddress: "", products: [] });
	const [tempItem, setTempItem] = useState({ name: "", price: "", error: false });

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

	// Function handling adding new item to receipe
	const handleNewItem = () => {
		if (tempItem.name && tempItem.price) {
			setForm({ ...form, products: [...form.products, { key: form.products.length, name: tempItem.name, price: tempItem.price }] });

			setTempItem({ name: "", price: "", error: false });
		} else setTempItem({ ...tempItem, error: true });
	};

	return (
		<View style={{ backgroundColor: "#f9f9ff", flex: 1, paddingHorizontal: "5%" }}>
			{/* Subtitle */}
			<Text style={styles.subtitle}>Sklep</Text>

			{/* Chosing shop */}
			<View style={styles.shopInput}>
				<PickerSelect
					onValueChange={(value) => setForm({ ...form, shop: value })}
					placeholder={{
						label: "Wybierz nazwę sklepu",
						value: null,
						color: "#002047",
					}}
					items={[
						{ label: "Football", value: "football" },
						{ label: "Baseball", value: "baseball" },
						{ label: "Hockey", value: "hockey" },
					]}
				/>
			</View>

			{/* Subtitle */}
			<Text style={styles.subtitle}>Dodaj nowy produkt</Text>

			{/* Adding new products to receipe */}
			<View style={styles.inputsContainer}>
				{/* Form inputs */}
				<TextInput value={tempItem.name} onChangeText={(name) => setTempItem({ ...tempItem, name: name })} style={styles.inputItem} placeholder="Nazwa produktu..." placeholderTextColor={"#00204750"} />
				<TextInput keyboardType="numeric" value={tempItem.price} onChangeText={(price) => setTempItem({ ...tempItem, price: price })} style={styles.inputPrice} placeholder="Cena" placeholderTextColor={"#00204750"} />

				{/* Confirm button */}
				<TouchableOpacity style={styles.buttonConfirm} onPress={handleNewItem}>
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
									let afterDelete = form.products.filter((item) => item != form.products.find((x) => x.key == product.key));

									setForm({ ...form, products: afterDelete });
								}}
							>
								<Icon name="cross" style={{ color: "#fe2926" }} size={25} />
							</TouchableOpacity>
						</View>
					);
				})}
			</ScrollView>

			{/* Go to adding receipe by camera window */}
			<TouchableOpacity onPress={() => navigation.goBack()} style={styles.cameraIcon}>
				<Icon name="camera" style={{ color: "#fff" }} size={25} />
			</TouchableOpacity>

			{/* Forward icon */}
			<TouchableOpacity onPress={() => navigation} style={styles.iconForward}>
				<Icon name="arrow-right" style={{ color: "#fff" }} size={25} />
			</TouchableOpacity>
		</View>
	);
}

// Style sheet
const styles = StyleSheet.create({
	cameraIcon: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		left: 10,
		padding: 15,
		borderRadius: 50,
	},
	iconForward: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		right: 10,
		padding: 15,
		borderRadius: 50,
	},

	subtitle: {
		fontFamily: "Ubuntu_Bold",
		fontSize: 20,
		marginTop: 25,
		color: "#002047",
	},
	shopInput: {
		width: "100%",
		marginTop: 20,
		padding: 15,
		borderColor: "#002047",
		borderWidth: 2,
		borderRadius: 12,
	},

	// Adding item styling
	inputsContainer: {
		flexDirection: "row",
		flexWrap: "wrap",
	},
	inputItem: {
		width: "80%",
		marginTop: 20,
		padding: 15,
		borderColor: "#002047",
		borderWidth: 2,
		borderRadius: 12,
	},
	inputPrice: {
		width: "17.5%",
		marginStart: "2.5%",
		marginTop: 20,
		padding: 7.5,
		textAlign: "center",
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
