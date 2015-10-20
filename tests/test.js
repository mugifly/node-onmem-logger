var assert = require('assert'),
	Logger = require(__dirname + '/../logger.js');

describe('Initialization', function() {

	it('Get an instance', function (done) {

		Logger.getInstance();
		done();

	});

});


describe('Insertion of a log', function() {

	var logger = Logger.getInstance();

	it('debug method', function (done) {

		logger.debug('main', 'This is debug log.');
		done();

	});

	it('error method with String object', function (done) {

		logger.error('main', 'This is error log.');
		done();

	});

	it('error method with Error object', function (done) {

		logger.error('main', new Error('This is error log with Error object.'));
		done();

	});

	it('info method', function (done) {

		logger.info('main', 'This is information log.');
		done();

	});

	it('warn method', function (done) {

		logger.warn('main', 'This is warning log.');
		done();

	});

	it('log method (alias of debug)', function (done) {

		logger.log('main', 'This is debug log.');
		done();

	});

});


describe('Acquisition of logs', function() {

	var logger = Logger.getInstance();

	it('Number of log items', function (done) {

		var logs = logger.getLogs();
		assert.equal(logs.length, 6);
		done();

	});

	it('LogItem - First item', function (done) {

		var logs = logger.getLogs();
		assert.equal(logs[0].getType(), 'debug', 'Valid type');
		assert.equal(logs[0].getText(), 'This is debug log.', 'Valid text');
		assert.equal(logs[0].getTag(), 'main', 'Valid tag');
		assert.equal(typeof(logs[0].getCreatedDate()), 'object', 'Valid created date (variable type)');
		assert.notEqual(logs[0].getCreatedTimeAsString().indexOf(':'), -1, 'Valid created time as string');
		done();

	});

});


describe('Acquisition of selialized logs', function() {

	var logger = Logger.getInstance();

	it('Number of log items', function (done) {

		var logs = logger.getSerializedLogs();
		assert.equal(logs.length, 6);
		done();

	});

	it('LogItem - First item', function (done) {

		var logs = logger.getSerializedLogs();
		assert.equal(logs[0].type, 'debug', 'Valid type');
		assert.equal(logs[0].typeInitial, 'D', 'Valid type initial');
		assert.equal(logs[0].text, 'This is debug log.', 'Valid text');
		assert.equal(logs[0].tag, 'main', 'Valid tag');
		assert.notEqual(logs[0].createdTimeStr.indexOf(':'), -1, 'Valid created time as string');
		done();

	});

});
