using TodoApp.Api.Models;
using TodoApp.Api.DTOs;
using TodoApp.Api.Repositories;

namespace TodoApp.Api.Services;

public class TodoService : ITodoService{
    private readonly ITodoRepository _todoRepo;

    public TodoService(ITodoRepository todoRepo){
        _todoRepo = todoRepo;
    }
    
    public async Task<IEnumerable<TodoItem>> GetAllAsync(){
        return await _todoRepo.GetAllAsync();
    }

    public async Task<TodoItem> AddAsync(CreateTodoDto createDto){
       if (string.IsNullOrWhiteSpace(createDto.Title))
            throw new ArgumentException("Title cannot be empty", nameof(createDto.Title));

        if (createDto.Title.Length > 500)
            throw new ArgumentException("Title cannot exceed 500 characters", nameof(createDto.Title)); 
        var newTodoItem = new TodoItem {Title = createDto.Title, DueDate = createDto.DueDate};
        return await _todoRepo.AddAsync(newTodoItem);
    }

    public async Task<TodoItem?> UpdateCompletedAsync(Guid id, UpdateCompletedDto dto)
    {
        var todoItem = await _todoRepo.GetByIdAsync(id);
        if (todoItem is null) return null;

        todoItem.IsCompleted = dto.IsCompleted;
        return await _todoRepo.UpdateAsync(todoItem);
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        return await _todoRepo.DeleteAsync(id);
    }

}