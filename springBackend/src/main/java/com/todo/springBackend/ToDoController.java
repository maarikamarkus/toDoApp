package com.todo.springBackend;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class ToDoController {

  public List<ToDoItem> toDoList;

  public ToDoController() {
    this.toDoList = new ArrayList<>();
  }

  @RequestMapping("/")
  public String index() {
    return "Olen ToDoControlleris!";
  }

  @PostMapping("/todo")
  public String newItem(@RequestBody String newTitle) {
    ToDoItem newItem = new ToDoItem(0, newTitle, false);
    toDoList.add(newItem);
    System.out.println(toDoList.toString());
    return "Added " + newTitle;
  }
}

	/*
	{ id: row.id, title: row.title, state }
	 */
