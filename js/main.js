'use strict'
window.addEventListener('DOMContentLoaded', function() {

class Task {
    constructor(parenSelector,task_value,id,isDone,...classes) {
        this.task_value = task_value;
        this.parent = document.querySelector(parenSelector);
        this.classes = classes;
        this.id = id;
        this.isDone = isDone;
    }


    render() {
        const element = document.createElement('div');
        const classForm = document.querySelector('.empty_');

        if (this.task_value != undefined) {
            classForm.classList.add('hide')
        } else {
            classForm.classList.remove('hide')
        }

        if (this.classes.length === 0) {
            this.classes = 'tasks_list_item';
            // const isdone = this.isDone;
            element.classList.add(this.classes);
            element.setAttribute('id',this.id);
        } else {
            this.classes.forEach(className => element.classList.add(className));
        }

        if (this.isDone === true) {
            element.classList.add('Done');
        }


        element.innerHTML = `
            <span class="task_text ${this.isDone}">${this.task_value}</span>
            <div class="task_item_btn" id="${this.isDone}">
                <button type="button" id='${this.id}' class="done" data-action="done">
                    <img src="img/done.png" id='${this.id}' alt="done" width="20" class="done_img" data-action="done">
                </button>
                <button type="button" id='${this.id}' class="delete" data-action="delete"><img src="img/delete.png" id='${this.id}' alt="delete" width="20" class="delete_img" data-action="delete"></button>
            </div>`
         this.parent.append(element);
    }

    printTask(form) {
            const getResource = async (url) => {
                const res = await fetch(url);
        
                if (!res.ok) {
                    throw new Error(`Could not fetch ${url}, status: ${res.status}`);
                }
        
                return await res.json();
            }

            getResource('http://localhost:3000/requests')
            .then(data => {
            data.forEach(({text,id,isDone}) => {
                new Task(".main .tasks_container",text,id,isDone).render();
            });
            });
    }

    addServer(form) {
        const emptyLogo = document.querySelector('.empty_');
        emptyLogo.classList.add('hide')


        const postData = async (url,data) => {
            const res = await fetch(url, {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: data
            });
            return await res.json();
        };

        const formData = new FormData(form);

        const date = new Date();
        formData.append("Date",date);
        formData.append("isDone",false);
        const json = JSON.stringify(Object.fromEntries(formData.entries()));
        postData('http://localhost:3000/requests',json)
        .then(data => {
                console.log(data);
                new Task(".main .tasks_container",data.text,data.id).render();
        }).catch(()=>{
            console.log(Ошибка);
        });
    }

    deleteTaskById(id) {
        fetch('http://localhost:3000/requests' + "/" + id, {
            method: 'DELETE'
        }).then(() => {
            console.log('removed');
            console.log(id);
        }).catch(err => {
            console.log(err)
        }).finally(() => {
            console.log(id);
        });
    }

    addTask(form) {
        const getResource = async (url) => {
            const res = await fetch(url);
    
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
    
            return await res.json();
        }
        let a = 0;

        getResource('http://localhost:3000/requests')
        .then(data => {
        data.forEach(({text,id}) => {
            a = id;
        });
        data.forEach(({text,id}) => {
            if(id > a) {
                new Task(".main .tasks_container",text,id).render();
            }
            
        });
        });
    }

    doneTask(id,text_v,Date_v) {
        console.log(id);
        fetch('http://localhost:3000/requests' + '/' + id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            text: text_v,
            Date: Date_v,
            isDone: true
        })
        })
        .then(res => {
        return res.json()
        })
        .then(data => console.log(data))
    }

    getTextTask(id_a) {
        const task = new Task();
        const getResource = async (url) => {
            const res = await fetch(url);
    
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
    
            return await res.json();
        }
        let a = '';
        console.log('ddd');
        getResource('http://localhost:3000/requests')
        .then(data => {
        data.forEach(({text,id,Date}) => {
            if(id == id_a) {
                task.doneTask(id_a,text,Date);
               console.log(text);;
            }
            
        });
        });
    }

    deleteAllTask() {
        const emptyLogo = document.querySelector('.empty_');
        const classForm = document.querySelector('.tasks_container');
        console.log(classForm.children);
        while (classForm.firstChild) {
            classForm.removeChild(classForm.firstChild);
        }
        

        emptyLogo.classList.remove('hide')


        const task = new Task();
        const getResource = async (url) => {
            const res = await fetch(url);
    
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
    
            return await res.json();
        }

        getResource('http://localhost:3000/requests')
        .then(data => {
        data.forEach(({id}) => {
                task.deleteTaskById(id);
            
        });
        });

    }

    deleteAllDoneTask() {
        const emptyLogo = document.querySelector('.empty_');
        const classForm = document.querySelector('.tasks_container');
        let i = 0;
        // console.log(classForm.children[id-1]);

        const task = new Task();
        const getResource = async (url) => {
            const res = await fetch(url);
    
            if (!res.ok) {
                throw new Error(`Could not fetch ${url}, status: ${res.status}`);
            }
    
            return await res.json();
        }
        getResource('http://localhost:3000/requests')
        .then(data => {
        data.forEach(({id,isDone}) => {
            if(isDone == true) {
                task.deleteTaskById(id);
            }
            
        });
        });
    }

}


