export const transformData = (data) => {
    const mergedData = {};

    // Helper function to merge counts into the mergedData object
    const mergeCounts = (array, index) => {
        if (array && Array.isArray(array)) {
            array.forEach(item => {
                if (!mergedData[item._id]) {
                    // Initialize the entry with an array for counts
                    mergedData[item._id] = { name: item._id, counts: [0, 0, 0, 0] };
                }
                // Update the count at the specified index
                mergedData[item._id].counts[index] = item.count;
            });
        }
    };

    // Merge each array into the mergedData object using the corresponding index
    mergeCounts(data.productNewPerDay, 0); // index 0 for product
    mergeCounts(data.categoryNewPerDay, 1); // index 1 for category
    mergeCounts(data.orderNewPerDay, 2); // index 2 for order
    mergeCounts(data.userNewPerDay, 3); // index 3 for customer

    // Convert mergedData object to an array
    return Object.values(mergedData).map(item => ({
        Date: item.name,
        Product: item.counts[0],
        Category: item.counts[1],
        Order: item.counts[2],
        Customer: item.counts[3]
    }));
};
