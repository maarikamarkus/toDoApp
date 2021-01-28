package com.todo.springBackend;

import org.springframework.data.repository.CrudRepository;

public interface ToDoItemRepository extends CrudRepository<ToDoItem, Integer> {

}
