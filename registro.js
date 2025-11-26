const STORAGE_KEY = 'registrosImportunador';

// Funções utilitárias
function getRegistros() {
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        return raw ? JSON.parse(raw) : [];
    } catch (err) { console.error(err); return []; }
}

function setRegistros(arr) {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(arr)); }
    catch (err) { console.error(err); }
}

function showMensagem(text, tempo = 3000) {
    const el = document.getElementById('mensagem');
    el.textContent = text;
    setTimeout(() => { el.textContent = ''; }, tempo);
}

function carregarUltimoRegistro() {
    const registros = getRegistros();
    if (!registros.length) return;
    const ultimo = registros[registros.length - 1];
    const campos = ['altura','pele','cabelo','caracteristicas','roupa_superior','roupa_inferior','tipo_veiculo','placa','cor_veiculo'];
    campos.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.value = ultimo[id] || '';
    });
    showMensagem('Último registro carregado: ' + new Date(ultimo.dataHora).toLocaleString(), 3500);
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('registroForm');
    carregarUltimoRegistro();

    form.addEventListener('submit', (event) => {
        event.preventDefault();

        const novo = {
            id: 'r_' + Date.now(),
            dataHora: new Date().toISOString(),
            altura: document.getElementById('altura').value.trim(),
            pele: document.getElementById('pele').value,
            cabelo: document.getElementById('cabelo').value.trim(),
            caracteristicas: document.getElementById('caracteristicas').value.trim(),
            roupa_superior: document.getElementById('roupa_superior').value.trim(),
            roupa_inferior: document.getElementById('roupa_inferior').value.trim(),
            tipo_veiculo: document.getElementById('tipo_veiculo').value.trim(),
            placa: document.getElementById('placa').value.trim(),
            cor_veiculo: document.getElementById('cor_veiculo').value.trim()
        };

        const registros = getRegistros();
        registros.push(novo);
        setRegistros(registros);

        showMensagem('✅ Informações salvas com sucesso!');
        form.reset();
    });
});
