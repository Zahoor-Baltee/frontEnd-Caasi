import { ExecuteGet, ExecutePatch, ExecutePost, ExecuteDelete } from "../ApiServices";

export const UserServices = {
  async loginUser(data) {
    let response = await ExecutePost("users/login", data);
    return response;
  },
  async getlist() {
    let response = await ExecuteGet("users/list");
    return response;
  },
  async getDetail(data) {
    let response = await ExecuteGet(`users/${data.id}/detail`);
    return response;
  },
  async creatUsers(data) {
    let response = await ExecutePost(`users/create`, data);
    return response;
  },
  async updateUsers(id, data) {
    let response = await ExecutePatch(`users/${id}/update`, data);
    return response;
  },
  async logout(data) {
    let response = await ExecutePost(`users/logout`, data);
    return response;
  },
  async getUserDropdown(data) {
    let response = await ExecuteGet(`users/users-dropdown`, data);
    return response;
  },
  async deleteUser(data) {
    let response = await ExecuteDelete(`users/${data.id}/delete`);
    return response;
  },
};
