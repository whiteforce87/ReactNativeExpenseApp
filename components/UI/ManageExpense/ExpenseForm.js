import { View, StyleSheet, Text , Alert} from "react-native";
import { useState } from "react";
import Input from "./Input";
import Button from "../Button";
import { getFormattedDate } from "../../../util/date";
import { GlobalStyles } from "../../../constants/styles";

function ExpenseForm({onCancel, onSubmit, submitButtonLabel, defaultValues}) {
    const [inputs, setInputs] = useState({
        amount:{
            value: defaultValues ? defaultValues.amount.toString() : "",
            isValid: true },
        date:{
            value: defaultValues ? getFormattedDate(defaultValues.date): "",
            isValid: true},
        description:{
            value: defaultValues ? defaultValues.description : "",
            isValid: true
        }
    });


function inputChangeHandler(inputIdentifier, enteredValue){
    setInputs((currentInputs) =>{
        return {
            ...currentInputs, 
            [inputIdentifier]:{value: enteredValue, isValid: true}}
    });
}

function submitHandler(){
    const expenseData = {
        amount: + inputs.amount.value,
        date: new Date(inputs.date.value),
        description: inputs.description.value
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
        //Alert.alert("Invalid input", "Please check the input values")
        setInputs((currentInputs) => {
            return{
                amount: {value: currentInputs.amount.value, isValid: amountIsValid},
                date: {value: currentInputs.date.value, isValid: dateIsValid},
                description: {value: currentInputs.description.value, isValid: descriptionIsValid},

            }
        } )
        return;
    }

    onSubmit(expenseData);

}

const formIsInValid = !inputs.amount.isValid || !inputs.amount.isValid || !inputs.description.isValid;
 
return (
    <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputRow}>
            <Input style={styles.rowInput} label={"Amount"} textInputConfig={{
                keyboardType:"decimal-pad",
                onChangeText:inputChangeHandler.bind(this,"amount"),//metodun ilk parametresine bağlıyoruz
                value: inputs.amount.value
            }}
            invalid={!inputs.amount.isValid}
        />
            <Input style={styles.rowInput} label={"Date"} textInputConfig={{
                placeholder:"YYYY-MM-DD",
                maxLength:10,
                onChangeText:inputChangeHandler.bind(this,"date"),
                value: inputs.date.value
            }}
            invalid={!inputs.date.isValid}
            />
        </View>
            <Input  label={"Description"} textInputConfig={{
                multiline:true,
                onChangeText:inputChangeHandler.bind(this,"description"),
                value: inputs.description.value
                //autocorrect:false,
                //autoCapitalize:"none",
            }}
            invalid={!inputs.description.isValid}
            />
        
        {formIsInValid && <Text style={styles.errorText}>Invalid input values - please check your entered data!</Text>}
        
        <View style={styles.buttons}>
            <Button style={styles.button} mode="flat" onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>
                {submitButtonLabel}
            </Button>
        </View>
    </View>

  )
}

export default ExpenseForm;

const styles = StyleSheet.create({
    form:{
        marginTop:14
    },
    title:{
        fontSize:24,
        fontWeight:"bold",
        color:"white",
        marginVertical:24,
        textAlign:"center"

    },
    inputRow:{
        flexDirection:"row",
        justifyContent:"space-between",
    },
    rowInput:{
        flex:1
    },
    errorText:{
        textAlign:"center",
        color:GlobalStyles.colors.error500,
        margin:8
    },
    buttons:{
        flexDirection:"row",
        justifyContent:"center",
        alignItems:"center"
      },
      button:{
          minWidth: 120,
          marginHorizontal:8
      }
})