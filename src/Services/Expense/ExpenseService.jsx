import { ExecutePost } from "../ApiServices";

export const ExpenseService = {
    async createExpense(data) {
        let response = await ExecutePost("expense/expenses", data);
        return response;
    },

};