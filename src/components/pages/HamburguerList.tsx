"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import type { ProdutoDestaque, GrupoOpcoesPersonalizacao, Opcao } from "@/types/cardapio";

interface HamburguerListProps {
  produtos: ProdutoDestaque[];
}

export const HamburguerList: React.FC<HamburguerListProps> = ({ produtos }) => {
  const [selected, setSelected] = useState<ProdutoDestaque | null>(null);
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 py-8">
      {produtos.map((produto) => (
        <Card
          key={produto.nome}
          className="hover:scale-105 transition cursor-pointer"
          onClick={() => setSelected(produto)}
        >
          <CardContent className="flex flex-col items-center p-4">
            <Image
              src={produto.imagem}
              alt={produto.nome}
              width={220}
              height={160}
              className="rounded-lg object-cover mb-2"
            />
            <h3 className="font-bold text-lg text-center">{produto.nome}</h3>
            <p className="text-sm text-muted-foreground text-center mb-2">{produto.descricao}</p>
            <div className="font-semibold text-primary text-lg">
              {produto.preco_promocional ? (
                <>
                  <span className="line-through text-gray-400 mr-2">R$ {produto.preco_original?.toFixed(2)}</span>
                  <span>R$ {produto.preco_promocional.toFixed(2)}</span>
                </>
              ) : (
                <span>R$ {produto.preco?.toFixed(2)}</span>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
      <HamburguerModal produto={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

interface HamburguerModalProps {
  produto: ProdutoDestaque | null;
  onClose: () => void;
}

const HamburguerModal: React.FC<HamburguerModalProps> = ({ produto, onClose }) => {
  const [personalizacao, setPersonalizacao] = useState<Record<string, any>>({});
  if (!produto) return null;

  const handleChange = (grupo: GrupoOpcoesPersonalizacao, opcao: Opcao, checked: boolean) => {
    setPersonalizacao((prev) => {
      if (grupo.tipo === "unica_opcao") {
        return { ...prev, [grupo.titulo]: opcao.nome };
      } else {
        const atual = prev[grupo.titulo] || [];
        if (checked) {
          return { ...prev, [grupo.titulo]: [...atual, opcao.nome] };
        } else {
          return { ...prev, [grupo.titulo]: atual.filter((n: string) => n !== opcao.nome) };
        }
      }
    });
  };

  return (
    <Dialog open={!!produto} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>{produto.nome}</DialogTitle>
          <DialogDescription>{produto.descricao}</DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4">
          <Image src={produto.imagem} alt={produto.nome} width={320} height={220} className="rounded-lg object-cover" />
          <div className="font-semibold text-primary text-lg">
            {produto.preco_promocional ? (
              <>
                <span className="line-through text-gray-400 mr-2">R$ {produto.preco_original?.toFixed(2)}</span>
                <span>R$ {produto.preco_promocional.toFixed(2)}</span>
              </>
            ) : (
              <span>R$ {produto.preco?.toFixed(2)}</span>
            )}
          </div>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {produto.opcoes_personalizacao.map((grupo) => (
            <div key={grupo.titulo}>
              <div className="font-medium mb-1">
                {grupo.titulo}
                {grupo.obrigatorio && <span className="text-red-500">*</span>}
              </div>
              <div className="flex flex-wrap gap-2">
                {grupo.opcoes.map((opcao) => (
                  <label key={opcao.nome} className="flex items-center gap-2 cursor-pointer">
                    {grupo.tipo === "unica_opcao" ? (
                      <input
                        type="radio"
                        name={grupo.titulo}
                        value={opcao.nome}
                        checked={personalizacao[grupo.titulo] === opcao.nome}
                        onChange={() => handleChange(grupo, opcao, true)}
                      />
                    ) : (
                      <input
                        type="checkbox"
                        name={grupo.titulo}
                        value={opcao.nome}
                        checked={personalizacao[grupo.titulo]?.includes(opcao.nome)}
                        onChange={(e) => handleChange(grupo, opcao, e.target.checked)}
                      />
                    )}
                    <span>{opcao.nome}</span>
                    {opcao.preco_adicional && (
                      <span className="text-xs text-muted-foreground">(+R$ {opcao.preco_adicional.toFixed(2)})</span>
                    )}
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button onClick={onClose}>Fechar</Button>
          <Button variant="default">Adicionar ao pedido</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
