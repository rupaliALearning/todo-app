namespace TodoApp.Api.DTOs;

public class CreateTodoDto{
    public required string Title {get; set;}
    public DateOnly? DueDate {get; set;}
}