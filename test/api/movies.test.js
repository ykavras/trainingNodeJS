const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

let token;

describe('MOVIES TEST', () => {
	before('GET TOKEN', (done) => {
		chai.request(server)
			.post('/authenticate')
			.send({email: 'ykavras@gmail.com', password: '10203040Aa'})
			.end((err, res) => {
				if (err)
					throw err;

				token = res.body.token;
				done();
			});
	});
	describe('/GET MOVIES', () => {
		it('Get all movies records', (done) => {
			chai.request(server)
				.get('/api/movie')
				.set('x-access-token', token)
				.end((err, res) => {
					if (err)
						throw err;
					res.should.have.status(200);
					res.body.should.be.a('array');
					done();
				});
		});
	});
});
