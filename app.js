let taskNumber = 1;
const tbody = document.querySelector('tbody');
const clearAllBtn = document.getElementById('clearAll')
const tbodyChildren = tbody.children;

function addTask() {
    // get text from input
    const inputText = document.getElementById('input-task');
    const description = inputText.value;

    if (!description) {
        return
    }
    if (taskNumber > 1) {
        clearAllBtn.classList.remove('invisible')
    }

    inputText.value = ''
    
    // create list of task 
        // 1. create row and td;
    const tr = document.createElement('tr');
    tr.classList.add(...['mx-auto', 'text-center']); 
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
        // 2. set inner text and html
    td1.innerText = taskNumber;
    td1.style.fontWeight = 'bold'
    td2.innerText = description;
    td3.innerHTML = `
    <button id="done-btn" class="btn text-xs btn-accent btn-sm">done</button>
    <button id="delete-btn" class="btn text-xs btn-error btn-sm">delete</button>
    `;
        // append all the td to tr and tr to tbody 
    tr.appendChild(td1)
    tr.appendChild(td2)
    tr.appendChild(td3)
    tbody.appendChild(tr)
    taskNumber++

}

function pressedEnter(event) {
    if (event.key === 'Enter') {
        addTask()
    }
}

function clearAll() {
    for (let i = tbodyChildren.length - 1; i >= 0; i--) {
        const child = tbodyChildren[i]
        child.remove()
    }
    taskNumber = 1;
}

tbody.addEventListener('click', function (event) {
    const tr = event.target.parentNode.parentNode;
    const idName = event.target.id;
    switch (idName) {
      case 'done-btn':
        tr.classList.add('line-through');
        break;
      case 'delete-btn':
        tr.remove();
        // decrement task number
        taskNumber--;
        // get next row number and set the previous row number
            
        for (let i = 1; i < taskNumber; i++){
            const td = tbodyChildren[i - 1].children[0]
            td.innerHTML = i
        }
    }
})

