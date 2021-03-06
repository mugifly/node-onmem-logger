# node-onmem-logger
A simple on-memory logger for Node.js / io.js app.

[![Version Badge](https://badge.fury.io/js/onmem-logger.svg)](https://badge.fury.io/js/onmem-logger)
[![Build Status of master](https://travis-ci.org/mugifly/node-onmem-logger.svg?branch=master)](https://travis-ci.org/mugifly/node-onmem-logger)

## Installation

You can install the logger to your project with either one method:

* Install with npm: ``npm install onmem-logger``
* Clone the repository: ``git clone https://github.com/mugifly/onmem-logger.git``

## Example code
```js
// Get a logger as singleton
var logger = require('onmem-logger').getInstance();

// Insert a log & Print to stdout
logger.log('main', 'Hello world!');
logger.error('main', 'Something happend :(');

// Get a log
var logs = logger.getLogs();
for (var i = 0, l = logs.length; i < l; i++) {
	var item = logs[i];
	console.log(i + ' - ' + item.getTag() + ' / ' + item.getText());
}
```

The more examples is available on [here](https://github.com/mugifly/node-onmem-logger/wiki#examples).

## Features
* Usable very easily.
* Can be work on memory only.
* Can be integrate whole logs of the app. It also suitable for your electron app.

## Logger object

### Static methods

#### getInstance()
Get an instance of logger as singleton.

You can integrate whole logs of the app by get a logger as singleton from your each object.

### Instance methods

#### getLogs()
Get an array of **LogItem** object.

#### getSerializedLogs()
Get an array as serialized logs.

Each item includes additional properties as follows. Those properties was obtained from each methods of **LogItem** object.

* createdTimeStr - Same as **getCreatedTimeAsString()** method -- e.g. "12:00:00"
* typeInitial - Same as **getTypeInitial()** method -- e.g. "D"; It means "debug".
* string - Same as **toString()** method

#### debug(tag, text)
Insert a debug log.

* tag: {String} Tag text -- e.g. "main", "foo/bar"
* text: {String} Log text -- e.g. "Hello world"

#### error(tag, text)
Insert a error log. That usage is same with **debug(tag, text)** method.

#### info(tag, text)
Insert a information log. That usage is same with **debug(tag, text)** method.

#### log(tag, text)
An alias of **debug(tag, text)** method.

#### warn(tag, text)
Insert a warning log. That usage is same with **debug(tag, text)** method.

## LogItem object

### Instance properties
* createdAt: {Date} Created date
* tag: {String} Tag text
* text: {String} Log text
* type: {String} Log type - 'debug', 'info', 'warn', 'error'

### Instance methods

#### getCreatedDate()
Get a created date as Date object.

#### getCreatedTimeAsString()
Get a created time as a time string -- e.g. "12:00:00".

#### getTag()
Get a tag text as String object.

#### getText()
Get a log text as String object.

#### getType()
Get a log type as String object -- e.g. "debug"

#### getTypeInitial()
Get an initial character of a log type as String object -- e.g. "D"

#### toString()
Get a log item as a string. e.g. "[D 12:00:00] main / ...".

## License
```
The MIT License (MIT).
Copyright (c) 2015 Masanori Ohgita.
```
