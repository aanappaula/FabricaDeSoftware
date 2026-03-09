class DataService {
  static getPontos(filtros = null) {
    const pontos = StorageService.get(STORAGE_KEYS.PONTOS) || [];
    if (!filtros || !filtros.tipos || filtros.tipos.length === 0) {
      return pontos;
    }
    return pontos.filter(ponto => 
      filtros.tipos.some(tipo => ponto.tipos.includes(tipo))
    );
  }
  static getPontoById(id) {
    const pontos = this.getPontos();
    return pontos.find(ponto => ponto.id === id);
  }
  static createSolicitacao(dados) {
    const solicitacoes = StorageService.get(STORAGE_KEYS.SOLICITACOES) || [];
    solicitacoes.push(dados);
    return StorageService.set(STORAGE_KEYS.SOLICITACOES, solicitacoes);
  }
  static getSolicitacoes(usuarioId) {
    const solicitacoes = StorageService.get(STORAGE_KEYS.SOLICITACOES) || [];
    return solicitacoes.filter(sol => sol.usuarioId === usuarioId);
  }
  static getSolicitacaoByProtocolo(protocolo) {
    const solicitacoes = StorageService.get(STORAGE_KEYS.SOLICITACOES) || [];
    return solicitacoes.find(sol => sol.protocolo === protocolo);
  }
  static createDenuncia(dados) {
    const denuncias = StorageService.get(STORAGE_KEYS.DENUNCIAS) || [];
    denuncias.push(dados);
    return StorageService.set(STORAGE_KEYS.DENUNCIAS, denuncias);
  }
  static getDenuncias(usuarioId, incluirAnonimas = false) {
    const denuncias = StorageService.get(STORAGE_KEYS.DENUNCIAS) || [];
    if (incluirAnonimas) {
      return denuncias;
    }
    return denuncias.filter(den => !den.anonima && den.usuarioId === usuarioId);
  }
  static getDenunciaByProtocolo(protocolo) {
    const denuncias = StorageService.get(STORAGE_KEYS.DENUNCIAS) || [];
    return denuncias.find(den => den.protocolo === protocolo);
  }
  static addFavorito(pontoId, usuarioId) {
    let favoritos = StorageService.get(STORAGE_KEYS.FAVORITOS);
    if (!favoritos) {
      favoritos = { usuarioId, pontos: [] };
    }
    if (!favoritos.pontos.includes(pontoId)) {
      favoritos.pontos.push(pontoId);
      return StorageService.set(STORAGE_KEYS.FAVORITOS, favoritos);
    }
    return { success: true };
  }
  static removeFavorito(pontoId, usuarioId) {
    const favoritos = StorageService.get(STORAGE_KEYS.FAVORITOS);
    if (!favoritos) {
      return { success: true };
    }
    favoritos.pontos = favoritos.pontos.filter(id => id !== pontoId);
    return StorageService.set(STORAGE_KEYS.FAVORITOS, favoritos);
  }
  static getFavoritos(usuarioId) {
    const favoritos = StorageService.get(STORAGE_KEYS.FAVORITOS);
    if (!favoritos || favoritos.usuarioId !== usuarioId) {
      return [];
    }
    return favoritos.pontos;
  }
  static isFavorito(pontoId, usuarioId) {
    const favoritos = this.getFavoritos(usuarioId);
    return favoritos.includes(pontoId);
  }
}
