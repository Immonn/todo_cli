const fs = require('fs')
const { Command } = require('commander')
const program = new Command()
const path = require('path')
const { title } = require('process')

const todo_path = path.join(__dirname, "todoes.json")

function readTodo() {
    if (!fs.existsSync(todo_path)) {
        return []
    }
    const data = fs.readFileSync(todo_path, "utf-8")
    return JSON.parse(data || "[]")
}

function writeTodo(todos) {
    fs.writeFileSync(todo_path, JSON.stringify(todos, null, 2), "utf-8")
}

program.command('add')
    .description("Add todos by add command")
    .argument("<title>", "Enter Todo")
    .argument("<time>", "Enter Todo Time")
    .action((todo_title, time) => {
        const todos = readTodo()
        const newTodo = {
            Title: todo_title,
            Time: time,
            Done: false,
        }
        todos.push(newTodo)
        writeTodo(todos)
        console.log("Todo add Successfully")
    })

program.command('remove')
    .description("This command will remove todo")
    .argument("<title>", "Enter Todo name")
    .action((title) => {
        const todos = readTodo()
        const updatedTodo = todos.filter((todo) => todo.Title !== title)

        if (todos.length === updatedTodo.length) {
            console.log("Todo not found")
        }
        else {
            writeTodo(updatedTodo)
            console.log("Todo remove successfully")
        }
    })
program.command('marked')
    .description("This command will mark and delete the todo is done")
    .argument("<title>", "Enter the title of todo")
    .action((title) => {
        const todos = readTodo()
        let found = false
        todos.map((todo) => {
            if (todo.Title === title){
                todo.Title = title,
                    todo.Done = true,
                    found = true
            }
            return todo
        })
        if (found) {
            writeTodo(todos)
            console.log("Todo MArked succesfully")
        }
        else {
            console.log("Todo Not Found")
        }
    })
program.parse()