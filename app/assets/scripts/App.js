var $ = require('jquery');
var Person = require('./modules/Person');
var alan = new Person('Alan', 'blue');
alert('Testing 1234 - for webpack');
alan.greet();

var jane = new Person('Jane', 'pink');
jane.greet();

$('h1').remove();
