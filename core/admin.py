from django.contrib import admin
from unfold.admin import ModelAdmin  # Importação correta do Unfold
from .models import Valor, Solucao, MembroEquipe, Lead, Estatistica, RegistroAcesso
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.admin import GroupAdmin as BaseGroupAdmin
from unfold.forms import AdminPasswordChangeForm, UserChangeForm, UserCreationForm

# Desregistra o padrão do Django
admin.site.unregister(User)
admin.site.unregister(Group)

# Registra usando o Unfold
@admin.register(User)
class UserAdmin(BaseUserAdmin, ModelAdmin):
    form = UserChangeForm
    add_form = UserCreationForm
    change_password_form = AdminPasswordChangeForm

@admin.register(Group)
class GroupAdmin(BaseGroupAdmin, ModelAdmin):
    pass

# ==============================================================
# ATENÇÃO AQUI: Troquei todos os "admin.ModelAdmin" por "ModelAdmin"
# ==============================================================

@admin.register(Valor)
class ValorAdmin(ModelAdmin): # Antes estava admin.ModelAdmin
    list_display = ('icone', 'titulo')

@admin.register(Solucao)
class SolucaoAdmin(ModelAdmin): # Antes estava admin.ModelAdmin
    list_display = ('titulo', 'data_criacao')

@admin.register(MembroEquipe)
class MembroEquipeAdmin(ModelAdmin): # Antes estava admin.ModelAdmin
    list_display = ('nome', 'funcao')

@admin.register(Lead)
class LeadAdmin(ModelAdmin): # Antes estava admin.ModelAdmin
    list_display = ('nome', 'email', 'contato', 'data_cadastro')
    readonly_fields = ('data_cadastro',)

@admin.register(Estatistica)
class EstatisticaAdmin(ModelAdmin): # Antes estava admin.ModelAdmin
    list_display = ('projetos_entregues', 'clientes_impactados')
    
    def has_add_permission(self, request):
        if self.model.objects.exists(): return False # Bloqueia novos registros
        return super().has_add_permission(request)
        
    def has_delete_permission(self, request, obj=None):
        return False # Bloqueia exclusão

@admin.register(RegistroAcesso)
class RegistroAcessoAdmin(ModelAdmin): # Antes estava admin.ModelAdmin
    list_display = ('pagina', 'tempo_permanencia', 'data_acesso')
    list_filter = ('pagina', 'data_acesso')
    readonly_fields = ('pagina', 'tempo_permanencia', 'data_acesso')
    
    # Impede que alguém crie registros falsos pelo painel
    def has_add_permission(self, request):
        return False