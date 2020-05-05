import * as request from 'supertest';
import * as application from '../../app';

let api;
let server;

beforeEach(async () => {
    server = await application.main();
    api = request.agent(server);

});
afterEach(async () => {
    await server.close();
});

afterAll(async () => {
    await server.close();
})

describe('/api/shoppingLists', () => {
    describe('GET /', () => {
        it('should return valid guest if request body is correct', async () => {
            
            const newGuest = {
                name: "Mat",
                lastName: "For",
                email: 'mat@for.pl',
                eventDate: new Date('05/21/2020')
            };

            const res = await api.post('/api/guests').send(newGuest);
            expect(res.status).toBe(200);
            expect(res.body).toHaveProperty("name", "Mat");
            expect(res.body).toHaveProperty("lastName", "For");
            expect(res.body).toHaveProperty("email", "mat@for.pl");
            expect(res.body).toHaveProperty("eventDate", "2020-05-20T22:00:00.000Z");
        });

        it('should return 400 if request body is not correct', async () => {
            
            const newGuest = {
                name: "Mat"
            };

            const res = await api.post('/api/guests').send(newGuest);
            expect(res.status).toBe(400);
        });
    });
});