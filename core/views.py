from datetime import date
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib import messages
from .models import Valor, Solucao, MembroEquipe, Lead, Estatistica
from .forms import LeadForm

class LandingPageView(CreateView):
    model = Lead
    form_class = LeadForm
    template_name = 'core/index.html'
    success_url = reverse_lazy('index')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['culturas'] = Valor.objects.all().order_by('data_criacao')
        context['solucoes'] = Solucao.objects.all().order_by('-data_criacao')
        context['equipe'] = MembroEquipe.objects.all().order_by('data_criacao')

        # Cálculos de Métricas
        context['anos_historia'] = date.today().year - 1995
        estatistica = Estatistica.objects.first()
        
        if estatistica:
            context['projetos_entregues'] = estatistica.projetos_entregues
            context['clientes_impactados'] = estatistica.clientes_impactados
        else:
            context['projetos_entregues'] = 0
            context['clientes_impactados'] = 0

        return context

    def form_valid(self, form):
        messages.success(self.request, "Mensagem enviada com sucesso!")
        return super().form_valid(form)

    def form_invalid(self, form):
        messages.error(self.request, "Ocorreu um erro.")
        return super().form_invalid(form)

import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import RegistroAcesso 

@csrf_exempt
def registrar_acesso(request):
    if request.method == 'POST':
        try:
            # Tenta ler os dados enviados pelo JavaScript
            data = json.loads(request.body)
            pagina = data.get('pagina')
            tempo = data.get('tempo')
            
            # Só salva se o tempo for maior que 0 e a página existir
            if pagina and tempo is not None and tempo > 0:
                RegistroAcesso.objects.create(pagina=pagina, tempo_permanencia=tempo)
                return JsonResponse({'status': 'sucesso'})
        except Exception as e:
            return JsonResponse({'status': 'erro'}, status=400)
            
    return JsonResponse({'status': 'metodo_invalido'}, status=405)