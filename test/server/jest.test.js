import request from 'supertest'
import routes from '../../server/server'

test('Login route redirects', () => {
  return request(routes)
    .get('/api/v1/login')
    .then((res) => {
      expect(res.statusCode).toBe(302)
    })
})

// test('Login route generates a 16 digit string different to the last', () => {
//   return request(routes)
//     .get('/api/v1/login')
//     .then(())
// })