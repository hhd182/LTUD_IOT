
export function CheckWarning(data, setIsWarning) {
    if (data.temperature >= 40) {
        setIsWarning(prevState => ({
            ...prevState,
            temperature: true
        }));
    } else {
        setIsWarning(prevState => ({
            ...prevState,
            temperature: false
        }));
    }

    if (data.humidity >= 90) {
        setIsWarning(prevState => ({
            ...prevState,
            humidity: true
        }));
    } else {
        setIsWarning(prevState => ({
            ...prevState,
            humidity: false
        }));
    }

    if (data.light >= 600) {
        setIsWarning(prevState => ({
            ...prevState,
            light: true
        }));

    } else {
        setIsWarning(prevState => ({
            ...prevState,
            light: false
        }));
    }
}