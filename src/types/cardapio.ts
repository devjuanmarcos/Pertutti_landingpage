export interface Opcao {
  nome: string;
  descricao?: string;
  preco_adicional?: number;
}

export interface GrupoOpcoesPersonalizacao {
  titulo: string;
  tipo: "unica_opcao" | "multipla_opcao";
  max_opcoes?: number;
  obrigatorio: boolean;
  opcoes: Opcao[];
}

export interface ProdutoDestaque {
  nome: string;
  imagem: string;
  descricao: string;
  serve_pessoas: number;
  preco?: number;
  preco_promocional?: number;
  preco_original?: number;
  opcoes_personalizacao: GrupoOpcoesPersonalizacao[];
}

export interface CardapioDestaques {
  destaques: ProdutoDestaque[];
}

export interface CardapioMaisVendidos {
  mais_vendidos: ProdutoDestaque[];
}
