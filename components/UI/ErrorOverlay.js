
import { GlobalStyles } from "../../constants/styles";
import { View,Text, StyleSheet } from "react-native";
import Button from "./Button";


function ErrorOverlay({message, onConfirm}) {
  return (
    <View style={styles.container}>
        <Text style={[styles.text, styles.title]}>An Error Occured!</Text>
        <Text style={styles.text}>{message}</Text>
        {/*<Button onPress={onConfirm}>Okay</Button>*/}
    </View>
    )
}

export default ErrorOverlay;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:"center",
        alignItems:"center",
        padding:24,
        backgroundColor: GlobalStyles.colors.primary700
    },
    text:{
        textAlign:"center",
        marginBottom:8,
        color:"white"
    },
    title:{
        fontSize:20,
        fontWeight:"bold",
    },
    message:{
        fontSize:20,
        fontWeight:"bold"
    }
})