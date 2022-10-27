
export const updateObjectInArray = (items, itemId, nameOfProperty, newPropertyOfObj) => {
    return items.map( (user) => {
        if (user[nameOfProperty] === itemId) {
            return {...user, ...newPropertyOfObj}
        }
        return (user)
    })
}