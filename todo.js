
const fs = require ('fs')
const file = 'todo.json'

function readTask(){
    const data = fs.readFileSync(file ,'utf-8')
    return JSON.parse(data)
}
function writeTask(tasks){
    fs.writeFileSync(file , JSON.stringify(tasks , null , 2))
}

const command = process.argv[2]
const argument = process.argv[3]

function addTask(todo){
    const read = readTask()
    read.push({id: Date.now() , task: todo , done:false})
    writeTask(read)
    console.log(`✅ ADDED: ${todo} `);
}

if(command === 'add'){
    addTask(argument)
}

function listTask(){
    let index  = 0
    const read = readTask()
    for (let values of read){
        index++
        if(values.done === false){
            console.log(index +". "+values.task + ' [ ]');  
        }else{
            console.log(index +'. '+ values.task +' [✅]');
        }
    }
}

if(command === 'list'){
    listTask()
}

function doneTask(index){
    const read = readTask()
    read[index -1].done = true
    writeTask(read)
    console.log('TODO Marked ✅');
}
if(command === 'done'){
    doneTask(Number(argument))
}

function deleteTask(index){
    const read = readTask()
    let remaining = read.filter((obj , i)=>{
        return i !== index -1})
    writeTask(remaining)
      console.log('todo deleted');
    
}
if(command === 'delete'){
    deleteTask(Number(argument))
}