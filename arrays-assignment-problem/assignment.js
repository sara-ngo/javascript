const array1 = [1, 2, 4, 5, 6, 12];
let mul = 1;

//1
for (const number of array1) {
    if(number > 5) {
        console.log(number);
    }
}

const map = array1.map(val => ({num: val}));
console.log(map);

for (const number of array1) {
    mul *= number;
}
console.log(mul);

//2
function findMax(...arrays) {
    let curMax = arrays[0];
    for (const num of arrays) {
        if(num > curMax) {
            curMax = num;
        }
    }
    return curMax;
}

console.log(findMax(...array1));

//3
function findMinMax(...arrays) {
    let curMax = arrays[0];
    let curMin = arrays[0];

    for (const num of arrays) {
        if(num > curMax) {
            curMax = num;
        }
        else if(num < curMin) {
            curMin = num;
        }
    }

    return [curMin, curMax];
}

const [min, max] = findMinMax(...array1);
console.log(min);
console.log(max);

//4
const nums = new Set();
nums.add(1);
nums.add(1);
nums.add(5);
console.log(nums);