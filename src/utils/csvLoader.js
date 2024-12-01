export const loadCSV = async (filePath) => {
    const response = await fetch(filePath);
    const text = await response.text();
    const rows = text.split("\n");

    // Filter out empty rows
    const nonEmptyRows = rows.filter(row => row.trim() !== "");

    const headers = nonEmptyRows[0].split(",").map(header => header.trim());

    // Parse CSV data
    return nonEmptyRows.slice(1).map((row) => {
        const values = row.split(",").map(value => value.trim());
        
        if (values.length !== headers.length) {
            console.warn(`Skipping malformed row: ${row}`);
            return null; // Skip malformed rows
        }

        return headers.reduce((acc, header, index) => {
            acc[header] = values[index] || ""; // Default empty string if undefined
            return acc;
        }, {});
    }).filter(item => item !== null); // Filter out null rows
};
