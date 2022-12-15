// hi
const mongoose = require('mongoose');
const User = require('../server/models/userModel.js');
const { response } = require('express');
const request = require('supertest');

// const MONGO_URI =
// 'mongodb+srv://Solit95:Loveshoes6%21@cluster0.mfblrs9.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(MONGO_URI);


const server = 'http://localhost:3000';
const dbName = 'parks'

beforeAll(async () =>{
    const MONGO_URI = `mongodb+srv://Solit95:Loveshoes6%21@cluster0.mfblrs9.mongodb.net/?retryWrites=true&w=majority`;
    //connect to new db
    await mongoose.connect(MONGO_URI);
})

afterAll(async () =>{
    //delete db
    await mongoose.connection.close();
})

describe('Route integration', () => {
    

    beforeEach(async() => {

        await User.create({
            name: "Max",
            parksVisited:{
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
        });
    });

    afterEach( async () =>{
        await User.findOneAndDelete({name:"Max"});
    });
        //use schema to create user object in mogodb
        //add new park visited with date notes and activities completed
        //could do a second park...
    




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

        describe('POST', () => {

            it('responds with a 201 status and application/json content type', () =>{
                return request(server)
                    .post('/user/Max/glac')
                    .expect(201)
                    .expect("Content-Type", /application\/json/)
            })
             it('should have a new park in the parksVisited object', () => {
                return request(server)
                    .post('/user/Max/glac')
                    .send({
                        date: "2022-12-02",
                        notes: "hi",
                        activitiesDone: ["biking" , "climbing"]
                    })
                    .expect((res) => res.body.date === "hjkasdfhjklasdf")
                    // .expect(
                    //     User.parksVisited[glac] === {
                    //     date: '2022-12-02',
                    //     notes: 'hi',
                    //     activitiesCompleted: [ 'biking', 'climbing' ]
                    //   })
                    ///hiii
             })
        })

        describe('POST', () => {
            afterEach(async () =>{
                await User.findOneAndDelete({name:"Jacob"});
            })

            xit('responds with a 201 status and application/json content type', () => {
                return request(server)
                    .post('/user')
                    .send({name:"Jacob"})
                    .expect(201)
                    .expect("Content-Type", /application\/json/)
            })
            xit('should have newUser in body of response', () => {
                return request(server)
                    .post('/user')
                    .send({name:"Jacob"})
                    // .then(() => {const newUser = User.findOne({name:"Jacob"})})
                    // .expect(res.body.name).toBe("Jacob")
                    // .expect((res)=> res.body.name).toEqual('Jacob')
                    // .expect(newUser[name]).toBe('Jacob')
                    .expect((res) => console.log(res.body))
                    
            })
        })

        describe('GET', () =>{
            it('responds with 200 status and application/json content type', () => {
                return request(server)
                  .get('/user/Max')
                  .expect('Content-Type', /application\/json/)
                  .expect(200)
            });
            it('parks from user collection are in body of response', () => {
                return request(server)
                    .get('/user/Max')
                    .expect(["acad", "arch"])
            })
        });
    });
});