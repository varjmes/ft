const axios = require('axios')
const logger = require('./logger')

const ftApi = axios.create({
  baseURL: 'http://api.ft.com/content/search/v1',
  timeout: 1000,
  headers: {
    'X-Api-Key': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
})

const search = async (term) => {
  let results = []

  try {
    logger.info(`🔎 Searching headlines for: ${term}`)
    const response = await ftApi.post('/', {
      queryString: `title:"${term}"`,
      resultContext: {
        maxResults: 20,
        aspects: ['title', 'lifecycle', 'location', 'summary', 'editorial'],
      },
    })

    results = response.data.results[0].results
  } catch (error) {
    logger.error(error)
  }

  return results
}

module.exports = search
