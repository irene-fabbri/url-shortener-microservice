const request = require('supertest');
const app = require('./app')

describe('Allowed Methods', () => {
    it('should allow for POST requests', async () => {
      const res = await request(app)
        .post('/api/shorturl/')
        .send({
            "data": 
            { 
                "type": "url",
                "attributes": 
                    {
                        "url": "https://youtube.com"
                    }
                }
        });
      expect(res.statusCode).toEqual(200);
    });

    it('should allow for GET requests', async () => {
        // The URLList has one item, the one corresponding to the post request
        const res = await request(app)
          .get('/api/shorturl/1')
        expect(res.statusCode).toEqual(302);
    });

    it('should NOT allow for PUT requests', async () => {
        const res = await request(app)
            .put('/api/shorturl/')
            .send({
                "data": 
                { 
                    "type": "url",
                    "attributes": 
                        {
                            "url": "https://youtube.com"
                        }
                    }
            });
          expect(res.statusCode).toEqual(405);
    });

    it('should NOT allow for DELETE requests', async () => {
        const res = await request(app)
          .delete('/api/shorturl')
          .send({
            "data": 
            { 
                "type": "url",
                "attributes": 
                    {
                        "url": "https://youtube.com"
                    }
                }
        });
      expect(res.statusCode).toEqual(405);
    });
});

describe('Invalid JSON', () => {
    it('should give 400 for invalid JSON', async () => {
        const res = await request(app)
        .post('/api/shorturl')
        .send([1,2]);
        expect(res.statusCode).toEqual(400)
    });
});

describe('Missing path', () => {
    it('should give 404 for missing path', async () => {
      const res = await request(app)
        .post('/path')
        .send({
            "data": 
            { 
                "type": "url",
                "attributes": 
                    {
                        "url": "https://youtube.com"
                    }
                }
        });
      expect(res.statusCode).toEqual(404);
    });
});

describe('Input validation', () => {
    it('should give 200 for valid request', async () => {
        const res = await request(app)
        .post('/api/shorturl/')
        .send({
            "data": 
            { 
                "type": "url",
                "attributes": 
                    {
                        "url": "https://youtube.com"
                    }
                }
        });
        expect(res.statusCode).toEqual(200);
    });

    it('should give 400 for missing body', async () => {
      const res = await request(app)
        .post('/api/shorturl')
      expect(res.statusCode).toEqual(400);
    });

    it('should give 400 for missing body attributes', async () => {
        const res = await request(app)
        .post('/api/shorturl/')
        .send({
            "data": 
            { 
                "type": "url",
                "stuff": 
                    {
                        "url": "https://youtube.com"
                    }
                }
        });
        expect(res.statusCode).toEqual(400);
    });

    it('should give 400 for missing url', async () => {
        const res = await request(app)
        .post('/api/shorturl/')
        .send({
            "data": 
            { 
                "type": "url",
                "attributes": 
                    {
                        "urlo": "https://youtube.com"
                    }
                }
        });
        expect(res.statusCode).toEqual(400);
    });

    it('should give 400 for too many arguments', async () => {
        const res = await request(app)
        .post('/api/shorturl/')
        .send({
            "data": 
            { 
                "type": "url",
                "attributes": 
                    {
                        "url": "https://youtube.com",
                        "url2": "https://tomorrowdevs.com"
                    }
                }
        });
        expect(res.statusCode).toEqual(400);
      });
});