import { parse, format, subSeconds, addSeconds } from "date-fns"

export const convertDateFormat = (dateString) => {
    const [day, month, year] = dateString.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
};

export const convertDateFormatToVN = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    return formattedDate;
};

export const getTime = (date) => {
    const parts = date.split(' ');
    const timePart = parts[1];
    return timePart;
}

export const sortData = (data, columnsort, typesort) => {
    let avalue, bvalue;
    return data.sort((a, b) => {
        switch (columnsort) {
            case 'id':
                avalue = a.id;
                bvalue = b.id;
                break;
            case 'createdAt':
                avalue = a.createdAt;
                bvalue = b.createdAt;
                break;
            case 'temperature':
                avalue = a.temperature;
                bvalue = b.temperature;
                break;
            case 'humidity':
                avalue = a.humidity;
                bvalue = b.humidity;
                break;
            case 'light':
                avalue = a.light;
                bvalue = b.light;
                break;
            default:
                break;
        }
        if (typesort === 'ASC') {
            return avalue - bvalue;
        }
        return bvalue - avalue;
    });
};

export function convertDateFormatToUTC(dateString, type) {
    const parsedDate = parse(dateString, 'dd/MM/yyyy HH:mm:ss', new Date());
    let dateType
    if (type == "pre") {
        dateType = subSeconds(parsedDate, 1)
    } else {
        dateType = addSeconds(parsedDate, 1)
    }

    const formattedDateUTC = format(dateType, "yyyy-MM-dd'T'HH:mm:ss");

    return formattedDateUTC;
}