from django.urls import path
from . import views

urlpatterns = [
    path('', views.LandingPageView.as_view(), name='index'),
    # Nova rota para o rastreamento (invisível para o usuário)
    path('api/rastrear/', views.registrar_acesso, name='registrar_acesso'),
]