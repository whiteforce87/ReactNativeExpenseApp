export function getFormattedDate(date){
    //return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}` //date 0 dan baslıor indexten 1 eklioruz
    return date.toISOString().slice(0,10); //date 0 dan baslıor indexten 1 eklioruz

}

export function getDateMinusDays(date, days){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate()- days);
}