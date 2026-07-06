using Microsoft.EntityFrameworkCore;
using TodoApp.Api.Data;
using TodoApp.Api.Models;

namespace TodoApp.Api.Repositories;

public class TodoRepository : ITodoRepository
{
    private readonly AppDbContext _context;

    public TodoRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<TodoItem>> GetAllAsync()
    {
        return await _context.Todos
            .OrderByAscending(t => t.DueDate)
            .ToListAsync();
    }

    public async Task<TodoItem?> GetByIdAsync(Guid id)
    {
        return await _context.Todos.FindAsync(id);
    }

    public async Task<TodoItem> AddAsync(TodoItem item)
    {
        _context.Todos.Add(item);
        await _context.SaveChangesAsync();
        return item;
    }

    public async Task<TodoItem?> UpdateAsync(TodoItem item)
    {
        var existingTodo = await _context.Todos.FindAsync(item.Id);
        if (existingTodo is null) return null;

        existingTodo.Title = item.Title;
        existingTodo.IsCompleted = item.IsCompleted;
        existingTodo.DueDate = item.DueDate;

        await _context.SaveChangesAsync();
        return existingTodo;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var todo = await _context.Todos.FindAsync(id);
        if (todo is null) return false;

        _context.Todos.Remove(todo);
        await _context.SaveChangesAsync();
        return true;
    }
}