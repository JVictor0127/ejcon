from django.db import models
from django_ckeditor_5.fields import CKEditor5Field

class Valor(models.Model):
    icone = models.CharField(max_length=50, help_text="Ex: 💡, 📈")
    titulo = models.CharField(max_length=100)
    descricao = models.TextField()
    data_criacao = models.DateTimeField(auto_now_add=True)
    class Meta: verbose_name_plural = "Valores (Cultura)"
    def __str__(self): return self.titulo

class Solucao(models.Model):
    titulo = models.CharField(max_length=150)
    descricao = CKEditor5Field('Descrição Detalhada', config_name='extends')
    data_criacao = models.DateTimeField(auto_now_add=True)
    class Meta: verbose_name_plural = "Soluções"
    def __str__(self): return self.titulo

class MembroEquipe(models.Model):
    nome = models.CharField(max_length=150)
    funcao = models.CharField(max_length=100)
    foto = models.ImageField(upload_to='equipe/', blank=True, null=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    class Meta: verbose_name_plural = "Membros da Equipe"
    def __str__(self): return self.nome

class Estatistica(models.Model):
    projetos_entregues = models.PositiveIntegerField(default=150)
    clientes_impactados = models.PositiveIntegerField(default=100)
    class Meta: verbose_name_plural = "Estatísticas da Empresa"
    def __str__(self): return "Métricas Oficiais"

class Lead(models.Model):
    nome = models.CharField(max_length=150)
    email = models.EmailField()
    contato = models.CharField(max_length=20, blank=True, null=True)
    mensagem = models.TextField()
    data_cadastro = models.DateTimeField(auto_now_add=True)
    def __str__(self): return self.nome

class RegistroAcesso(models.Model):
    pagina = models.CharField(max_length=255, verbose_name="Página Acessada")
    tempo_permanencia = models.IntegerField(verbose_name="Tempo (Segundos)")
    data_acesso = models.DateTimeField(auto_now_add=True, verbose_name="Data/Hora")

    class Meta:
        verbose_name = "Registro de Acesso"
        verbose_name_plural = "Análise de Tráfego"

    def __str__(self):
        return f"{self.pagina} - {self.tempo_permanencia}s"