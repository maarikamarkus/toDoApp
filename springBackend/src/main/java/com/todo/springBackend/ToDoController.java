package com.todo.springBackend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ToDoController {

  @Autowired
  private ToDoItemRepository toDoItemRepository;

  public List<ToDoItem> toDoList;

  public ToDoController() {
    this.toDoList = new ArrayList<>();
    toDoList.add(new ToDoItem("test", false));
  }

  @RequestMapping("/")
  public String index() {
    return "Olen ToDoControlleris!";
  }

  @GetMapping(
          value = "/todo",
          produces = "application/json"
  )
  public @ResponseBody Iterable<ToDoItem> getToDoList()
  {
    return toDoItemRepository.findAll();
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
  @PutMapping(
          value = "/todo/update/{id}",
          consumes = "application/json"
  )
  public ToDoItem updateTitle(@RequestBody String newTitle, @PathVariable int id) {
    for (ToDoItem item : toDoList) {
      if (item.getId() == id) {
        item.setTitle(newTitle);
        return item;
      }
    }
    return null;
  }

  // login

  // registering

  // database
}