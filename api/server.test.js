const supertest = require("supertest");
const server = require("./server");
const db = require("./data/db-config");

test('sanity', ()=>{
  expect(true).toBe(true);  
})

beforeAll(
    async()=>{
        await db.migrate.rollback();
        await db.migrate.latest();
    }
);

beforeEach(
    async ()=>{

    }
)

afterAll(
    async ()=>{
        await db.destroy();
    }
)

describe('[POST] /api/auth/register', ()=>{
    test('responds with 201 status code', async()=>{
        const res = await supertest(server).post('/api/auth/register').send({
            username:"tomtom",password:"tomtom"
        });
        expect(res.status).toEqual(201);
    })
})

describe('[POST] /api/auth/login', ()=>{
    test('respond with 200 status code', async()=>{
        const res = await supertest(server).post('/api/auth/login').send({
            username:"tomtom", password:"tomtom"
        })
        expect(res.status).toEqual(200);
    })
})
