const axios = require("axios")

class apiController {
  static quotes (req, res) {
      axios.get('https://api.adviceslip.com/advice')
      .then(result => {
        res.status(200).json(result.data.slip.advice)
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

  static pictures (req, res) {
    const id = [
      1011, 1015, 1016, 1018, 1019, 
      1021, 1022, 1035, 1038, 1040, 
      1041, 1044, 1045, 1049, 1050,
      1051, 1053, 1057, 1064, 11,
      120, 124, 128, 141, 147 
    ]
    let randomArr = Math.round(Math.random()*(id.length - 1))
    let randomId = id[+randomArr]
    axios.get(`https://picsum.photos/id/${randomId}/info`)
      .then(result => {
        res.status(200).json({result: result.data.download_url})
      })
      .catch(err => {
        res.status(400).json(err)
      })
  }

}

module.exports = apiController
