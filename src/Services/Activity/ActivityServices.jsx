import { ExecuteGet, ExecutePost } from "../ApiServices";

export const ActivityService = {
    async createActivity(data) {
        let response = await ExecutePost("activity/create", data);
        return response;
    },

    async getlist() {
        let response = await ExecuteGet("activity/list");
        return response;
    },
    async getDetail(data) {
        let response = await ExecuteGet(`expense/${data.id}/datail`);
        return response;
    },
};