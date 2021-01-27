package com.todo.springBackend;

public class ToDoItem {
  private int id;
  private String title;
  private boolean state;

  public ToDoItem(int id, String title, boolean state) {
    this.id = id;
    this.title = title;
    this.state = state;
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

  public boolean isState() {
    return state;
  }

  public void setState(boolean state) {
    this.state = state;
  }

  @Override
  public String toString() {
    return "ToDoItem: " + title;
  }
}
