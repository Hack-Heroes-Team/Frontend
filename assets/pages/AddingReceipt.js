import { StyleSheet, Text, TouchableOpacity, Image } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/Entypo";

export default function AddingReceipt({ navigation }) {
	let cameraRef = useRef();
	const [hasCameraPermission, setHasCameraPermission] = useState();
	const [photo, setPhoto] = useState();

	useEffect(() => {
		(async () => {
			const cameraPermission = await Camera.requestCameraPermissionsAsync();
			setHasCameraPermission(cameraPermission.status === "granted");
		})();
	}, []);

	if (hasCameraPermission === undefined) {
		return <Text>Requesting permissions...</Text>;
	} else if (!hasCameraPermission) {
		return <Text>Permission for camera not granted. Please change this in settings.</Text>;
	}

	let takePic = async () => {
		let options = {
			quality: 1,
			base64: true,
			exif: false,
		};

		let newPhoto = await cameraRef.current.takePictureAsync(options);
		setPhoto(newPhoto);
	};

	return (
		<Camera style={styles.container} ref={cameraRef}>
			<TouchableOpacity
				onPress={() => {
					takePic;
					navigation.goBack();
				}}
				style={styles.icon}
			>
				<Icon name="camera" style={{ color: "#fff" }} size={40} />
			</TouchableOpacity>
		</Camera>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	buttonContainer: {
		backgroundColor: "#fff",
		alignSelf: "flex-end",
	},
	preview: {
		alignSelf: "stretch",
		flex: 1,
	},
	icon: {
		backgroundColor: "#fe2926",
		position: "absolute",
		bottom: 30,
		padding: 15,
		alignSelf: "center",
		borderRadius: "50%",
	},
});
