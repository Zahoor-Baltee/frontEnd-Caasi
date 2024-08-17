import { ExecuteGet, ExecutePost } from "../ApiServices";

export const ExpenseService = {
    async createExpense(data) {
        let response = await ExecutePost("expense/create", data);
        return response;
    },

    async getlist() {
        let response = await ExecuteGet("expense/list");
        return response;
    },
    async getDetail(data) {
        let response = await ExecuteGet(`expense/detail/${data.id}`);
        return response;
    },

};