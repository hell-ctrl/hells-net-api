const existsOrError = (value, error) => {
    if(!value) throw error
    if(Array.isArray(value) && value.length == 0) throw error
    if(typeof value === 'string' && !value.trim()) throw error
}

const notExistsOrError = (value, error) => {
    try {
        existsOrError(value, error)
    } catch {
        return
    }

    throw error

}

const equalOrError = (valueA, valueB, error) => {
    if(valueA !== valueB) throw error
}

const validOrError = (email, error) => {
    var emailRegex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+?$/i;
    if(!emailRegex.test(email)) throw error
}   

module.exports = { existsOrError, notExistsOrError, equalOrError, validOrError }