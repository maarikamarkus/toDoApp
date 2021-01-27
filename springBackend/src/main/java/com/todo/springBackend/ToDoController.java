package com.todo.springBackend;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ToDoController {

  public List<ToDoItem> toDoList;

  public ToDoController() {
    this.toDoList = new ArrayList<>();
    toDoList.add(new ToDoItem(0, "test", false));
  }

  @RequestMapping("/")
  public String index() {
    return "Olen ToDoControlleris!";
  }


  @GetMapping(
          value = "/todo",
          produces = "application/json"
  )
  public @ResponseBody List<ToDoItem> getToDoList()
  {
    return toDoList;
  }

  @PostMapping(
          value = "/todo",
          consumes = "application/json",
          produces = "application/json"
  )
  public ToDoItem newItem(@RequestBody ToDoItem newItem) {
    toDoList.add(newItem);
    System.out.println(toDoList.toString());

    return newItem;
  }

  // delete item from todo list
  @DeleteMapping("/todo/{id}")
  public List<ToDoItem> deleteToDoItem(@PathVariable int id) {
    for (int i = 0; i < toDoList.size(); i++) {
      if (toDoList.get(i).getId() == id) {
        toDoList.remove(i);
        break;
      }
    }
    return toDoList;
  }

  // update state of item in todo list
  @PutMapping("/todo/{id}")
  public ToDoItem updateState(@PathVariable int id) {
    for (ToDoItem item : toDoList) {
      if (item.getId() == id) {
        item.setStatus(!item.isStatus());
        return item;
      }
    }
    return null;
  }

  // update item title in todo list

  // login

  // registering

  // database
}