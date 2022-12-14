const { response } = require('express');
const request = require('supertest');

const server = 'http://localhost:3000';


describe('Route integration', () => {


    beforeEach(() => {
        //use schema to create user object in mogodb
        //add new park visited with date notes and activities completed
        //could do a second park...
        user = {
            name: "Arthur", 
            parksVisited: {
                acad: {
                    date: "2022-12-01",
                    notes: "this park was fun",
                    activitiesCompleted: ["climbing"]
                },
                arch: {
                    date: "2022-12-02",
                    notes: "hi",
                    activitiesCompleted: ["biking" , "climbing"]
                }
            }
        }
      });




    describe('/', () =>{
        describe('GET', () =>{
            it('responds with 200 status and text/html content type', () =>{
                return request(server)
                  .get('/')
                  .expect('Content-Type', /text\/html/)
                  .expect(200)
            })
        });
    });

    describe('/user', () =>{
        describe('GET', () =>{
            it('responds with 200 status and application/json content type', () =>{
                return request(server)
                  .get('/user')
                  .expect('Content-Type', /application\/json/)
                  .expect(200)
            });
            it('parks from user collection are in body of response', () => {
                return request(server)
                    .get('/user')
                    .expect([acad, arch])
            })
        });
    });
});