const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
];


export const Helpers = {
    generateClientId() {
        return 'client-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 15);
    },
    dateFormater(data) {
        let date = new Date(data)
        let month = date.getMonth();
        let day = date.getDate();
        let year = date.getFullYear();
        return `${day}-${monthNames[month]}-${year}`
    },
    dateFormater1(data) {
        let date = new Date(data)
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();

        let newDate = `${year}-${month < 10 ? "0" : ""}${month}-${day < 10 ? "0" : ""}${day}`
        console.log(newDate)
        return newDate
    }
}