function showLoading(message = 'Carregando...') {
  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.querySelector('.loader-message').textContent = message;
    loader.classList.add('show');
  }
}
function hideLoading() {
  const loader = document.getElementById('global-loader');
  if (loader) {
    loader.classList.remove('show');
  }
}
function showSuccessToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
function showErrorToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast toast-error';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 5000);
}
function showInfoToast(message) {
  const toast = document.createElement('div');
  toast.className = 'toast toast-info';
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => toast.classList.add('show'), 100);
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
function initializeData() {
  if (!StorageService.isAvailable()) {
    showErrorToast('LocalStorage não disponível. Algumas funcionalidades podem não funcionar.');
    return;
  }
  if (!StorageService.exists(STORAGE_KEYS.PONTOS)) {
    StorageService.set(STORAGE_KEYS.PONTOS, SEED_PONTOS);
  }
  if (!StorageService.exists(STORAGE_KEYS.USUARIO)) {
    StorageService.set(STORAGE_KEYS.USUARIO, FAKE_USER);
  }
  if (!StorageService.exists(STORAGE_KEYS.SOLICITACOES)) {
    StorageService.set(STORAGE_KEYS.SOLICITACOES, []);
  }
  if (!StorageService.exists(STORAGE_KEYS.DENUNCIAS)) {
    StorageService.set(STORAGE_KEYS.DENUNCIAS, []);
  }
  if (!StorageService.exists(STORAGE_KEYS.FAVORITOS)) {
    const usuario = StorageService.get(STORAGE_KEYS.USUARIO);
    StorageService.set(STORAGE_KEYS.FAVORITOS, { 
      usuarioId: usuario.id, 
      pontos: [] 
    });
  }
}
window.addEventListener('error', (event) => {
  if (CONFIG.ENV !== 'production') {
    showErrorToast(`Erro: ${event.error.message}`);
  } else {
    showErrorToast('Ocorreu um erro inesperado. Tente novamente.');
  }
  event.preventDefault();
});
window.addEventListener('unhandledrejection', (event) => {
  showErrorToast('Erro ao processar operação assíncrona.');
  event.preventDefault();
});
document.addEventListener('DOMContentLoaded', () => {
  try {
    initializeData();
    router = new Router();
    router.init();
  } catch (error) {
    showErrorToast('Erro ao inicializar aplicação. Recarregue a página.');
  }
});
