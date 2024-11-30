import { useLayoutEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import { useContext } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import Button from "../components/UI/Button";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/UI/ManageExpense/ExpenseForm";

function ManageExpenses({route, navigation}) {
  const editedExpenseId = route.params?.expenseId;

  const isEditting = !!editedExpenseId;//js te varsa true yoksa false yapma yolu !!

  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() =>{
    
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense"
    });
    }, [navigation,isEditting]);


    function deleteExpenseHandler(){
      expenseCtx.deleteExpense(editedExpenseId);
      navigation.goBack();

    }

    function cancelHandler(){
      navigation.goBack();

    }
 

    function confirmHandler(expenseData){
      if(isEditting){
        expenseCtx.updateExpense(editedExpenseId,expenseData);
      }else{
        expenseCtx.addExpense(expenseData);
        }
      
      navigation.goBack();
    }

  return (
    <View style={styles.container}>
      <ExpenseForm submitButtonLabel={isEditting ? "Update" : "Add"} 
      onCancel={cancelHandler} onSubmit={confirmHandler}
      defaultValues={selectedExpense}/>
      
      {isEditting && 
      <View style={styles.deleteContainer}>
        <IconButton icon="trash" color={GlobalStyles.colors.error500} size={36} onPress={deleteExpenseHandler}></IconButton>
      </View>
}
    </View>

  )
}

export default ManageExpenses;

const styles= StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary800

  },
  deleteContainer:{
    marginTop:16,
    paddingTop:8,
    borderWidth:2,
    borderTopColor:GlobalStyles.colors.primary200,
    alignItems:"center"
  },
  
})