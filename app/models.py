from django.db import models

# Task model representing a task with title, description, completion status, creation, and last update timestamps
class Task(models.Model):
    # Title of the task, limited to a maximum of 100 characters
    title = models.CharField(max_length=100)
    
    # Description of the task, limited to a maximum of 100 characters
    description = models.CharField(max_length=100)
    
    # Boolean field representing whether the task is completed or not, default is set to False
    completed = models.BooleanField(default=False)

    # Timestamp representing the creation time of the task, auto-generated when a new task is created
    created_at = models.DateTimeField(auto_now_add=True)
    
    # Timestamp representing the last update time of the task, auto-updated whenever the task is modified
    updated_at = models.DateTimeField(auto_now=True)
    
    # String representation of the Task object, returns the title of the task
    def __str__(self):
        return self.title
