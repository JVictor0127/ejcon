from django import forms
from .models import Lead

class LeadForm(forms.ModelForm):
    class Meta:
        model = Lead
        fields = ['nome', 'email', 'contato', 'mensagem']
        widgets = {
            'nome': forms.TextInput(attrs={'class': 'w-full px-3 py-2 border rounded-md', 'placeholder': 'Seu nome'}),
            'email': forms.EmailInput(attrs={'class': 'w-full px-3 py-2 border rounded-md', 'placeholder': 'Email'}),
            'contato': forms.TextInput(attrs={'class': 'w-full px-3 py-2 border rounded-md', 'placeholder': 'Contato'}),
            'mensagem': forms.Textarea(attrs={'class': 'w-full px-3 py-2 border rounded-md', 'rows': 4}),
        }
