class Person {
  constructor(fullName, favColor) {
    this.name = fullName;
    this.color = favColor;
  }

  greet() {
    console.log(
      `Hi there ${this.name}. Let me guess, you're favorite color is ${this
        .color}.`
    );
  }
}

export default Person;
