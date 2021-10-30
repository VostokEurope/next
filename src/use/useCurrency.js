
export default ({ position = 'r', currency = '₽', separator = ' ', decimal = ',', decimalCount = 0 } = {}) => {
    const formatMoney = (amount) => {
        const negativeSign = amount < 0 ? '-' : ''
        const i = parseInt(amount = Math.abs(Number(amount) || 0).toFixed(decimalCount)).toString()
        const j = (i.length > 3) ? i.length % 3 : 0

        return negativeSign
            + (j ? i.substr(0, j) + separator : '')
            + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + separator)
            + (decimalCount ? decimal + Math.abs(amount - i).toFixed(decimalCount).slice(2) : '')
    }
    const get = (number) => {
        return `${formatMoney(number)} ${currency}`
    }
    return {
        get
    }

}
