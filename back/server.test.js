const base_url = "http://localhost:3000"

describe('User test', () => {
  it('Get all users', async () => {
    const result = await fetch(`${base_url}/users`)
  })

  it ('Get one user', async () => {
    const result = await fetch(`${base_url}/users/1`)
  })

  it ('Add user', async () => {
    const result = await fetch(`${base_url}/users`)
  })

  it ('Update user', async () => {
    const result = await fetch(`${base_url}/users/1`)
  })
  
  it ('Delete user', async () => {
    const result = await fetch(`${base_url}/users/1`)
  })
})

describe('Product test', () => {
  it('Get all products', async () => {
    const result = await fetch(`${base_url}/products`)
  })

  it ('Get one product', async () => {
    const result = await fetch(`${base_url}/products/1`)
  })

  it ('Add product', async () => {
    const result = await fetch(`${base_url}/products`)
  })

  it ('Update product', async () => {
    const result = await fetch(`${base_url}/products/1`)
  })
  
  it ('Delete product', async () => {
    const result = await fetch(`${base_url}/products/1`)
  })
})

describe('categories test', () => {
  it('Get all products', async () => {
    const result = await fetch(`${base_url}/categories`)
  })

  it('Get one category', async () => {
    const result = await fetch(`${base_url}/categories/1`)
  })
})
