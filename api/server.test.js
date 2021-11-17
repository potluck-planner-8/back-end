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

describe('[GET] /api/potlucks/', ()=>{
    
    test('respond with 200 status code', async()=>{
        
        let res = await supertest(server).post('/api/auth/register').send({
            username:"tomtom",password:"tomtom"
        });
        res = await supertest(server).post('/api/auth/login').send({
            username:"tomtom", password:"tomtom"
        })
        const token = res.body.token;
        expect(token).not.toEqual("");

        res = await supertest(server).get('/api/potlucks').set('Authorization', `${token}`);


        
    })

    test('respond with 401 status code', async()=>{

    })

})

describe('[POST] /api/potlucks/', ()=>{
    test('respond with 200 status code', async()=>{

    })

    test('respond with 401 status code', async()=>{

    })

    test('respond with 404 status code', async()=>{

    })

})

describe('[GET] /api/:potluck_id', ()=>{
    test('respond with 200 status code', async()=>{

    })

    test('respond with 401 status code', async()=>{

    })

    test('respond with 404 status code', async()=>{

    })

})

describe('[PUT] /api/:potluck_id', ()=>{
    test('respond with 200 status code', async()=>{

    })

    test('respond with 401 status code', async()=>{

    })

    test('respond with 404 status code', async()=>{

    })

})

describe('[DELETE] /api/:potluck_id', ()=>{
    test('respond with 200 status code', async()=>{

    })

    test('respond with 401 status code', async()=>{

    })

    test('respond with 404 status code', async()=>{

    })

})