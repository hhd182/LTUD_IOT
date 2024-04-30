export const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const sortDataAscending = (data, columnsort) => {
    return data.sort((a, b) => (a[columnsort] < b[columnsort]) ? -1 : (a[columnsort] > b[columnsort]) ? 1 : 0);
};

export const sortDataDescending = (data, columnsort) => {
    return data.sort((a, b) => (a[columnsort] > b[columnsort]) ? -1 : (a[columnsort] < b[columnsort]) ? 1 : 0);
};

export const convertDateFormatToVN = (type, dateString) => {
    const date = new Date(dateString);
    if (type === "year") {
        const formattedDate = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return formattedDate;
    }
    if (type === "time") {
        const formattedTime = `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
        return formattedTime;
    }
};
