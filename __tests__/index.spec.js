const request = require('supertest')
const app = require('../server')

describe('GET /index', () => {
  it('responds with a 200 status', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })
})