const task = new Task();
const form = document.querySelector('form');
const taskInput = this.document.querySelector('#taskInput');
const classForm = document.querySelector('.empty_');
const btnDelAll = this.document.querySelector('#dellAllTask')
const btnDelAllDone = this.document.querySelector('#dellAllDoneTask')
const class_Form = document.querySelector('.tasks_container');
const change = document.querySelector('.tasks_container');
const emptyLogo = document.querySelector('.empty_');
task.printTask(form);


const btnDel = document.querySelector('.tasks_container');
const btnDone = document.querySelector('.tasks_container');


btnDelAll.addEventListener('click',deleteAllTask);
btnDel.addEventListener('click',deletetask);
btnDone.addEventListener('click',doneTask);
btnDelAllDone.addEventListener('click',delAllDoneTask);
change.addEventListener('dblclick',changeTask);

function changeTask(e) {
    console.log(e.target);
    const r = e.target;
    const curInput = document.createElement('input');
    curInput.classList.add('change_input');
    // const a = r.closest('.tasks_container');
    // const b = document.createElement('div');
    // b.innerHTML = `
    //         <div class="tasks_list_item">
    //             <span class="task_text">lol</span>
    //             <div class="task_item_btn">
    //                 <button type="button" class="done" data-action="done">
    //                     <img src="img/done.png" id= alt="done" width="20" class="done_img" data-action="done">
    //                 </button>
    //                 <button type="button"  class="delete" data-action="delete"><img src="img/delete.png" alt="delete" width="20" class="delete_img" data-action="delete"></button>
    //             </div>
    //         </div>
    // `;
    // a.prepend(b);
    // r.remove();
    r.prepend(curInput);
    let c = document.querySelector('.change_input');
    console.log(c);
    console.log(c.value);
}



function delAllDoneTask(e) {
    // task.deleteAllDoneTask();
    for (let index = 0; index < class_Form.children.length; index++) {
        console.log(index);
        console.log(class_Form.children[index].className);
            while (class_Form.children[index].className === 'tasks_list_item Done') {
                console.log('exelent');
                const idItem = class_Form.children[index].id;
                console.log(idItem);
                task.deleteTaskById(idItem);
                class_Form.removeChild(class_Form.children[index])

                if (class_Form.children.length <=0 || class_Form.children.length <= index ) {
                    break;
                }
            };
        if (class_Form.children.length === 0) {
            emptyLogo.classList.remove('hide');
        };

    }

}

function deleteAllTask(e) {
    e.preventDefault();
    console.log('deleteAllTask');
    task.deleteAllTask();


}

function doneTask(e) {
    if (e.target.dataset.action === 'done') {
        console.log('done');
        const parentNode = e.target.closest('.tasks_list_item');
        let textNode = parentNode.children[0];
        task.getTextTask(parentNode.id,parentNode);
        // console.log(formText);
        // console.log(parentNode.id);
        // console.log(parentNode.text);
        parentNode.classList.add('Done');
        // task.doneTask(parentNode.id);
        textNode.style.cssText = `
        text-decoration: line-through;
        `;
    }
}

function deletetask(event) {
    if (event.target.dataset.action === 'delete') {
        console.log('delete');
        const parentNode = event.target.closest('.tasks_list_item');
        console.log(parentNode.id);
        task.deleteTaskById(parentNode.id);
        parentNode.remove();
        console.log(btnDel.children.length);
        if (btnDel.children.length < 1) {
            classForm.classList.remove('hide');
        }
    }
}



form.addEventListener('submit',(e) => {
    e.preventDefault();
    task.addServer(form);
    taskInput.value ="";
    taskInput.focus();
});


});