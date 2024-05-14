export const isJSON = (str) => {
    try {
        const json = JSON.parse(str);
        if (Object.prototype.toString.call(json).slice(8, -1) !== 'Object') {
            return false
        }
    } catch (e) {
        return false
    }
    return true
}

export function isToday(date) {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
}