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
    }
}