const errorHandler = (err, res) => {
    if (err.name === "SequelizeValidationError") {
        let errorsArr = []
        err.errors.forEach(e => {
            errorsArr.push(e.message)
        })
        res.status(400).json({message: errorsArr})
    } else if (err.code === 404) {
        res.status(404).json({message: "Resource not found"})
    } else if (err.code === 500) {
        res.status(500).json({message: "Internal server error"})
    }
}

module.exports = {errorHandler}