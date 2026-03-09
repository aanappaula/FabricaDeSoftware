class Solicitacao {
  constructor(id, protocolo, usuarioId, endereco, itens, descricao, foto, dataPreferencial, status, dataCriacao) {
    this.id = id;
    this.protocolo = protocolo;
    this.usuarioId = usuarioId;
    this.endereco = endereco;
    this.itens = itens;
    this.descricao = descricao;
    this.foto = foto;
    this.dataPreferencial = dataPreferencial;
    this.status = status;
    this.dataCriacao = dataCriacao;
  }
  toJSON() {
    return {
      id: this.id,
      protocolo: this.protocolo,
      usuarioId: this.usuarioId,
      endereco: this.endereco,
      itens: this.itens,
      descricao: this.descricao,
      foto: this.foto,
      dataPreferencial: this.dataPreferencial,
      status: this.status,
      dataCriacao: this.dataCriacao
    };
  }
  static fromJSON(obj) {
    return new Solicitacao(
      obj.id,
      obj.protocolo,
      obj.usuarioId,
      obj.endereco,
      obj.itens,
      obj.descricao,
      obj.foto,
      obj.dataPreferencial,
      obj.status,
      obj.dataCriacao
    );
  }
  validate() {
    const errors = [];
    const validStatuses = ['pendente', 'agendada', 'coletada', 'cancelada'];
    if (!this.id) errors.push('ID é obrigatório');
    if (!this.protocolo) errors.push('Protocolo é obrigatório');
    if (!this.usuarioId) errors.push('ID do usuário é obrigatório');
    if (!this.endereco) errors.push('Endereço é obrigatório');
    if (!this.itens || this.itens.length === 0) errors.push('Itens são obrigatórios');
    if (!this.descricao) errors.push('Descrição é obrigatória');
    if (!this.dataPreferencial) errors.push('Data preferencial é obrigatória');
    if (!this.status) errors.push('Status é obrigatório');
    if (this.status && !validStatuses.includes(this.status)) {
      errors.push('Status inválido. Valores permitidos: pendente, agendada, coletada, cancelada');
    }
    if (!this.dataCriacao) errors.push('Data de criação é obrigatória');
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
