const saveData = document.querySelector('.save');
const loadData = document.querySelector('.load');

const text = document.querySelector('.text');

function saveDataFunc() {
    localStorage.setItem('admin', 'false');
}

function loadDataFunc() {
    const data = localStorage.getItem('admin');
    console.log(data);
    return data
}

saveData.addEventListener(('click'), () => {
    saveDataFunc();
});

loadData.addEventListener(('click'), () => {
    text.textContent = loadDataFunc();
})
