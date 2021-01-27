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
}

	/*
	{ id: row.id, title: row.title, state }
	 */
