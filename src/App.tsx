import {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
export type todoListsType = {
  id: string
  title: string
  filter: FilterValuesType
}
export const App = ()=> {

  let todolistID1=v1();
  let todolistID2=v1();

  let [todoLists, setTodoLists] = useState<Array<todoListsType>>([
    {id: todolistID1, title: 'What to learn', filter: 'all'},
    {id: todolistID2, title: 'What to buy', filter: 'all'},
  ])

  let [tasks, setTasks] = useState({
    [todolistID1]:[
      {id: v1(), title: "HTML&CSS", isDone: true},
      {id: v1(), title: "JS", isDone: true},
      {id: v1(), title: "ReactJS", isDone: false},
      {id: v1(), title: "Rest API", isDone: false},
      {id: v1(), title: "GraphQL", isDone: false},
    ],
    [todolistID2]:[
      {id: v1(), title: "HTML&CSS2", isDone: true},
      {id: v1(), title: "JS2", isDone: true},
      {id: v1(), title: "ReactJS2", isDone: false},
      {id: v1(), title: "Rest API2", isDone: false},
      {id: v1(), title: "GraphQL2", isDone: false},
    ]
  });



  function removeTask(todolistId: string, id: string) {
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(t => t.id != id)} )
  }

  function addTask(todolistId: string, title: string) {
    let newTask = {id: v1(), title: title, isDone: false};
    setTasks({[todolistId]:[...tasks[todolistId], newTask], ...tasks});
  }

  function changeStatus(todolistId: string,taskId: string, isDone: boolean) {
    setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id=== taskId ? {...t, isDone} : t)})
  }

  function changeFilter(todolistId: string, value: FilterValuesType) {
    setTodoLists( todoLists.map(filtered => filtered.id === todolistId ? {...filtered, filter: value} : filtered ))
  }

  return (
    <div className="App">
      {todoLists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
          tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
        }
        if (tl.filter === "completed") {
          tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
        }

      return (
        <Todolist
            key={tl.id}
            todolistId={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            removeTask={removeTask}
            filter={tl.filter}
        />
      )})}

    </div>
  );
}
