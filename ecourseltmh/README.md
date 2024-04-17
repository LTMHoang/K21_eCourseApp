Các câu lệnh trong Django

1. Cài đặt môi trường: pip install django (thường install ở thư mục lớn nhất)

2. Tạo project: django-admin startproject <project-name> (tạo ở thư mục lớn nhất và ví dụ ở đây project đây là ecourseltmh)

3. Tạo app: django-admin startapp <app-name> (tạo ở project và ví dụ ở đây app là courses)

4. Chạy project: python manage.py runserver (thực hiện ở project)

5. Tạo hoặc thay đổi models.py:
    B1: python manage.py makemigrations
    B2: python manage.py migrate

6. Tạo user: python manage.py createsuperuser
    User: admin
    Pass: 123456
    Pass: 123456