import { createMocks } from 'node-mocks-http'
import { NextApiRequest, NextApiResponse } from 'next'
import { handler } from '../../pages/api/profile'

describe('Profile API', () => {
  it('updates user profile successfully', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        name: 'Updated Name',
        phoneNumber: '1234567890'
      }
    })

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(res._getStatusCode()).toBe(200)
    expect(JSON.parse(res._getData())).toMatchObject({
      name: 'Updated Name',
      phoneNumber: '1234567890'
    })
  })

  it('returns error for invalid profile update', async () => {
    const { req, res } = createMocks({
      method: 'PUT',
      body: {
        name: '',  // Invalid empty name
        phoneNumber: 'invalid'
      }
    })

    await handler(req as NextApiRequest, res as NextApiResponse)

    expect(res._getStatusCode()).toBe(400)
    expect(JSON.parse(res._getData())).toHaveProperty('error')
  })
})