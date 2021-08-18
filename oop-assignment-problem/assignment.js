class Course {
    #price; 
    
    get price() {
        return '$' + this.#price;
    }

    set price(value) {
        if(value < 0) {
            throw 'Invalid value';
        }
        this.#price = value;
    }

    constructor(title, length, price) {
        this.title = title;
        this.length = length;
        this.price = price;
    }

    calculate() {
        console.log('How much length do you get for the amount paid');
        let total = this.length/this.#price;
        return total.toFixed(2);
    }

    summary() {
        let message = 'For this ' + `${this.title}` + ' course, you will spend at least ' + `${this.length}` + ' mins of studying and pay ' + `\$${this.price}.`;
        return message;
    }
}

const course1 = new Course('Java', 30, 9.99);
const course2 = new Course('C/C++', 45, 12.99);

console.log(course1);
console.log(course1.calculate());
console.log(course1.summary());

console.log(course2);
console.log(course2.calculate());
console.log(course2.summary());

class PracticalCourse extends Course {
    constructor(title, length, price, numOfExercises) {
        super(title, length, price);
        this.numOfExercises = numOfExercises;
    }
}

const course3 = new PracticalCourse('Python', 35, 10.99, 20);
console.log(course3);
console.log(course3.calculate());
console.log(course3.summary());

class TheoreticalCourse extends Course {
    publish() {
        console.log('This is a theoretical course.');
    };
}

const course4 = new TheoreticalCourse('JavaScript', 50, 15.99);
console.log(course4);
console.log(course4.calculate());
console.log(course4.summary());
course4.publish();