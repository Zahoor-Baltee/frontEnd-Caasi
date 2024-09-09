import { ExecuteGet, ExecutePost } from "../ApiServices";

export const AdvancedSettingServices = {
    async createActivity(data) {
        let response = await ExecutePost("advanced-settings/create", data);
        return response;
    },
};