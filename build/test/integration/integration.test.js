"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = require("./config/helpers");
describe('Tests of integration', function () {
    describe('GET /api/users/:id', function () {
        it('Should be return the mensage Hello, Test with typescript', function (done) {
            var id = 1;
            helpers_1.request(helpers_1.app)
                .get("/api/users/" + id)
                .end(function (error, response) {
                helpers_1.expect(response.status).to.equal(200);
                helpers_1.expect(response.text).to.be.eql('Hello, Test with typescript');
                done(error);
            });
        });
    });
    describe('GET /api/users/', function () {
        it('Should return the json with all users', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end(function (error, response) {
                helpers_1.expect(response.status).to.equal(200);
            });
        });
    });
    describe('GET /api/users/:id', function () {
        it('Should return user by id', function (done) {
            helpers_1.request(helpers_1.app)
                .get('/api/users/1')
                .end(function (error, response) {
                helpers_1.expect(response.status).to.equal(200);
            });
        });
    });
    describe('POST /api/users', function () {
        it('Should create user', function (done) {
            var user = {
                name: 'Test'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users')
                .send(user)
                .end(function (error, response) {
                helpers_1.expect(response.status).to.equal(200);
            });
        });
    });
    describe('PUT /api/users/:id', function () {
        it('Should update user by id', function (done) {
            var user = {
                id: 1,
                name: 'Test 1'
            };
            helpers_1.request(helpers_1.app)
                .put("/api/users/" + user.id)
                .send(user)
                .end(function (error, response) {
                helpers_1.expect(response.status).to.equal(200);
            });
        });
    });
    describe('DELETE /api/users/:id', function () {
        it('Should delete user by id', function (done) {
            var user = {
                id: 1,
                name: 'Test'
            };
            helpers_1.request(helpers_1.app)
                .delete("/api/users/" + user.id)
                .end(function (error, response) {
                helpers_1.expect(response.status).to.equal(200);
            });
        });
    });
});
