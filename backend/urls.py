from django.contrib import admin
from django.urls import path, include
from app import views
from rest_framework import routers

# Creating a router instance from Django REST Framework for handling viewsets
router = routers.DefaultRouter()
router.register('task-list', views.TaskView, 'tasks')

# Defining URL patterns for the project
urlpatterns = [
    # Admin URL for accessing the Django admin interface
    path('admin/', admin.site.urls),

    # API URLs using the router
    path('api/', include(router.urls)),
]
