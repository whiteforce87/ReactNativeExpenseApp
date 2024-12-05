import { useContext, useEffect, useState } from "react";
import ExpensesOutput from "../components/ExpensesOutput";
import { ExpensesContext } from "../store/expenses-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";


function RecentExpenses() {

const expensesCtx = useContext(ExpensesContext);
//const [fetchedExpenses, setFetchExpenses] = useState([]);

const [isFetching, setIsFectching] = useState(true);
const[error, setError] = useState();


useEffect(() =>{
  async function getExpenses(){
    setIsFectching(true);
    try{
      const expenses = await fetchExpenses();
      expensesCtx.setExpenses(expenses);
    }catch(error){
      setError("Could not fetch Expenses!")
    }
    setIsFectching(false);
  }

  getExpenses();
}, [])

//function errorHandler(){
 // setError(null);
//}

if(error && !isFetching){
  //return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  return <ErrorOverlay message={error}/>

}

if(isFetching){
  return <LoadingOverlay />
}

  const recentExpenses = expensesCtx.expenses.filter( (expense) =>{
  //const recentExpenses = fetchedExpenses.filter((expense) =>{

  const today = new Date();
  const date7DaysAgo = getDateMinusDays(today, 7);

  return (expense.date >= date7DaysAgo) && (expense.date <= today);

} );

  return (
    <ExpensesOutput expenses= {recentExpenses} expensesPeriod="Last 7 Days" fallbackText={"No Recent expenses registered for last 7 days"}/>

  )
}

export default RecentExpenses;