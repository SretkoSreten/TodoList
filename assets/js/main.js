window.addEventListener('DOMContentLoaded', (event) => {

    const items_holder = document.querySelector(".item_list");
    const btn_add = document.querySelector(".btn-add");
    const btn_clear = document.querySelector(".btn-clear");
    const clear_items = document.querySelector(".clear");
    const input_holder = document.querySelector(".input-holder");
    const feedback_holder = document.querySelector(".alert-holder");

    let tasks = [];

    let currentTime = new Date().getDay();

    btn_clear.addEventListener("click", () => clearItems())

    btn_clear.addEventListener("click", e => {
        e.preventDefault();
        input_holder.value = "";
    })
    // btn click func to add item in list
    btn_add.addEventListener("click", e => {
        e.preventDefault();
        let inputValue = input_holder.value;

        if (inputValue != ""){
            input_holder.value = "";
            addItem(inputValue);
            setItems(tasks);
            ShowFeedback('success', 'Item is successfully added')
        }else 
        {
            ShowFeedback('error', 'Item cannot added because you must enter some todo')
        }
    })

    const clearItems = () => {
        localStorage.clear();
        tasks = [];
        setItems(tasks);
        ShowFeedback('error', 'Items are cleared')
    }
    // add item to list
    const addItem = (inputValue) => {
        var item = {text: inputValue, complete: false, date: new Date().getDay(), edited: false}
        tasks.push(item);
        setLocalStorage(tasks);
    }
    const setItems = (tasks) => {

        items_holder.innerHTML = "";

        tasks.forEach(task => {

            const div = document.createElement("div");

            div.innerHTML = `
            <a href="#" class="list-group-item list-group-item-action" aria-current="true">
                <div class="d-flex w-80 justify-content-between align-items-center">
                    <div class = "col">
                        <input type="text" ${!task.edited ? 'readonly' : ''} value = "${task.complete ? `<del>${task.text}</del>` : task.text}" class="form-control item-input" aria-label="Example text with button addon" aria-describedby="button-addon1">
                        <small>${setDateText(currentTime - task.date)}</small>
                    </div>
                    <div>
                        <div class="d-flex">
                            <button type="button" class="btn btn-success complete"><i class="uil uil-check"></i></button>
                            <button type="button" class="btn btn-primary edit"><i class="uil uil-edit"></i></button>
                            <button type="button" class="btn btn-danger remove"><i class="uil uil-trash-alt"></i></button>
                        </div>
                    </div>
                </div>
            </a>`;

            items_holder.appendChild(div);

            const itemInput = div.querySelector('.item-input');

            const deleteBtn = div.querySelector('.remove');
            const completeBtn = div.querySelector('.complete');
            const editBtn = div.querySelector('.edit');

            deleteBtn.addEventListener("click", () => deleteItem(task));
            completeBtn.addEventListener("click", () => completeItem(task));
            editBtn.addEventListener("click", () => editItem(task, itemInput.value));
        })
    }
    const deleteItem = (task) => {
        let index = tasks.indexOf(task);
        tasks.splice(index, 1);
        ShowFeedback('error', 'Item is successfully removed')
        setLocalStorage(tasks);
        setItems(tasks);
    }
    const completeItem = (task) => {
        let index = tasks.indexOf(task);
        tasks[index].complete = !tasks[index].complete;
        setLocalStorage(tasks);
        setItems(tasks);
    }
    const editItem = (task, value) => {
        let index = tasks.indexOf(task);
        tasks[index].edited = !tasks[index].edited;

        if (!tasks[index.edited])
            tasks[index].text = value

        setLocalStorage(tasks);
        setItems(tasks);
    }

    const setDateText = (time) => {
        if (time == 0) return 'today';
        if (time >= 1) return `${time} days ago`;
    }

    const getLocalStorage = function(){

        const todoStorage = localStorage.getItem('todoItems');
        if (todoStorage === 'undefined' || todoStorage === null){
            tasks = [];
        } else {
            tasks = JSON.parse(todoStorage);
        }
    }
    
    const setLocalStorage = function(todoItems){
        localStorage.setItem('todoItems', JSON.stringify(todoItems));
    }

    getLocalStorage();
    setItems(tasks);

    // set feedback for adding or removing items
    const ShowFeedback = (type, message) => 
    {
        feedback_holder.classList.remove('alert-danger');
        feedback_holder.classList.remove('alert-success');
        feedback_holder.classList.remove('show');
        feedback_holder.classList.remove('hide');

        setTimeout(() => feedback_holder.classList.add('hide'), 1500)

        switch (type)
        {
            case 'success':
                feedback_holder.classList.add('alert-success');
                feedback_holder.classList.add('show');
                feedback_holder.innerHTML = message;
                break;
            case 'error':
                feedback_holder.classList.add('alert-danger');
                feedback_holder.classList.add('show');
                feedback_holder.innerHTML = message;
                break;
        }
    }

});
