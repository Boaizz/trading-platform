module.exports = (error) => {
    return error.details.map(err => err.message.replace(/"/g,'')).join(", ");
}