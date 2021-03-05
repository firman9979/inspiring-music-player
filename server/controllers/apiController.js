const axios = require("axios")

class apiController {
  static quotes (req, res, next) {
      axios.get('https://api.adviceslip.com/advice')
      .then(result => {
        res.status(200).json(result.data.slip.advice)
      })
      .catch(err => {
        next({code: 500, message: 'Internal server error.'})
      })
  }

  static pictures (req, res, next) {
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
        next({code: 500, message: 'Internal server error.'})
      })
  }

  static getNews (req, res, next) {
    axios.get(`http://newsapi.org/v2/top-headlines?country=id&apiKey=${process.env.NEWS_APIKEY}`)
    .then(result => {
      let articles = [];
      result.data.articles.forEach(article => {
        articles.push({
          title: article.title,
          content: article.content,
          published: new Date(article.publishedAt).toLocaleString('sv-SE', {dataStyle: 'short'}),
          url: article.url,
          image_url: article.urlToImage
        });
      })

      res.status(200).json(articles)
    })
    .catch(err => {
      next({code: 500, message: 'Internal server error.'})
    })

  }

}

module.exports = apiController