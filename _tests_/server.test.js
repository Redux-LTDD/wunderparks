const mongoose = require('mongoose');
const User = require('../server/models/userModel.js');
const { response } = require('express');
const request = require('supertest');
const assert = require('assert');

// const MONGO_URI =
// 'mongodb+srv://Solit95:Loveshoes6%21@cluster0.mfblrs9.mongodb.net/?retryWrites=true&w=majority';
// mongoose.connect(MONGO_URI);

const server = 'http://localhost:3000';
const dbName = 'parks';

beforeAll(async () => {
  const MONGO_URI = `mongodb+srv://Solit95:Loveshoes6%21@cluster0.mfblrs9.mongodb.net/?retryWrites=true&w=majority`;
  //connect to new db
  await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  //delete db
  await mongoose.connection.close();
});

describe('Route integration', () => {
  beforeEach(async () => {
    await User.create({
      name: 'Max',
      parksVisited: {
        acad: {
          date: '2022-12-01',
          notes: 'this park was fun',
          activitiesCompleted: ['climbing'],
        },
        arch: {
          date: '2022-12-02',
          notes: 'hi',
          activitiesCompleted: ['biking', 'climbing'],
        },
      },
    });
  });

  afterEach(async () => {
    await User.findOneAndDelete({ name: 'Max' });
  });

  describe('/', () => {
    describe('GET', () => {
      it('responds with 200 status and text/html content type', () => {
        return request(server)
          .get('/')
          .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
  });

  describe('/user', () => {
    describe('POST', () => {
      afterEach(async () => {
        await User.findOneAndDelete({ name: 'Jacob' });
      });

      it('responds with a 201 status and application/json content type', () => {
        return request(server)
          .post('/user')
          .send({ name: 'Jacob' })
          .expect(201)
          .expect('Content-Type', /application\/json/);
      });
      it('should have newUser in body of response', () => {
        return request(server)
          .post('/user')
          .send({ name: 'Jacob' })
          .then((res) => {
            expect(res.body.name).toEqual('Jacob');
          });
      });
    });

    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/user/Max')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
      it('parks from user collection are in body of response', () => {
        return request(server).get('/user/Max').expect(['acad', 'arch']);
      });
    });
  });
  describe('/user/:userParam/:parkCode', () => {
    describe('GET', () => {
      it('responds with 200 status and application/json content type', () => {
        return request(server)
          .get('/user/Max/acad')
          .expect('Content-Type', /application\/json/)
          .expect(200);
      });
      it('should have user info in the response body', () => {
        return request(server)
          .get('/user/Max/acad')
          .then((res) => {
            expect(res.body.date).toEqual('2022-12-01')
            expect(res.body.notes).toEqual('this park was fun')
            expect(res.body.activitiesCompleted).toEqual([ 'climbing' ])
          });
       });
    });
    describe('POST', () => {
      it('responds with a 201 status and application/json content type', () => {
        return request(server)
          .post('/user/Max/glac')
          .expect(201)
          .expect('Content-Type', /application\/json/);
      });

      it('should have a new park in the parksVisited object', () => {
        return request(server)
          .post('/user/Max/glac')
          .send({
            date: '2022-12-02',
            notes: 'hi',
            activitiesDone: ['biking', 'climbing'],
          })
          .then((res) => {
            expect(res.body.date).toEqual('2022-12-02');
            expect(res.body.notes).toEqual('hi');
            expect(res.body.activitiesCompleted).toEqual([
              'biking',
              'climbing',
            ]);
          });
      });
    });
  });
});