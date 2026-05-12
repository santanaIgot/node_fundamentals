import { Database } from "./database.js";
import { randomUUID } from "node:crypto" 
import { buildRoutePath } from "./utils/build-route-path.js";


const database = new Database();

export const route = [
    {
        method: 'GET',
        path: buildRoutePath('/users'),
        handler: (req, res) => {
            const users = database.select('users')
            return res.end(JSON.stringify(users))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/users'),
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
    },
    {
        method: 'PUT',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params;
            const { nome, email } = req.body

            database.update('users', id, {
                nome, 
                email
            });

            return res.writeHead(204).end();
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/users/:id'),
        handler: (req, res) => {
            const {id} = req.params;
            console.log("🚀 ~ id:", id)

            database.delete('users', id);

            return res.writeHead(204).end();
        }
    }
]