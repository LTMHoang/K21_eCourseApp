from django.db import models
from django.contrib.auth.models import AbstractUser
from ckeditor.fields import RichTextField
from cloudinary.models import CloudinaryField

# Create your models here.


class User(AbstractUser):
    avatar = CloudinaryField(null=True)


class BaseModel(models.Model):
    created_date = models.DateTimeField(auto_now_add=True, null=True)
    updated_date = models.DateTimeField(auto_now=True, null=True)
    active = models.BooleanField(default=True)

    #Thiết lập abstract
    class Meta:
        abstract = True


class Category(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class Tag(BaseModel):
    name = models.CharField(max_length=50, unique=True)

    def __str__(self):
        return self.name


class ItemBase(BaseModel):
    tags = models.ManyToManyField(Tag)

    class Meta:
        abstract = True


class Course(ItemBase):
    subject = models.CharField(max_length=100, null=True)
    description = RichTextField(null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    image = CloudinaryField(null=True)

    def __str__(self):
        return self.subject


class Lesson(ItemBase):
    subject = models.CharField(max_length=100, null=True)
    content = RichTextField(null=True)
    course = models.ForeignKey(Course, on_delete=models.CASCADE)
    image = CloudinaryField(null=True)

    def __str__(self):
        return self.subject


class Interaction(BaseModel):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE)

    class Meta:
        abstract = True


class Comment(Interaction):
    content = models.CharField(max_length=255)


class Like(Interaction):

    class Meta:
        unique_together = ('user', 'lesson')


# from django.db.models import Count
# c = Category.objects.annotate(counter=Course('course_set')).values('id', 'name', 'counter')