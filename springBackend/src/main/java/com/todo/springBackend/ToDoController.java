package com.todo.springBackend;

import org.springframework.beans.factory.annotation.Autowired;
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
    toDoList.add(new ToDoItem("test"));
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
    ToDoItem item = new ToDoItem(newItem.getTitle());
    toDoItemRepository.save(item);
    return item;
  }

  // delete item from todo list
  @DeleteMapping("/todo/{id}")
  public Iterable<ToDoItem> deleteToDoItem(@PathVariable Integer id) {
    toDoItemRepository.deleteById(id);
    return toDoItemRepository.findAll();
  }

  // update state of item in todo list
  @PutMapping("/todo/{id}")
  public ToDoItem updateState(@PathVariable Integer id) {
    if (toDoItemRepository.existsById(id)) {
      // change status to !status
      ToDoItem item = toDoItemRepository.findById(id).get();
      item.setStatus(!item.isStatus());
      toDoItemRepository.save(item);
      return item;
    }
    // else exception

    return null;
  }

  // update item title in todo list
  @PutMapping(
          value = "/todo/update/{id}",
          consumes = "application/json"
  )
  public ToDoItem updateTitle(@RequestBody ToDoItem toDoItem, @PathVariable Integer id) {
    if (toDoItemRepository.existsById(id)) {
      ToDoItem item = toDoItemRepository.findById(id).get();
      item.setTitle(toDoItem.getTitle());
      toDoItemRepository.save(item);
      return item;
    }
    // else exception

    return null;
  }

  // login

  // registering
}