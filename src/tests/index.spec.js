import chai, { expect } from 'chai';
import chaiHttp from 'chai-http';
import app from '../../index';

chai.use(chaiHttp);

describe('true or false', () => {
  it('true is true', () => {
    expect(true).to.eql(true);
  });
  it('false is false', () => {
    expect(false).to.eql(false);
  });
});

describe('Test the home page', () => {
  it('it should return the response on home page', (done) => {
    chai
      .request(app)
      .get('/')
      .end((err, res) => {
        expect(res.body.message).to.be.equal('Welcome to my mini Ecommerce Application');
        done();
      });
  });
});
