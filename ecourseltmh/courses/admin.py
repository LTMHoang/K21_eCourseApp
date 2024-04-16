from django.contrib import admin
from django.db.models import Count

from courses.models import *
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path
from django.template.response import TemplateResponse


class MyCourseAdminSite(admin.AdminSite):
    site_header = 'eCourseOnline'

    def get_urls(self):
        return [path('course-stats/', self.stats_view)] + super().get_urls()

    def stats_view(self, request):
        course_stats = Category.objects.annotate(c=Count('course__id')).values('id', 'name', 'c')
        return TemplateResponse(request, 'admin/stats.html', {
            "course_stats": course_stats
        })


admin_site = MyCourseAdminSite(name='iCourse')


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
admin_site.register(Category)
admin_site.register(Course, MyCourseAdmin)
admin_site.register(Lesson)
admin_site.register(User)
admin_site.register(Tag)
admin_site.register(Comment)