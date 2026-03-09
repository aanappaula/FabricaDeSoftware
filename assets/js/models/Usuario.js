class Usuario {
  constructor(id, nome, email, foto) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.foto = foto;
  }
  toJSON() {
    return {
      id: this.id,
      nome: this.nome,
      email: this.email,
      foto: this.foto
    };
  }
  static fromJSON(obj) {
    return new Usuario(obj.id, obj.nome, obj.email, obj.foto);
  }
  validate() {
    const errors = [];
    if (!this.id) errors.push('ID é obrigatório');
    if (!this.nome) errors.push('Nome é obrigatório');
    if (!this.email) errors.push('Email é obrigatório');
    return {
      valid: errors.length === 0,
      errors
    };
  }
}
