class StorageService {
  static isAvailable() {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      return false;
    }
  }
  static get(key) {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      return null;
    }
  }
  static set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      localStorage.setItem(key, serialized);
      return { success: true };
    } catch (e) {
      if (e.name === 'QuotaExceededError') {
        return { 
          success: false, 
          error: 'Espaço de armazenamento esgotado. Limpe dados antigos.' 
        };
      }
      return { 
        success: false, 
        error: 'Erro ao salvar dados. Verifique as configurações do navegador.' 
      };
    }
  }
  static remove(key) {
    try {
      localStorage.removeItem(key);
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Erro ao remover dados.' };
    }
  }
  static clear() {
    try {
      localStorage.clear();
      return { success: true };
    } catch (e) {
      return { success: false, error: 'Erro ao limpar dados.' };
    }
  }
  static exists(key) {
    return localStorage.getItem(key) !== null;
  }
}
