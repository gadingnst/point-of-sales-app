export const rupiah = price => {
    try {
        let splitted
        price = Number.isNaN(price) || Number(price).toFixed(2)
        splitted = String(price).split('.')
        price = String(splitted[0])
            .split('')
            .reverse()
            .join('')
        price = price.match(/\d{1,3}/g)
        return (
            'Rp. ' +
            `${splitted[1]
                .split('')
                .reverse()
                .join('')},${price.join('.')}`
                .split('')
                .reverse()
                .join('')
        )
    } catch (err) {
        return 0
    }
}
