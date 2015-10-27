/**
 * onmem-logger - Simple on-memory logger
 * http://github.com/mugifly/node-onmem-logger
 * (C) 2015 - Masanori Ohgita; Released under MIT License.
 */
'use strict';

var instance;

/**
 * On-memory logger module for debugging
 * @param  {Object} options Options for module
 * @return {Object}         Instance
 */
var Logger = function(options) {

	this.logs = [];

	this.isOutput = options.isOutput || false;
	this.maxNumOfItems = options.maxNumOfItems || 1000;

};


/**
 * Get an logger instance
 * @return {Object} Instance
 */
Logger.getInstance = function() {

	if (instance) return instance;

	instance = new Logger({
		isOutput: true,		// For now, it is fixed value
		maxNumOfItems: 1000	// ditto
	});
	return instance;

};


/**
 * Get a logs
 * @return {Array} Log items
 */
Logger.prototype.getLogs = function() {

	var self = this;

	return self.logs;

};


/**
 * Get a logs as selialized
 * @return {Array} Log items with selialized
 */
Logger.prototype.getSerializedLogs = function() {

	var self = this;

	var logs = self.logs.concat();
	for (var i = 0, l = logs.length; i < l; i++) {

		var item = logs[i];

		// Initial of type -- e.g. debug -> D
		item.typeInitial = item.getTypeInitial();
		// String of Created date - e.g. 12:00:00
		item.createdTimeStr = item.getCreatedTimeAsString();
		// Log string - e.g. [D 12:00:00] Foo/Bar ...
		item.string = item.toString();

		// Delete a function
		for (var key in item) {
			if (self._is('Function', self.logs[i])) delete item[key];
		}

	}

	return logs;

};


/**
 * Insert a debug log into the logger
 * @param  {String} tag Tag text
 * @param  {String} str Log text
 */
Logger.prototype.debug = function(tag, str) {

	var self = this;

	var item = new LogItem( new Date(), tag, str, 'debug');
	self.logs.push(item);

	if (!self.isOutput) return;
	console.log(item.toString());

	self._cleanup();

};


/**
 * Insert a debug log into the logger (alias of debug method)
 * @param  {String} tag Tag text
 * @param  {String} str Log text
 */
Logger.prototype.log = function(tag, str) {

	var self = this;

	self.debug(tag, str);

};


/**
 * Insert a information log into the logger
 * @param  {String} tag Tag text
 * @param  {String} str Log text
 */
Logger.prototype.info = function(tag, str) {

	var self = this;

	var item = new LogItem( new Date(), tag, str, 'info');
	self.logs.push(item);

	if (!self.isOutput) return;
	console.log(item.toString());

	self._cleanup();

};


/**
 * Insert a warning log into the logger
 * @param  {String} tag Tag text
 * @param  {String} str Log text
 */
Logger.prototype.warn = function(tag, str) {

	var self = this;

	var item = new LogItem( new Date(), tag, str, 'warn');
	self.logs.push(item);

	if (!self.isOutput) return;
	console.log(item.toString());

	self._cleanup();

};


/**
 * Insert a error log into the logger
 * @param  {String} tag Tag text
 * @param  {String} err Log text or Error object
 */
Logger.prototype.error = function(tag, err) {

	var self = this;

	var item = null;
	if (self._is('Error', err)) {
		item = new LogItem( new Date(), tag, err.stack, 'error');
	} else {
		item = new LogItem( new Date(), tag, err, 'error');
	}
	self.logs.push(item);

	if (!self.isOutput) return;
	console.log(item.toString());

	self._cleanup();

};


/**
 * Cleanup old items
 */
Logger.prototype._cleanup = function() {

	var self = this;

	while (self.maxNumOfItems < self.logs.length) {
		self.logs.shift();
	}

};


/**
 * Check a type of the object
 * @param  {String}  type Type of the object
 * @param  {Object}  obj  Target object
 * @return {Boolean}      Whether the type of object is matched
 */
Logger.prototype._is = function(type, obj) {

	var clas = Object.prototype.toString.call(obj).slice(8, -1);
	return obj !== undefined && obj !== null && clas === type;

};


/* ---- */


/**
 * Log item
 * @param  {Date} created_at Created date of the log item
 * @param  {String}  tag      Tag text
 * @param  {String}  text     Log text
 * @param  {String}  type     Type of log item - 'debug', 'info', 'warn', 'error'
 */
var LogItem = function(created_at, tag, text, type) {

	this.createdAt = created_at || new Date();
	this.tag = tag;
	this.text = text;
	this.type = type || 'debug';

};


/**
 * Get a created date from the log item
 * @return {Date} created date
 */
LogItem.prototype.getCreatedDate = function() {

	var self = this;

	return self.createdAt;

};


/**
 * Get a tag from the log item
 * @return {String} tag text
 */
LogItem.prototype.getTag = function() {

	var self = this;

	return self.tag;

};


/**
 * Get a text from the log item
 * @return {String} log text
 */
LogItem.prototype.getText = function() {

	var self = this;

	return self.text;

};


/**
 * Get a type from the log item
 * @return {String} log type
 */
LogItem.prototype.getType = function() {

	var self = this;

	return self.type;

};


/**
 * Get a type initial from the log item
 * @return {String} Initial caractor of log type
 */
LogItem.prototype.getTypeInitial = function() {

	var self = this;

	return (self.type != null) ? self.type.substr(0, 1).toUpperCase() : '?';

};


/**
 * Get a string from the log item
 * @return {String} String
 */
LogItem.prototype.toString = function() {

	var self = this;

	return '[' + self.getTypeInitial() + ' ' + self.getCreatedTimeAsString() + '] ' + self.tag + ' / ' + self.text;

};


/**
 * Get a time string from the log item
 * @return {String} Time string
 */
LogItem.prototype.getCreatedTimeAsString = function() {

	var self = this;

	return self._zeroFill(self.createdAt.getHours(), 2) + ':'
		+ self._zeroFill(self.createdAt.getMinutes(), 2)
		+ ':' + self._zeroFill(self.createdAt.getSeconds(), 2);

};


/**
 * Zero padding of number
 * @param  {Number} number Number
 * @param  {Number} digit  Digit of number
 * @return {String} Number string with zero padding
 */
LogItem.prototype._zeroFill = function(number, digit) {

	return (Array(digit).join('0') + number).slice(-digit);

};


/* ---- */

module.exports = Logger;
