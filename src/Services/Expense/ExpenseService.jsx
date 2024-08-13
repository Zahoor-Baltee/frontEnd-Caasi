import { ExecuteGet, ExecutePost } from "../ApiServices";

export const ExpenseService = {
    async createExpense(data) {
        let response = await ExecutePost("expense/expenses", data);
        return response;
    },

    async getlist() {
        let response = await ExecuteGet("expense/list");
        return response;
    },
    async getDetail(data) {
        let response = await ExecuteGet(`expense/${data.id}/detail`);
        return response;
    },

};