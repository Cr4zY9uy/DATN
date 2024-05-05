export const countRating = (ratings) => {
    const sumRating = 0
    if (ratings.length < 1 || !Array.isArray(ratings)) return sumRating
    const result = ratings.reduce(
        (acc, curr) => acc + curr,
        sumRating
    )
    return (result / ratings.length).toFixed(1)
}