class ProtocolService {
  static generate(tipo) {
    const prefix = tipo === 'solicitacao' ? 'SOL' : 'DEN';
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = this.generateRandomCode(5);
    return `${prefix}-${dateStr}-${random}`;
  }
  static generateRandomCode(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  static validate(protocolo) {
    const pattern = /^(SOL|DEN)-\d{8}-[A-Z0-9]{5}$/;
    return pattern.test(protocolo);
  }
  static exists(protocolo, type) {
    const key = type === 'solicitacao' ? STORAGE_KEYS.SOLICITACOES : STORAGE_KEYS.DENUNCIAS;
    const items = StorageService.get(key) || [];
    return items.some(item => item.protocolo === protocolo);
  }
}
