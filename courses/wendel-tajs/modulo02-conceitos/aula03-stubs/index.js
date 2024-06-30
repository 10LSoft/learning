import Service from "./src/service.js"

const service = new Service({ filename: 'users.ndjson' })

const data = {
  username: `user-${Date.now()}`,
  password: 'mysecretunderscoveredpassword'
}

await service.create(data)

const users = await service.read()

console.log('users', users)
