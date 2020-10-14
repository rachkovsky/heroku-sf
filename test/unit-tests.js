const chai = require('chai'),
     chaiHttp = require('chai-http'),
     expect = chai.expect;
     fs = require('fs'),
     server = require('../app');

chai.use(chaiHttp);

describe('Users API', () => {
    it('Main page sould be loaded', done => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                expect(err).to.be.null;
                expect(res).to.have.status(200);        
                done();
            });
    });

});