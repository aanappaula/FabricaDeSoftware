const STORAGE_KEYS = {
  PONTOS: 'reciclainfo_pontos',
  SOLICITACOES: 'reciclainfo_solicitacoes',
  DENUNCIAS: 'reciclainfo_denuncias',
  FAVORITOS: 'reciclainfo_favoritos',
  USUARIO: 'reciclainfo_usuario'
};
const CONFIG = {
  ENV: 'development',
  APP_NAME: 'ReciclaInfo',
  VERSION: '1.0.0',
  MAX_SOLICITACOES_PER_MONTH: 2,
  MAX_IMAGE_SIZE: 5 * 1024 * 1024,
  MAX_IMAGE_WIDTH: 1200,
  ALLOWED_IMAGE_TYPES: ['image/jpeg', 'image/png', 'image/jpg'],
  IMAGE_COMPRESSION_QUALITY: 0.8,
  DEFAULT_MAP_CENTER: [-23.550520, -46.633308],
  DEFAULT_MAP_ZOOM: 12,
  MIN_DESCRIPTION_LENGTH: 10,
  MIN_DENUNCIA_DESCRIPTION_LENGTH: 20,
  TIPOS_RESIDUOS: [
    { id: 'moveis', label: 'Móveis', icon: 'moveis.png' },
    { id: 'eletrodomesticos', label: 'Eletrodomésticos', icon: 'eletro.png' },
    { id: 'entulhos', label: 'Entulhos', icon: 'entulho.png' },
    { id: 'oleo', label: 'Óleo de Cozinha', icon: 'oleo.png' },
    { id: 'pilhas', label: 'Pilhas e Baterias', icon: 'pilhas.png' },
    { id: 'eletronicos', label: 'Eletrônicos', icon: 'eletronicos.png' }
  ]
};
const STATUS_SOLICITACAO = {
  PENDENTE: 'pendente',
  AGENDADA: 'agendada',
  COLETADA: 'coletada',
  CANCELADA: 'cancelada'
};
const VALIDATION_ERRORS = {
  REQUIRED_FIELD: (field) => `O campo ${field} é obrigatório`,
  INVALID_EMAIL: 'Email inválido',
  INVALID_CEP: 'CEP deve conter 8 dígitos',
  MIN_LENGTH: (field, min) => `${field} deve ter no mínimo ${min} caracteres`,
  MAX_SIZE: (max) => `Arquivo muito grande. Máximo ${max}MB`,
  INVALID_FORMAT: (field) => `Formato inválido para ${field}`,
  LIMIT_REACHED: (limit) => `Limite de ${limit} solicitações por mês atingido`,
  INVALID_IMAGE_TYPE: 'Formato não suportado. Use JPG ou PNG.',
  NO_FILE_SELECTED: 'Nenhum arquivo selecionado'
};
