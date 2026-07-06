using Moq;
using TodoApp.Api.DTOs;
using TodoApp.Api.Models;
using TodoApp.Api.Repositories;
using TodoApp.Api.Services;

namespace TodoApp.Tests;

public class TodoServiceTests
{
    private readonly Mock<ITodoRepository> _todoRepository;
    private readonly ITodoService _todoService;

    public TodoServiceTests()
    {
        _todoRepository = new Mock<ITodoRepository>();
        _todoService = new TodoService(_todoRepository.Object);
    }

    [Fact]
    public async Task GetAll_ReturnsEmptyList_WhenNoTodos()
    {
        _todoRepository.Setup(r => r.GetAllAsync()).ReturnsAsync(Enumerable.Empty<TodoItem>());

        var result = await _todoService.GetAllAsync();

        Assert.Empty(result);
    }

    [Fact]
    public async Task Add_ReturnsTodo_WithCorrectTitle()
    {
        var dto = new CreateTodoDto { Title = "call doc" };
        _todoRepository.Setup(r => r.AddAsync(It.IsAny<TodoItem>())).ReturnsAsync((TodoItem t) => t);

        var result = await _todoService.AddAsync(dto);

        Assert.Equal("call doc", result.Title);
    }

    [Fact]
    public async Task Add_NewTodo_ShouldNotBeCompleted()
    {
        var dto = new CreateTodoDto { Title = "call doc" };
        _todoRepository.Setup(r => r.AddAsync(It.IsAny<TodoItem>())).ReturnsAsync((TodoItem t) => t);

        var result = await _todoService.AddAsync(dto);

        Assert.False(result.IsCompleted);
    }

    [Fact]
    public async Task Add_ShouldThrow_WhenTitleIsEmpty()
    {
        var dto = new CreateTodoDto { Title = string.Empty };

        await Assert.ThrowsAsync<ArgumentException>(() => _todoService.AddAsync(dto));
    }

    [Fact]
    public async Task Add_ShouldThrow_WhenTitleExceeds500Chars()
    {
        var dto = new CreateTodoDto { Title = new string('a', 501) };

        await Assert.ThrowsAsync<ArgumentException>(() => _todoService.AddAsync(dto));
    }

    [Fact]
    public async Task UpdateCompleted_ShouldUpdateIsCompleted_WhenIdExists()
    {
        var todo = new TodoItem { Title = "call doc" };
        var dto = new UpdateCompletedDto { IsCompleted = true };

        _todoRepository.Setup(r => r.GetByIdAsync(todo.Id)).ReturnsAsync(todo);
        _todoRepository.Setup(r => r.UpdateAsync(It.IsAny<TodoItem>())).ReturnsAsync((TodoItem t) => t);

        var result = await _todoService.UpdateCompletedAsync(todo.Id, dto);

        Assert.NotNull(result);
        Assert.True(result.IsCompleted);
    }

    [Fact]
    public async Task UpdateCompleted_ShouldReturnNull_WhenIdNotFound()
    {
        var dto = new UpdateCompletedDto { IsCompleted = true };
        _todoRepository.Setup(r => r.GetByIdAsync(It.IsAny<Guid>())).ReturnsAsync((TodoItem?)null);

        var result = await _todoService.UpdateCompletedAsync(Guid.NewGuid(), dto);

        Assert.Null(result);
    }

    [Fact]
    public async Task Delete_ShouldReturnTrue_WhenIdExists()
    {
        _todoRepository.Setup(r => r.DeleteAsync(It.IsAny<Guid>())).ReturnsAsync(true);

        var result = await _todoService.DeleteAsync(Guid.NewGuid());

        Assert.True(result);
    }

    [Fact]
    public async Task Delete_ShouldReturnFalse_WhenIdNotFound()
    {
        _todoRepository.Setup(r => r.DeleteAsync(It.IsAny<Guid>())).ReturnsAsync(false);

        var result = await _todoService.DeleteAsync(Guid.NewGuid());

        Assert.False(result);
    }

    [Fact]
    public async Task DeleteAllCompleted_ShouldReturnCount_WhenCompletedTodosExist()
    {
        _todoRepository.Setup(r => r.DeleteAllCompletedAsync()).ReturnsAsync(3);

        var result = await _todoService.DeleteAllCompletedAsync();

        Assert.Equal(3, result);
    }

    [Fact]
    public async Task DeleteAllCompleted_ShouldReturnZero_WhenNoCompletedTodos()
    {
        _todoRepository.Setup(r => r.DeleteAllCompletedAsync()).ReturnsAsync(0);

        var result = await _todoService.DeleteAllCompletedAsync();

        Assert.Equal(0, result);
    }
}