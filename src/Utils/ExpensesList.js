function getExpensesList() {
    const expenses = localStorage.getItem('expenses')
    if (expenses === null) {
        return [];
    }
    else {
        return JSON.parse(expenses);
    }
}

export default getExpensesList
