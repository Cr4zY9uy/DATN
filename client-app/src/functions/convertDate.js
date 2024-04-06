const convertToDate = (date) => {
    const d = new Date(date);
    let text = d.toLocaleString();
    return text;
}

export default convertToDate;