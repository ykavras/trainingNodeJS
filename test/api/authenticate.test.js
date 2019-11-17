const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

describe('AUTHENTICATE TEST', () => {
	describe('/GET TOKEN', () => {
		it('Get token', (done) => {
			chai.request(server)
				.post('/authenticate')
				.send({email: 'ykavras@gmail.com', password: '10203040Aa'})
				.end((err, res) => {
					res.should.have.status(200);
					res.body.should.be.a('object');
					res.body.should.have.property('status');
					res.body.should.have.property('token');
					done();
				});
		});
	});
});
