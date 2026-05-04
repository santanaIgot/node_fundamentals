import { Database } from "./database.js";
import { randomUUID } from "node:crypto" 


const database = new Database();

export const route = [
    {
        method: 'GET',
        path: '/users',
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: '/users',
        handler: (req, res) => {
            const {nome, email} = req.body;
            // users.push({id: 1,nome, email})

            const user = {
                id: randomUUID(),
                nome, 
                email
            }

            database.insert('users', user)
            return res.end('Usuário cadastrado')
        }
    }
]