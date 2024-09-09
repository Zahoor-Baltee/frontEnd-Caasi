import { ExecuteGet, ExecutePost } from "../ApiServices";

export const AdvancedSettingServices = {
    async createAdvanceSettings(data) {
        let response = await ExecutePost("advancedsettings/create", data);
        return response;
    },
};