using Microsoft.AspNetCore.Mvc;
using TodoApp.Api.DTOs;
using TodoApp.Api.Models;
using TodoApp.Api.Services;

namespace TodoApp.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TodosController : ControllerBase
{
    private readonly ITodoService _todoService;

    public TodosController(ITodoService todoService)
    {
        _todoService = todoService;
    }

    [HttpGet]
    [ProducesResponseType(typeof(IEnumerable<TodoItem>), StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll()
    {
        var todos = await _todoService.GetAllAsync();
        return Ok(todos);
    }

    [HttpPost]
    [ProducesResponseType(typeof(TodoItem), StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Add([FromBody] CreateTodoDto request)
    {
        if (string.IsNullOrWhiteSpace(request.Title))
            return BadRequest(new { error = "Description cannot be empty" });

        if (request.Title.Length > 500)
            return BadRequest(new { error = "Description cannot exceed 500 characters" });

        var todo = await _todoService.AddAsync(request);
        return CreatedAtAction(nameof(GetAll), new { id = todo.Id }, todo);
    }

    [HttpPatch("{id}/completed")]
    [ProducesResponseType(typeof(TodoItem), StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> UpdateCompleted(Guid id, [FromBody] UpdateCompletedDto request)
    {
        var todo = await _todoService.UpdateCompletedAsync(id, request);
        if (todo is null)
            return NotFound(new { error = $"Todo with id {id} not found" });

        return Ok(todo);
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(Guid id)
    {
        var deleted = await _todoService.DeleteAsync(id);
        if (!deleted)
            return NotFound(new { error = $"Todo with id {id} not found" });

        return NoContent();
    }

    [HttpDelete("completed")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> DeleteAllCompleted()
    {
        var count = await _todoService.DeleteAllCompletedAsync();
        return Ok(new { deleted = count });
    }
}