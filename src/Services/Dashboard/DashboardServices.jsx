import { ExecuteGet, ExecutePost } from "../ApiServices";

export const DashboardService = {
    async getActivityReportsByMonth(data) {
        let response = await ExecuteGet(`activity/datailbymonth?userId=${data.userId}&month=${data.month}&year=${data.year}`);
        return response;
    },
    async getAbsenceReportsByMonth(data) {
        let response = await ExecuteGet(`absences/getabsencebymonth?userId=${data.userId}&month=${data.month}&year=${data.year}`);
        return response;
    },
    async getExpenseListByMonth(data) {
        let response = await ExecuteGet(`expense/getexpensebymonth?userId=${data.userId}&month=${data.month}&year=${data.year}`);
        return response;
    },
};