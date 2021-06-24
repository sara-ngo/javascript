const task3Element = document.getElementById('task-3');

function first() {
    alert('First function!');
}

function second(name) {
    alert(name);
}

function third(name1, name2, name3) {
    return name1 +  name2 + name3;
}

alert(third('hello',' ','world'));

second('Second');

task3Element.addEventListener('click', first);

