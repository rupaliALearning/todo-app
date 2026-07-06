namespace TodoApp.Api.Models;

public class TodoItem
{
    public Guid Id { get; init; } = Guid.NewGuid();
    public required string Title { get; set; }
    public bool IsCompleted { get; set; }
    public DateTime? DueDate { get; set; }
    public DateTime CreatedAt { get; init; } = DateTime.UtcNow;
}