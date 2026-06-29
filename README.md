## 📌 Sobre o Projeto

Este projeto foi desenvolvido para ser a vitrine digital da **EJCON** (Empresa Júnior de Consultoria) e, ao mesmo tempo, uma ferramenta robusta para a gestão interna da equipe.

A plataforma é dividida em duas frentes:

1.  **Site Institucional (Frontend):** Apresentação da empresa, soluções oferecidas, cultura, membros da equipe e captação de novos clientes (Leads).
    
2.  **Painel Administrativo (Backend):** Um dashboard moderno e customizado com a identidade visual da empresa para gerenciar todo o conteúdo do site, monitorar acessos e analisar estatísticas.
    

## ✨ Funcionalidades Principais

-   **🧑‍💻 Gestão de Equipe:** Cadastro e controle de membros e cargos.
    
-   **💼 Portfólio de Soluções:** Gerenciamento dos serviços prestados pela empresa.
    
-   **🎯 Captação de Leads:** Recebimento e armazenamento seguro de contatos feitos pelo site.
    
-   **📊 Estatísticas da Empresa:** Controle de projetos entregues e clientes impactados.
    
-   **🎨 Painel Moderno:** Dashboard administrativo estilizado com **Django Unfold** (Dark mode, responsivo e com as cores da EJCON).
    

## 🛠️ Tecnologias Utilizadas

-   **Backend:** [Python](https://www.python.org/ "null") + [Django](https://www.djangoproject.com/ "null")
    
-   **Painel Admin:** [Django Unfold](https://github.com/unfoldadmin/django-unfold "null") (Baseado em Tailwind CSS)
    
-   **Frontend:** HTML5, Tailwind CSS
    
-   **Banco de Dados:** SQLite3 (Desenvolvimento) / PostgreSQL (Produção)
    

## 🚀 Como executar o projeto localmente

Siga o passo a passo abaixo para rodar o projeto na sua máquina.

### Pré-requisitos

-   Python 3.10 ou superior instalado.
    
-   Git instalado.
    

### 1. Clone o repositório

```
git clone [https://github.com/SEU-USUARIO/ejcon_project.git](https://github.com/SEU-USUARIO/ejcon_project.git)
cd ejcon_project

```

### 2. Crie e ative o Ambiente Virtual

**No Windows:**

```
python -m venv venv
venv\Scripts\activate

```

**No Linux/Mac:**

```
python3 -m venv venv
source venv/bin/activate

```

### 3. Instale as dependências

```
pip install -r requirements.txt

```

_(Caso não tenha o arquivo `requirements.txt` gerado ainda, instale manualmente: `pip install django django-unfold`)_

### 4. Aplique as migrações do Banco de Dados

```
python manage.py makemigrations
python manage.py migrate

```

### 5. Crie um Superusuário (Para acessar o painel)

```
python manage.py createsuperuser

```

_(Siga as instruções no terminal para definir usuário, email e senha)._

### 6. Rode o servidor

```
python manage.py runserver

```

O site estará disponível em: `http://127.0.0.1:8000/` O painel administrativo em: `http://127.0.0.1:8000/admin/`

## 📁 Estrutura do Projeto (App Core)

O aplicativo principal do sistema (`core`) gerencia os seguintes modelos de dados:

-   `MembroEquipe`: Time atual da EJCON.
    
-   `Solucao`: Serviços oferecidos.
    
-   `Valor`: Princípios e cultura da empresa.
    
-   `Lead`: Potenciais clientes que entraram em contato.
    
-   `Estatistica`: Números globais de impacto.
    
-   `RegistroAcesso`: Logs de tráfego do site.
    

## ☁️ Deploy (Produção)

Para o ambiente de produção, recomenda-se a seguinte stack de infraestrutura para garantir estabilidade e segurança:

-   **Servidor:** VPS Linux (Ubuntu 22.04+)
    
-   **Servidor Web:** Nginx (Proxy Reverso) + Gunicorn (WSGI)
    
-   **Banco de Dados:** PostgreSQL
    

_Consulte o Manual de Deploy da EJCON para as configurações específicas de segurança do arquivo `settings.py` (ALLOWED_HOSTS, DEBUG=False, STATIC_ROOT)._