const axios = require('axios')
const logger = require('./logger')
const paginate = require('./paginate')

const offset = 20

const ftApi = axios.create({
  baseURL: 'http://api.ft.com/content/search/v1',
  timeout: 1000,
  headers: {
    'X-Api-Key': process.env.API_KEY,
    'Content-Type': 'application/json',
  },
})

const search = async (term, index) => {
  const data = {
    results: {},
    pagination: {},
  }

  try {
    logger.info(`🔎 Searching headlines for: ${term}`)
    const response = await ftApi.post('/', {
      queryString: `title:"${term}"`,
      resultContext: {
        offset: index,
        maxResults: 20,
        aspects: ['title', 'lifecycle', 'location', 'editorial'],
      },
    })

    // eslint-disable-next-line prefer-destructuring
    const apiResults = response.data.results[0]
    data.results = apiResults.results
    data.pagination = paginate(index, offset, apiResults.indexCount)
  } catch (error) {
    logger.error(error)
  }

  return data
}

module.exports = search
