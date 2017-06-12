import * as jwt from 'jwt-simple';
import { app, request, expect } from './config/helpers';
import * as HttpStatus from 'http-status';

describe('Tests of integration on router user', () => {
    'use strict';

    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');

    let id: number;
    let token: string;
    const userTest = {
        id: 100,
        name: 'User Test',
        email: 'user@test.com.br',
        password: 'test@123'
    };

    const userDefault = {
        id: 1,
        name: 'User Default',
        email: 'user@defaul.com.br',
        password: 'userdefault'
    };

    beforeEach(done => {
        model.Users
            .destroy({ where: {} })
            .then(() => model.Users.create(userDefault))
            .then(user => {
                model.Users
                    .create(userTest)
                    .then(() => {
                        token = jwt.encode({ id: user.id }, config.secret)
                        done();
                    })
            })
            .catch(error => console.log(error));
    });

    describe('POST /auth', () => {
        it('Have return a JWT', done => {
            const credentials = {
                email: userDefault.email,
                password: userDefault.password
            };
            request(app)
                .post('/auth')
                .send(credentials)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.OK);
                    expect(res.body.token).to.be.equal(token);
                    done(error);
                })
        });

        it('Don`t should generate the token', done => {
            const invalidCredential = {
                email: 'email@invalid.com',
                password: 'somepassword'
            };

            request(app)
                .post('/auth')
                .send(invalidCredential)
                .end((error, res) => {
                    expect(res.status).to.equal(HttpStatus.UNAUTHORIZED);
                    expect(res.body).to.empty;
                    done(error);
                })
        });
    });

    describe('GET /api/users/:id', () => {
        it('Should be return user by id', done => {
            const id = 1;
            request(app)
                .get(`/api/users/${id}`)
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    done(error);
                });
        });
    });

    describe('GET /api/users', () => {
        it('Should return the json with all users', done => {
            request(app)
                .get('/api/users')
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    expect(response.body.payload).to.be.an('array')
                    expect(response.body.payload[0].name).to.be.equal(userDefault.name);
                    expect(response.body.payload[0].email).to.be.equal(userDefault.email);
                    done(error);
                });

        });
    });

    describe('GET /api/users/:id', () => {
        it('Should return user by id', done => {
            request(app)
                .get(`/api/users/${userDefault.id}`)
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    expect(response.body.payload.id).to.be.equal(userDefault.id);
                    expect(response.body.payload).to.have.all.keys([
                        'id', 'name', 'email', 'password'
                    ]);
                    id = response.body.payload.id;
                    done(error);
                });
        });
    });

    describe('POST /api/users', () => {
        it('Should create user', done => {
            const user = {
                id: 2,
                name: 'Second user test',
                email: 'seconuser@email.com',
                password: 'seconduserpassword'
            };
            request(app)
                .post('/api/users')
                .send(user)
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    expect(response.body.payload.id).to.be.equal(user.id);
                    expect(response.body.payload.name).to.be.equal(user.name);
                    expect(response.body.payload.email).to.be.equal(user.email);
                    done(error);
                });
        });
    });

    describe('PUT /api/users/:id', () => {
        it('Should update user by id', done => {

            const user = {
                id: 1,
                name: 'Test 1'
            };
            request(app)
                .put(`/api/users/${user.id}`)
                .send(user)
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    done(error);
                });
        });

    });


    describe('DELETE /api/users/:id', () => {
        it('Should delete user by id', done => {
            const user = {
                id: 1,
                name: 'Test'
            };
            request(app)
                .delete(`/api/users/${user.id}`)
                .end((error, response) => {
                    expect(response.status).to.equal(HttpStatus.OK);
                    done(error);
                });
        });
    });
});