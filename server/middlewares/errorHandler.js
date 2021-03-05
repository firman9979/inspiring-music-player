const errorHandler = (err, req, res, next) => {
    // console.log(err);
    if (err.name == "SequelizeValidationError") {
        let errorsArr = []
        err.errors.forEach(e => {
            errorsArr.push({msg: e.message})
        })
        res.status(400).json(errorsArr)
    } else if (err.code === 404) {
        res.status(err.code).json({message: err.message})
    } else if (err.code === 401) {
        res.status(err.code).json({message: err.message})
    } else if (err.code === 400) {
        console.log(err.code);
        res.status(err.code).json({message: err.message})
    } else {
        res.status(500).json({message: 'Interval server error.'})
    }
}

module.exports = {errorHandler}