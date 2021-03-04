const axios = require("axios")

class apiController{

    static quotes (req, res) {
        axios.get('https://api.adviceslip.com/advice')
        .then(result => {
          res.status(200).json(result.data.slip.advice)
        })
        .catch(err => {
          res.status(400).json(err)
        })
      }

}

module.exports = apiController