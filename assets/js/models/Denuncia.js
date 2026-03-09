class Denuncia {
  constructor(id, protocolo, usuarioId, anonima, localizacao, descricao, foto, dataCriacao) {
    this.id = id;
    this.protocolo = protocolo;
    this.usuarioId = anonima ? null : usuarioId;
    this.anonima = anonima || false;
    this.localizacao = localizacao;
    this.descricao = descricao;
    this.foto = foto;
    this.dataCriacao = dataCriacao || new Date().toISOString();
  }
  toJSON() {
    return {
      id: this.id,
      protocolo: this.protocolo,
      usuarioId: this.usuarioId,
      anonima: this.anonima,
      localizacao: this.localizacao,
      descricao: this.descricao,
      foto: this.foto,
      dataCriacao: this.dataCriacao
    };
  }
  static fromJSON(obj) {
    return new Denuncia(
      obj.id,
      obj.protocolo,
      obj.usuarioId,
      obj.anonima,
      obj.localizacao,
      obj.descricao,
      obj.foto,
      obj.dataCriacao
    );
  }
  validate() {
    const errors = [];
    if (!this.id) errors.push('ID é obrigatório');
    if (!this.protocolo) errors.push('Protocolo é obrigatório');
    if (!this.localizacao) errors.push('Localização é obrigatória');
    if (!this.descricao) errors.push('Descrição é obrigatória');
    if (!this.foto) errors.push('Foto é obrigatória');
    if (!this.dataCriacao) errors.push('Data de criação é obrigatória');
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
