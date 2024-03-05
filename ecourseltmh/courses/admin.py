from django.contrib import admin
from courses.models import Category, Course, Lesson
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget


class CourseForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Course
        fields = '__all__'


class MyCourseAdmin(admin.ModelAdmin):
    list_display = ['id', 'subject', 'created_date', 'updated_date', 'active']
    search_fields = ['subject', 'description']
    list_filter = ['id', 'created_date', 'subject']
    readonly_fields = ['avatar']
    form = CourseForm

    def avatar(self, obj):
        if obj:
            return mark_safe('<img src="/static/{url}" width="120" />'.format(url=obj.image.name))

    class Media:
        css = {
            'all': ('/static/css/style.css',)
        }


# Register your models here.
admin.site.register(Category)
admin.site.register(Lesson)
admin.site.register(Course, MyCourseAdmin)