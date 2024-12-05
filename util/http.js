import axios from "axios";

const BACKEND_URL = 'https://react-native-project-4d2ed-default-rtdb.europe-west1.firebasedatabase.app';

export async function storeExpense(expenseData){
    const response = await axios.post(BACKEND_URL + "/expenses.json", expenseData);
    const id = response.data.name;//Firebase de bu id olarak dönüyor
    return id;
}

export async function fetchExpenses(){
    const response = await axios.get(BACKEND_URL + "/expenses.json");

    const expenses = [];

    for (const key in response.data){
        const expenseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        expenses.push(expenseObj);
    }

    return expenses;

}

export function updateExpense(id, expenseData){
    return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);//Firebase bu sekilde
}

export function deleteExpense(id){
    return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}