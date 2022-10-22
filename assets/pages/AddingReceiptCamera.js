import { StyleSheet, Text, TouchableOpacity, StatusBar } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/Entypo";

export default function AddingReceiptCamera({ navigation }) {
	// Setting up camera and variables for photo and flag if camera has permissions
	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [photo, setPhoto] = useState();

	// Asking for camera permissions on load
	useEffect(() => {
		(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraPermission.status === "granted");
		})();
	}, []);

	// Camera status if access isn't granted
	if (hasCameraPermission === undefined) {
		return <Text>Requesting permissions...</Text>;
	} else if (!hasCameraPermission) {
		return <Text>Permission for camera not granted. Please change this in settings.</Text>;
	}

	let takePic = async () => {
		// Camera options
		let options = {
			quality: 1,
			base64: true,
			exif: false,
		};

		// Saving taken photo
		let newPhoto = await cameraRef.current.takePictureAsync(options);
		setPhoto(newPhoto);

		navigation.navigate("AddingReceiptForm");
	};

	return (
		<Camera flashMode={"auto"} style={styles.view} ref={cameraRef}>
			<StatusBar hidden={true} />

			{/* Taking photo icon */}
			<TouchableOpacity onPress={() => takePic()} style={styles.cameraIcon}>
				<Icon name="camera" style={{ color: "#fff" }} size={40} />
			</TouchableOpacity>

			{/* Go to manually adding receipt window */}
			<TouchableOpacity onPress={() => navigation.push("AddingReceiptForm")} style={styles.addingManuallyIcon}>
				<Icon name="new-message" style={{ color: "#fff" }} size={30} />
			</TouchableOpacity>

			<Text style={styles.beta}>BETA</Text>
		</Camera>
	);
}

// Style sheet
const styles = StyleSheet.create({
	beta: {
		position: "absolute",
		color: "#fff",
		backgroundColor: "#002047",
		top: 75,
		paddingVertical: 5,
		paddingHorizontal: 12.5,
		fontSize: 18,
		fontWeight: "700",
	},
	view: {
		flex: 1,
	},
	cameraIcon: {
		backgroundColor: "#fe2926",
		position: "absolute",
		bottom: 30,
		padding: 15,
		alignSelf: "center",
		borderRadius: 50,
	},
	addingManuallyIcon: {
		backgroundColor: "#002047",
		position: "absolute",
		bottom: 37.5,
		right: 10,
		padding: 15,
		borderRadius: 50,
	},
});
