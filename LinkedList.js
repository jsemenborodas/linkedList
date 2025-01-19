class Node {
    constructor(data = null) {
        this.data = data;
        this.next = null;
        this.previous = null;
    }
}

class LinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
    }

    saveToLocalStorage() {
        const arr = this.toArray();
        localStorage.setItem('linkedList', JSON.stringify(arr));
    }

    loadFromLocalStorage() {
        const data = JSON.parse(localStorage.getItem('linkedList'));
        if (data) {
            this.deleteAll();
            data.forEach(item => this.append(item));
        }
    }

    append(data) {

        const newNode = new Node(data);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }

        this.tail.next = newNode;
        newNode.previous = this.tail;
        this.tail = newNode;
        return this;
    }

    prepend(data) {
        const newNode = new Node(data);
        if(!this.head) {
            this.head = newNode;
            this.tail = newNode;
            return this;
        }
        this.head.previous = newNode;
        newNode.next = this.head;
        this.head = newNode;
        return this;
    }

    print() {
        if(!this.head) {
            console.log('Array is empty');
            return this;
        }

        let currentNode = this.head;
        let result = '';
        while(currentNode){
            result += `<div>`
            result += currentNode.data;
            currentNode = currentNode.next;
            result += `</div>`
        }
        return result;
    }

    toConsole() {
        if(!this.head) {
            console.log('Array is empty');
            return this;
        }
        let currentNode = this.head;
        while(currentNode){
            console.log(currentNode);
            currentNode = currentNode.next;
        }
        return this;
    }

    deleteAll() {
        this.head = null;
        this.tail = null;
    }

    toArray() {
        const arr = [];

        let currentNode = this.head;
        while(currentNode) {
            arr.push(currentNode);
            currentNode = currentNode.next;
        }
        console.log(arr)
        return this;
    }

    generate(range) {
        let i = 0;
        while(i <= range) {
            this.append(i);
            i++;
        }
    }
    deleteByValue(value) {
        if (this.head == null) {
            return this; // Список пуст
        }
        let currentValue = this.head;

        while (currentValue) {
            if (currentValue.data === value) {
                if (currentValue === this.head) {
                    this.head = currentValue.next;
                    if (this.head) {
                        this.head.previous = null;
                    } else {
                        this.tail = null; // Список стал пустым
                    }
                } else if (currentValue === this.tail) {
                    this.tail = currentValue.previous;
                    this.tail.next = null;
                } else {
                    currentValue.previous.next = currentValue.next;
                    currentValue.next.previous = currentValue.previous;
                }
                return this; // Успешно удалено
            }
            currentValue = currentValue.next; // Обязательно двигайтесь к следующему элементу
        }
        console.log("Значение не найдено в списке.");
        return this;
    }
}

/* DOM */
const linkedListText = document.querySelector('.linkedListText');
const createLinkedList = document.querySelector('#createLinkedList');
const buttons = `
<div class = 'buttons'>
<input type='text' class = 'input' id = 'input'/>
<button class = 'addElem'>append</button>
<button class = 'prepend'>prepend</button>
<button class = 'delElem'>delete</button>
<button class = 'clear'>clear</button>
<button class = 'toConsole'>to Console</button>
<button class = 'toArray'>toArray Console</button>
<button class = 'generate'>Generate</button>
</div>`;

const form = document.querySelector('.form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    form.reset();
})


let LL;
createLinkedList.addEventListener('click', () => {
    if(createLinkedList.classList.contains('deactivated')){
        createLinkedList.classList.add('activated');
        createLinkedList.classList.remove('deactivated');
        createLinkedList.textContent = 'Создать Linked List'
        let buttons = document.querySelector('.buttons');
        buttons.remove();
        LL = null
        LL.saveToLocalStorage();
    } else {
        LL = new LinkedList;
        LL.loadFromLocalStorage();
        createLinkedList.classList.add('deactivated');
        createLinkedList.classList.remove('activated');
        createLinkedList.textContent = 'Удалить Linked List'
        createLinkedList.insertAdjacentHTML('afterend',buttons);
    }
});

form.addEventListener('click', (event) => {
    if(event.target.classList.contains('addElem')) {
        const value = document.querySelector('.input');
        LL.append(value.value);
        linkedListText.innerHTML = LL.print();
    } else if(event.target.classList.contains('delElem')){
        const value = document.querySelector('.input');
        LL.deleteByValue(value.value);
        linkedListText.innerHTML = LL.print();
    }   else if(event.target.classList.contains('prepend')){
        const value = document.querySelector('.input');
        LL.prepend(value.value);
        linkedListText.innerHTML = LL.print();
    } else if(event.target.classList.contains('clear')){
        LL.deleteAll();
        linkedListText.innerHTML = LL.print();
    } else if(event.target.classList.contains('toConsole')){
        LL.toConsole();
    } else if(event.target.classList.contains('toArray')){
        LL.toArray();
    } else if(event.target.classList.contains('generate')) {
        const value = document.querySelector('.input');
        const range = parseInt(value.value);
        if(!isNaN(range)) {
            LL.generate(range);
            linkedListText.innerHTML = LL.print();
            console.log('sheesh');
        }
    }
})

