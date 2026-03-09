const FAKE_USER = {
  id: 'user-001',
  nome: 'João Silva',
  email: 'joao.silva@email.com',
  foto: 'https://ui-avatars.com/api/?name=Joao+Silva&background=2D6A4F&color=fff&size=200'
};
const SEED_PONTOS = [
  {
    id: 'ponto-001',
    nome: 'Ecoponto Centro',
    endereco: {
      logradouro: 'Rua das Flores, 123',
      bairro: 'Centro',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01234-567'
    },
    coordenadas: {
      latitude: -23.550520,
      longitude: -46.633308
    },
    tipos: ['eletronicos', 'pilhas', 'oleo'],
    horario: 'Segunda a Sexta: 8h às 18h',
    telefone: '(11) 1234-5678'
  },
  {
    id: 'ponto-002',
    nome: 'Ecoponto Paulista',
    endereco: {
      logradouro: 'Av. Paulista, 1000',
      bairro: 'Bela Vista',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '01310-100'
    },
    coordenadas: {
      latitude: -23.561414,
      longitude: -46.656178
    },
    tipos: ['moveis', 'eletrodomesticos', 'entulhos'],
    horario: 'Segunda a Sábado: 7h às 19h',
    telefone: '(11) 2345-6789'
  },
  {
    id: 'ponto-003',
    nome: 'Ecoponto Ibirapuera',
    endereco: {
      logradouro: 'Av. Pedro Álvares Cabral, s/n',
      bairro: 'Vila Mariana',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '04094-050'
    },
    coordenadas: {
      latitude: -23.587416,
      longitude: -46.657634
    },
    tipos: ['eletronicos', 'pilhas', 'oleo', 'eletrodomesticos'],
    horario: 'Todos os dias: 6h às 22h',
    telefone: '(11) 3456-7890'
  },
  {
    id: 'ponto-004',
    nome: 'Ecoponto Pinheiros',
    endereco: {
      logradouro: 'Rua dos Pinheiros, 500',
      bairro: 'Pinheiros',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '05422-001'
    },
    coordenadas: {
      latitude: -23.567897,
      longitude: -46.690898
    },
    tipos: ['moveis', 'entulhos', 'eletronicos'],
    horario: 'Segunda a Sexta: 8h às 17h',
    telefone: '(11) 4567-8901'
  },
  {
    id: 'ponto-005',
    nome: 'Ecoponto Vila Madalena',
    endereco: {
      logradouro: 'Rua Harmonia, 200',
      bairro: 'Vila Madalena',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '05435-000'
    },
    coordenadas: {
      latitude: -23.546389,
      longitude: -46.691667
    },
    tipos: ['oleo', 'pilhas', 'eletronicos'],
    horario: 'Segunda a Sábado: 9h às 18h',
    telefone: '(11) 5678-9012'
  },
  {
    id: 'ponto-006',
    nome: 'Ecoponto Mooca',
    endereco: {
      logradouro: 'Rua da Mooca, 1500',
      bairro: 'Mooca',
      cidade: 'São Paulo',
      estado: 'SP',
      cep: '03104-001'
    },
    coordenadas: {
      latitude: -23.549999,
      longitude: -46.599277
    },
    tipos: ['moveis', 'eletrodomesticos', 'entulhos', 'eletronicos'],
    horario: 'Segunda a Sexta: 7h às 19h',
    telefone: '(11) 6789-0123'
  }
];
const SEED_DICAS = [
  {
    id: 'dica-001',
    titulo: 'Separe o Lixo Orgânico',
    descricao: 'Resíduos orgânicos podem ser compostados em casa, reduzindo o volume de lixo e gerando adubo natural para plantas. Cascas de frutas, restos de vegetais e borra de café são ótimos para compostagem.',
    imagem: 'assets/images/tips/organico.jpg'
  },
  {
    id: 'dica-002',
    titulo: 'Móveis e Grandes Volumes',
    descricao: 'Móveis velhos, colchões e outros itens grandes não devem ser deixados na rua. Solicite coleta especial ou leve a um ecoponto. Muitos materiais podem ser reciclados ou reutilizados.',
    imagem: 'assets/images/tips/moveis.jpg'
  },
  {
    id: 'dica-003',
    titulo: 'Descarte Eletrônicos em Locais Apropriados',
    descricao: 'Celulares, computadores e outros eletrônicos contêm metais pesados que podem contaminar o solo. Leve-os a pontos de coleta especializados que fazem o descarte ambientalmente correto.',
    imagem: 'assets/images/tips/eletronicos.jpg'
  },
  {
    id: 'dica-004',
    titulo: 'Óleo de Cozinha Usado',
    descricao: 'Nunca descarte óleo de cozinha na pia! Um litro de óleo contamina até 1 milhão de litros de água. Armazene em garrafas PET e leve a pontos de coleta para reciclagem.',
    imagem: 'assets/images/tips/oleo.jpg'
  },
  {
    id: 'dica-005',
    titulo: 'Pilhas e Baterias',
    descricao: 'Pilhas e baterias contêm substâncias tóxicas como mercúrio e chumbo. Nunca jogue no lixo comum. Procure pontos de coleta em supermercados, farmácias ou ecopontos.',
    imagem: 'assets/images/tips/pilhas.jpg'
  }
];
window.SEED_DICAS = SEED_DICAS;
