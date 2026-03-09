class ValidationService {
  constructor() {
    this.errors = [];
  }
  static validateSolicitacao(dados) {
    const errors = [];
    if (!dados.endereco) {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Endereço'));
    } else {
      if (!dados.endereco.logradouro) errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Logradouro'));
      if (!dados.endereco.numero) errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Número'));
      if (!dados.endereco.bairro) errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Bairro'));
      if (!dados.endereco.cidade) errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Cidade'));
      if (!dados.endereco.estado) errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Estado'));
      if (!dados.endereco.cep) errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('CEP'));
      else if (!this.validateCEP(dados.endereco.cep)) errors.push(VALIDATION_ERRORS.INVALID_CEP);
    }
    if (!dados.itens || dados.itens.length === 0) {
      errors.push('Selecione pelo menos um item para coleta');
    }
    if (!dados.descricao) {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Descrição'));
    } else if (dados.descricao.length < CONFIG.MIN_DESCRIPTION_LENGTH) {
      errors.push(VALIDATION_ERRORS.MIN_LENGTH('Descrição', CONFIG.MIN_DESCRIPTION_LENGTH));
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }
  static validateDenuncia(dados) {
    const errors = [];
    if (!dados.localizacao || !dados.localizacao.descricao) {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Localização'));
    }
    if (!dados.descricao) {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Descrição'));
    } else if (dados.descricao.length < CONFIG.MIN_DENUNCIA_DESCRIPTION_LENGTH) {
      errors.push(VALIDATION_ERRORS.MIN_LENGTH('Descrição', CONFIG.MIN_DENUNCIA_DESCRIPTION_LENGTH));
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }
  static validateCEP(cep) {
    const cleanCEP = cep.replace(/\D/g, '');
    return cleanCEP.length === 8;
  }
  static validateImage(file) {
    if (!file) {
      return { valid: false, error: VALIDATION_ERRORS.NO_FILE_SELECTED };
    }
    if (!CONFIG.ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return { valid: false, error: VALIDATION_ERRORS.INVALID_IMAGE_TYPE };
    }
    if (file.size > CONFIG.MAX_IMAGE_SIZE) {
      return { valid: false, error: VALIDATION_ERRORS.MAX_SIZE(5) };
    }
    return { valid: true };
  }
  static validateRequired(valor, campo) {
    if (!valor || (typeof valor === 'string' && valor.trim() === '')) {
      return { valid: false, error: VALIDATION_ERRORS.REQUIRED_FIELD(campo) };
    }
    return { valid: true };
  }
  static validateEndereco(endereco) {
    const errors = [];
    if (!endereco) {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Endereço'));
      return { valid: false, errors };
    }
    if (!endereco.logradouro || endereco.logradouro.trim() === '') {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Logradouro'));
    }
    if (!endereco.numero || endereco.numero.trim() === '') {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Número'));
    }
    if (!endereco.bairro || endereco.bairro.trim() === '') {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Bairro'));
    }
    if (!endereco.cidade || endereco.cidade.trim() === '') {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Cidade'));
    }
    if (!endereco.estado || endereco.estado.trim() === '') {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('Estado'));
    }
    if (!endereco.cep || endereco.cep.trim() === '') {
      errors.push(VALIDATION_ERRORS.REQUIRED_FIELD('CEP'));
    } else if (!this.validateCEP(endereco.cep)) {
      errors.push(VALIDATION_ERRORS.INVALID_CEP);
    }
    return {
      valid: errors.length === 0,
      errors
    };
  }
  getErrors() {
    return this.errors;
  }
  clearErrors() {
    this.errors = [];
  }
  addError(error) {
    this.errors.push(error);
  }
}
