from django.contrib import admin
from .models import Task

# Customizing the appearance of the Task model in the Django admin interface
class TaskAdmin(admin.ModelAdmin):
    # Displaying specific fields in the list view of the admin interface
    list_display = ("title", "description", "completed", "created_at", "updated_at")

# Registering the Task model with the TaskAdmin configuration in the Django admin site
admin.site.register(Task, TaskAdmin)
