// *** IMPORTANTE: SUBSTITUA ESTE URL PELO URL DO SEU GOOGLE APPS SCRIPT WEB APP ***
// Este URL é apenas um exemplo. Você DEVE usar o URL da sua implantação do Apps Script.
document.addEventListener('DOMContentLoaded', function() {
    // --- Lógica do Menu Mobile ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    
    // --- Lógica de Scroll Suave para Links de Navegação ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            if(mobileMenu.classList.contains('hidden') === false) {
                mobileMenu.classList.add('hidden'); // Esconde o menu mobile ao clicar em um link
            }
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Lógica do Contador Animado (CountUp) na Seção 'Sobre' ---
    const countUp = (el) => {
        const target = +el.dataset.target;
        const duration = 2000; // Duração da animação em milissegundos
        let start = 0;
        const stepTime = Math.abs(Math.floor(duration / target));
        
        const timer = setInterval(() => {
            start += 1;
            el.textContent = start;
            if (start === target) {
                clearInterval(timer); // Para o contador quando atinge o alvo
            }
        }, stepTime);
    };

    // Observer para iniciar a animação quando a seção 'Sobre' estiver visível
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-target]');
                counters.forEach(counter => {
                    countUp(counter);
                });
                observer.unobserve(entry.target); // Para de observar após a animação
            }
        });
    }, { threshold: 0.5 }); // A animação começa quando 50% da seção está visível
    
    observer.observe(document.querySelector('#sobre'));

    // --- Dados e Lógica para a Seção 'Soluções' (Modal) ---
    const solucoes = [
        { title: "Pesquisa de Mercado", description: "Obtenha informações valiosas sobre o mercado, clientes, concorrentes e tendências para tomar decisões mais embasadas e estratégicas.", benefit: "Ajuda a tomar decisões mais informadas, identificando oportunidades de crescimento e evitando riscos." },
        { title: "Plano de Negócio", description: "Estruture suas ideias e projetos, analisando viabilidade, definindo objetivos, estratégias, metas e projeções financeiras.", benefit: "Aumenta as chances de sucesso do empreendimento ao fornecer um roteiro claro e profissional." },
        { title: "Pesquisa de Satisfação", description: "Entenda o grau de satisfação dos seus clientes para melhorar produtos, serviços e processos, garantindo a fidelização do público.", benefit: "Aumenta a fidelidade e satisfação do cliente, impulsionando a retenção e o sucesso no mercado." },
        { title: "Mapeamento de Processos", description: "Identifique e otimize os processos internos da sua empresa, eliminando gargalos, reduzindo custos e aumentando a eficiência operacional.", benefit: "Aumenta a eficiência, reduz custos e melhora a qualidade dos produtos e serviços." },
        { title: "Recrutamento e Seleção", description: "Encontre os candidatos ideais para suas vagas através de técnicas de seleção e avaliação de perfis profissionais alinhados à sua cultura.", benefit: "Garante contratações mais eficientes, economizando tempo e recursos, com uma equipe qualificada." },
        { title: "Pesquisa de Clima Organizacional", description: "Compreenda o clima interno da empresa para garantir um ambiente de trabalho saudável e produtivo, identificando pontos de melhoria.", benefit: "Melhora o ambiente organizacional, reduzindo a rotatividade e aumentando a motivação." },
        { title: "Análise de Perfil em Mídias Sociais", description: "Avalie o desempenho e engajamento do seu perfil nas redes sociais, identificando pontos fortes e áreas de melhoria.", benefit: "Otimiza suas estratégias de marketing digital, aumentando a visibilidade e o engajamento." },
        { title: "Estratégia de Marketing Digital", description: "Desenvolvemos estratégias de marketing personalizadas para maximizar o engajamento e ampliar sua presença online.", benefit: "Melhora o alcance e impacto da marca com planos detalhados para engajar seu público-alvo." },
        { title: "Criação de Branding", description: "Desenvolvimento de identidade visual e de marca completa, incluindo logotipos e mensagens para fortalecer sua presença no mercado.", benefit: "Gera uma conexão sólida com seu público, diferenciando sua empresa da concorrência." },
    ];

    const solucoesContainer = document.getElementById('solucoes-container');
    const modal = document.getElementById('solucao-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalDescription = document.getElementById('modal-description');
    const modalBenefit = document.getElementById('modal-benefit');
    const modalCloseBtn = document.getElementById('modal-close-btn');

    // Popula a seção de soluções e adiciona listeners para abrir o modal
    solucoes.forEach(solucao => {
        const card = document.createElement('div');
        card.className = 'card p-6 cursor-pointer';
        card.innerHTML = `<h3 class="text-xl font-bold">${solucao.title}</h3><p class="text-light-gray mt-2">${solucao.description.substring(0, 80)}...</p><span class="text-primary font-semibold mt-4 inline-block">Saber mais</span>`;
        card.addEventListener('click', () => {
            modalTitle.textContent = solucao.title;
            modalDescription.textContent = solucao.description;
            modalBenefit.innerHTML = `<span class="font-bold text-gray-700">Benefício:</span> ${solucao.benefit}`;
            modal.classList.remove('hidden');
        });
        //solucoesContainer.appendChild(card);
    });

    // Lógica para fechar o modal de soluções
    const closeModal = () => modal.classList.add('hidden');
    modalCloseBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if(e.target === modal) closeModal();
    });

    // --- Dados e Lógica para a Seção 'Equipe' ---
    const equipe = [
        { nome: "Ana Beatriz", cargo: "Presidente", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=AB' },
        { nome: "Roberta Mota", cargo: "Vice-Presidente", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=RM' },
        { nome: "Rafael Alves", cargo: "Diretor de ADM/FIN", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=RA' },
        { nome: "Wherlistôny Feitosa", cargo: "Diretor de Gestão de Pessoas", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=WF' },
        { nome: "João Victor", cargo: "Diretor de Vendas e Projetos", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=JV' },
        { nome: "Mariana Nepomuceno", cargo: "Diretora de Marketing", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=MN' },
        { nome: "Brenda Oliveira", cargo: "Trainee de ADM/FIN", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=BO' },
        { nome: "Amanda Rodrigues", cargo: "Trainee de ADM/FIN", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=AR' },
        { nome: "Patrícia Pessoa", cargo: "Trainee de Gestão de Pessoas", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=PP' },
        { nome: "Elizandra Sena", cargo: "Trainee de Gestão de Pessoas", img: 'https://placehold.co/150x150/FF7F00/FFFFFF?text=ES' },
    ];
    
    // Popula a seção da equipe
    const equipeContainer = document.getElementById('equipe-container');
    equipe.forEach(membro => {
        const div = document.createElement('div');
        div.className = 'text-center card p-4';
        div.innerHTML = `
            <img src="${membro.img}" alt="${membro.nome}" class="w-24 h-24 rounded-full mx-auto mb-4 object-cover">
            <h4 class="font-bold">${membro.nome}</h4>
            <p class="text-sm text-primary">${membro.cargo}</p>
        `;
        equipeContainer.appendChild(div);
    });
    
    // Atualiza o ano no rodapé
    document.getElementById('current-year').textContent = new Date().getFullYear();

    // --- Lógica dos Gráficos (Chart.js) na Seção 'Desempenho' ---
    const faturamentoCtx = document.getElementById('faturamentoChart').getContext('2d');
    new Chart(faturamentoCtx, {
        type: 'bar',
        data: {
            labels: ['2023', '2024'],
            datasets: [{
                label: 'Faturamento (R$)',
                data: [9200, 12300],
                backgroundColor: ['rgba(255, 127, 0, 0.6)', 'rgba(255, 127, 0, 0.8)'],
                borderColor: ['rgb(255, 127, 0)', 'rgb(255, 127, 0)'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        callback: function(value) {
                            return 'R$ ' + value / 1000 + 'k';
                        }
                    }
                }
            },
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed.y !== null) {
                                label += new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(context.parsed.y);
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });

    const indicadoresCtx = document.getElementById('indicadoresChart').getContext('2d');
    new Chart(indicadoresCtx, {
        type: 'radar',
        data: {
            labels: ['Alto Crescimento', 'Colaborativa', 'Inovadora', 'NPS', 'Membros Minorizados'],
            datasets: [{
                label: 'Desempenho 2024 (%)',
                data: [100, 100, 100, 100, 100], // Dados de exemplo, você pode ajustar
                fill: true,
                backgroundColor: 'rgba(255, 127, 0, 0.2)',
                borderColor: 'rgb(255, 127, 0)',
                pointBackgroundColor: 'rgb(255, 127, 0)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgb(255, 127, 0)'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                r: {
                    angleLines: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    pointLabels: {
                        font: {
                            size: 12
                        }
                    },
                    ticks: {
                        backdropColor: 'transparent',
                        stepSize: 25,
                        callback: function(value) {
                            return value + '%';
                        }
                    },
                    min: 0,
                    max: 100
                }
            },
            plugins: {
                legend: { position: 'top' }
            }
        }
    });

    // MODAL SISTEMA (Mensagens)
    function exibirMensagemModal(texto, tag) {
        const modal = document.getElementById('modal-mensagem');
        const titulo = document.getElementById('modal-mensagem-titulo');
        
        if(tag === 'success') {
            titulo.innerHTML = 'Sucesso!';
            titulo.className = 'text-2xl font-bold mb-4 text-green-600';
        } else {
            titulo.innerHTML = 'Ops!';
            titulo.className = 'text-2xl font-bold mb-4 text-red-600';
        }
        
        document.getElementById('modal-mensagem-texto').innerHTML = texto;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function fecharModalMensagem() {
        document.getElementById('modal-mensagem').classList.add('hidden');
        document.getElementById('modal-mensagem').classList.remove('flex');
    }

    // MODAL SOLUÇÕES
    function abrirModalSolucao(id) {
        document.getElementById('modal-titulo-dinamico').innerHTML = document.getElementById(id + '-titulo').innerHTML;
        document.getElementById('modal-texto-dinamico').innerHTML = document.getElementById(id + '-texto').innerHTML;
        
        const modal = document.getElementById('modal-solucoes');
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }

    function fecharModalSolucao() {
        document.getElementById('modal-solucoes').classList.add('hidden');
        document.getElementById('modal-solucoes').classList.remove('flex');
    }

// --- LÓGICA DO MODAL DE PRIVACIDADE (LGPD) ---
function abrirModalPrivacidade() {
    const modal = document.getElementById('modal-privacidade');
    if (modal) {
        modal.classList.remove('hidden');
        modal.classList.add('flex');
    }
}

function fecharModalPrivacidade() {
    const modal = document.getElementById('modal-privacidade');
    if (modal) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
    }
}

// Fechar modal de privacidade clicando fora dele
document.addEventListener('DOMContentLoaded', function() {
    const modalPriv = document.getElementById('modal-privacidade');
    if (modalPriv) {
        modalPriv.addEventListener('click', function(event) {
            if (event.target === this) {
                fecharModalPrivacidade();
            }
        });
    }
});


// --- LÓGICA DE CONSENTIMENTO E RASTREAMENTO (LGPD) ---
    document.addEventListener('DOMContentLoaded', function() {
        const banner = document.getElementById('cookie-consent-banner');
        const btnAccept = document.getElementById('accept-cookies-btn');
        const btnReject = document.getElementById('reject-cookies-btn');

        if (!banner || !btnAccept || !btnReject) return; // Segurança caso o HTML não esteja pronto

        // 1. Verifica as preferências salvas no navegador
        const consentimento = localStorage.getItem('ejcon_cookie_consent');

        if (!consentimento) {
            // Se NUNCA respondeu, mostra a barra lá em baixo
            banner.classList.remove('hidden');
        } else {
            // Se JÁ respondeu, a barra continua 'hidden'
            
            // Se a resposta anterior foi "aceito", liga o cronômetro para enviar os dados
            if (consentimento === 'aceito') {
                iniciarRastreamento();
            }
        }

        // 2. Ação: Botão "Aceitar Todos"
        btnAccept.addEventListener('click', function() {
            localStorage.setItem('ejcon_cookie_consent', 'aceito');
            banner.classList.add('hidden'); // Esconde a barra com classe do Tailwind
            iniciarRastreamento(); // Começa a contar o tempo imediatamente
        });

        // 3. Ação: Botão "Recusar"
        btnReject.addEventListener('click', function() {
            localStorage.setItem('ejcon_cookie_consent', 'recusado');
            banner.classList.add('hidden'); // Apenas esconde a barra, não rastreia nada.
        });
    });

    // O Motor de Análise
    let tempoInicio = 0;

    function iniciarRastreamento() {
        tempoInicio = Date.now();

        window.addEventListener('beforeunload', function() {
            const tempoFim = Date.now();
            const tempoPermanenciaSegundos = Math.floor((tempoFim - tempoInicio) / 1000);

            if (tempoPermanenciaSegundos > 0) {
                const url = '/api/rastrear/';
                const dados = {
                    pagina: window.location.pathname,
                    tempo: tempoPermanenciaSegundos
                };

                const blob = new Blob([JSON.stringify(dados)], { type: 'application/json' });
                navigator.sendBeacon(url, blob);
            }
        });
    }
});