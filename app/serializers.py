from rest_framework import serializers
from .models import Task

# Defining a serializer for the Task model
class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        # Specifying the model to be serialized
        model = Task
        
        # Including all fields of the model in the serialized output
        fields = "__all__"
