import { useLayoutEffect, useState } from "react";
import { View, StyleSheet} from "react-native";
import { useContext } from "react";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";
import { ExpensesContext } from "../store/expenses-context";
import ExpenseForm from "../components/UI/ManageExpense/ExpenseForm";
import { storeExpense, deleteExpense, updateExpense } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function ManageExpenses({route, navigation}) {

  const [error, setError] = useState();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const editedExpenseId = route.params?.expenseId;

  const isEditting = !!editedExpenseId;//js te varsa true yoksa false yapma yolu !!

  const expenseCtx = useContext(ExpensesContext);

  const selectedExpense = expenseCtx.expenses.find(expense => expense.id === editedExpenseId)

  useLayoutEffect(() =>{
    
    navigation.setOptions({
      title: isEditting ? "Edit Expense" : "Add Expense"
    });
    }, [navigation,isEditting]);


    async function deleteExpenseHandler(){

      setIsSubmitting(true);
      try{
        await deleteExpense(editedExpenseId);
        expenseCtx.deleteExpense(editedExpenseId);
        navigation.goBack();// ekran geri gittiği için spinneri false etmeye gerk yok
      }catch(error){
        setError("Couldnt delete expense - Try again later!")
      }
     setIsSubmitting(false);

    }

    function cancelHandler(){
      navigation.goBack();

    }
 

    async function confirmHandler(expenseData){
      setIsSubmitting(true);


      try{
        if(isEditting){
          expenseCtx.updateExpense(editedExpenseId,expenseData);
          await updateExpense(editedExpenseId,expenseData);
        }else{
          const id  = await storeExpense(expenseData);
          expenseCtx.addExpense({...expenseData, id:id});
          }
        navigation.goBack();

      }catch(error){
        setError("Couldnt set data - try agian later!")
        setIsSubmitting(false);
      }
      
    }

    ///function errorHandler(){
     // setError(null);
   // }

    if(error && !isSubmitting){
      //return <ErrorOverlay message={error} onConfirm={errorHandler}/>
      return <ErrorOverlay message={error}/>

    }

    if(isSubmitting){
      return <LoadingOverlay/>
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