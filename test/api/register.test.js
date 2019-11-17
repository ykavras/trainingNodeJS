const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');

chai.use(chaiHttp);

const randomString = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

describe('/POST Register', () => {
	it('it should POST a register', (done) => {
		const movie = {
			email: `${randomString}@gmail.com`,
			password: '10203040Aa',
			name: randomString,
			surname: 'Test Surname',
			phone: Math.random().toString().slice(2,11),
			address: 'My Address',
		};

		chai.request(server)
			.post('/register')
			.send(movie)
			.end((err, res) => {
				res.should.have.status(200);
				res.body.should.be.a('object');
				res.body.should.have.property('email');
				res.body.should.have.property('name');
				res.body.should.have.property('surname');
				res.body.should.have.property('phone');
				res.body.should.have.property('address');
				done();
			});
	});
});
