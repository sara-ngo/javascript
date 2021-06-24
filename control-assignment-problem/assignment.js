const randomNumber = Math.random(); // produces random number between 0 (including) and 1 (excluding)
if(randomNumber >= 0.7) {
    alert(`Number value: ${randomNumber}`);
} else {
    alert('Not greater than 0.7');
}

const array = [5, 6, 4, 3, 7];
for(const value in array) {
    console.log(`${array[value]}`);
}
for(let i=0; i<array.length; i++) {
    console.log(array[i]);
}

let j = array.length;
while(j>0) {
    console.log(array[j-1]);
    j--;
}

const randomNum = Math.random(); // produces random number between 0 (including) and 1 (excluding)
if (randomNumber > 0.7 && randomNum > 0.7) {
    alert('Both are greater than 0.7')
} else if (randomNumber < 0.2 || randomNum < 0.2) {
    alert('One is not greater than 0.2');
}