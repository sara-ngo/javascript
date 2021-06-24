const sayHello1 = name => {
  console.log('Hi ' + name);
};

const sayHello2 = () => {
  console.log('Hello hard-coded');
} 

const sayHello3 = (phrase, name) => {
  console.log(phrase + ' ' + name);
}

const sayHello4 = name => 'Hi ' + name;

sayHello1('Sarah');
sayHello2();
sayHello3('Hello', 'Sara');
console.log(sayHello4('Sara'));

function checkInput(cb, ...strings) {
  let isEmptyString = false;
  for (const text of strings) {
    if (!text) {
      isEmptyString = true;
      break;
    }
  }
  if(!isEmptyString) { //if no empty string, call cb()
    cb();
  }
}

checkInput(
  () => { //callback function, being passed as an arg
  console.log('There is no empty'); //exe this string
}, //below is the strings
  'Hello',
  '',
  'Sara', 
  'Empty',
);