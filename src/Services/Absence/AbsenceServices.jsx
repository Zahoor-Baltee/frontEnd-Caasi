import { ExecuteGet, ExecutePost } from "../ApiServices";

export const AbsenceServices = {
    async createAbsence(data) {
        let response = await ExecutePost("absences/create", data);
        return response;
    },
    async getlist() {
        let response = await ExecuteGet("absence/list");
        return response;
    },
};