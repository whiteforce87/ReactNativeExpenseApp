import { createContext, useReducer } from "react";



const DUMMY_EXPENSES= [{
    id:"e1",
    description:"A pair of shoes",
    amount: 59.99,
    date: new Date("2021-12-19")
},
{
    id:"e2",
    description:"A pair of trousers",
    amount: 19.99,
    date: new Date("2021-12-11")
},
{
    id:"e3",
    description:"A pair of dress",
    amount: 79.99,
    date: new Date("2024-12-09")
},
{
    id:"e4",
    description:"A pair of glass",
    amount: 39.99,
    date: new Date("2024-12-21")
}
]

export const ExpensesContext = createContext({
    expenses: [],
    addExpense: ({description, amount, date}) =>{},
    deleteEXpense: (id) =>{},
    updateExpense: (id, {description, amount, date}) =>{}
});

function expensesReducer(state, action){
    switch (action.type) {
        case "ADD":
            const id = new Date().toString() + Math.random().toString();
            return [{...action.payload, id: id},...state];
        case "UPDATE":
            const updatableExpenseIndex = state.findIndex((expense) => expense.id === action.payload.id);
            const updatableExpense= state[updatableExpenseIndex];
            const updatedItem = {...updatableExpense, ...action.payload.data};
            const updatedExpenses = [...state];
            updatedExpenses[updatableExpenseIndex] =  updatedItem;
            return updatedExpenses;
        case "DELETE":
            return state.filter((expense) => expense.id !== action.payload)
            
        default:
            return state;
    }
}

function ExpensesContextProvider({children}){

    const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

    function addExpense(expenseData){
        dispatch({type: "ADD", payload: expenseData});
    }

    function deleteExpense(id){
        dispatch({type: "DELETE", payload: id});
    }

    function updateExpense(id, expenseData){
        dispatch({type: "UPDATE", payload: {id, data: expenseData}});
    }

    const value={
        expenses: expensesState,
        addExpense: addExpense,
        updateExpense: updateExpense,
        deleteExpense: deleteExpense
    };

    return <ExpensesContext.Provider value={value}>{children}</ExpensesContext.Provider>

}

export default ExpensesContextProvider;

