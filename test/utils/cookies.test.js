const expect = require('chai').expect;
const cookies = require('../../utils/cookies');

describe('cookies', function() {
	it('should parse cookie', function() {
		var c = cookies.parse('foo=bar; foo1=bar1');
		expect(c.foo).to.be.equal('bar');
		expect(c.foo1).to.be.equal('bar1');
	});
});
