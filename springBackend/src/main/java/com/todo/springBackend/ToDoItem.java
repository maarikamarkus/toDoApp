package com.todo.springBackend;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class ToDoItem {
  @Id
  @GeneratedValue(strategy= GenerationType.AUTO)
  private Integer id;
  private String title;
  private boolean status;

  public ToDoItem() {}

  public ToDoItem(String title, boolean status) {
    this.title = title;
    this.status = status;
  }

  public int getId() {
    return id;
  }

  public void setId(int id) {
    this.id = id;
  }

  public String getTitle() {
    return title;
  }

  public void setTitle(String title) {
    this.title = title;
  }

  public boolean isStatus() {
    return status;
  }

  public void setStatus(boolean status) {
    this.status = status;
  }

  @Override
  public String toString() {
    return "ToDoItem: " + title;
  }
}
