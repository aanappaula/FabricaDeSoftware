class Ponto {
  constructor(id, nome, endereco, coordenadas, tipos, horario, telefone) {
    this.id = id;
    this.nome = nome;
    this.endereco = endereco;
    this.coordenadas = coordenadas;
    this.tipos = tipos;
    this.horario = horario;
    this.telefone = telefone;
  }
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      endereco: this.endereco,
      coordenadas: this.coordenadas,
      tipos: this.tipos,
      horario: this.horario,
      telefone: this.telefone
    };
  }
  static fromJSON(obj) {
    return new Ponto(
      obj.id,
      obj.nome,
      obj.endereco,
      obj.coordenadas,
      obj.tipos,
      obj.horario,
      obj.telefone
    );
  }
  validate() {
    const errors = [];
    if (!this.id) errors.push('ID é obrigatório');
    if (!this.nome) errors.push('Nome é obrigatório');
    if (!this.endereco) errors.push('Endereço é obrigatório');
    if (!this.coordenadas) errors.push('Coordenadas são obrigatórias');
    if (!this.tipos || this.tipos.length === 0) errors.push('Tipos de resíduos são obrigatórios');
    if (!this.horario) errors.push('Horário é obrigatório');
    return {
      valid: errors.length === 0,
      errors
    };
  }
  matchesFilter(tipos) {
    if (!tipos || tipos.length === 0) return true;
    return tipos.some(tipo => this.tipos.includes(tipo));
  }
}
