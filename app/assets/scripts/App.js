var $ = require('jquery');

import Person from './modules/Person';

class Adult extends Person {
  payTaxes() {
    console.log(`${this.name} now owes $0 in taxes.`);
  }
}

var alan = new Person('Alan', 'blue');
// alert('Testing 1234 - for webpack');
alan.greet();

var jane = new Adult('Jane Smith', 'orange');
jane.greet();
jane.payTaxes();
