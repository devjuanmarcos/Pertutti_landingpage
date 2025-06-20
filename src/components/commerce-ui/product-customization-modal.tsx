"use client";

import React from "react";
import {
  ResponsiveModal,
  ResponsiveModalContent,
  ResponsiveModalHeader,
  ResponsiveModalTitle,
  ResponsiveModalFooter,
  ResponsiveModalDescription,
} from "@/components/ui/responsive-modal";
import { Button } from "@/components/ui/button";
import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { ProdutoDestaque, GrupoOpcoesPersonalizacao } from "@/types/cardapio";
import { useCart } from "@/components/context/cart-context";
import VariantSelectorMultiple, { VariantItem } from "@/components/commerce-ui/variant-selector-multiple";

interface ProductCustomizationModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  produto: ProdutoDestaque;
  onSubmit: (item: any) => void;
}

function buildZodSchema(grupos: GrupoOpcoesPersonalizacao[]) {
  const shape: Record<string, any> = {};
  grupos.forEach((grupo, idx) => {
    const key = `grupo_${idx}`;
    const hasOpcoes = Array.isArray(grupo.opcoes) && grupo.opcoes.length > 0;
    if (grupo.tipo === "unica_opcao") {
      shape[key] = grupo.obrigatorio && hasOpcoes
        ? z.string({ required_error: "Selecione uma opção" })
        : z.string().optional();
    } else {
      let arr = z.array(z.string());
      if (grupo.max_opcoes) arr = arr.max(grupo.max_opcoes, `Máximo de ${grupo.max_opcoes}`);
      if (grupo.obrigatorio && hasOpcoes) arr = arr.min(1, "Selecione pelo menos uma opção");
      shape[key] = arr.optional();
    }
  });
  return z.object(shape);
}

export const ProductCustomizationModal: React.FC<ProductCustomizationModalProps> = ({
  open,
  onOpenChange,
  produto,
  onSubmit,
}) => {
  const grupos = produto.opcoes_personalizacao || [];
  const schema = React.useMemo(() => buildZodSchema(grupos), [grupos]);
  const { addItem } = useCart();
  const [precoFinal, setPrecoFinal] = React.useState(produto.preco_promocional || produto.preco || 0);

  // Tipagem flexível para campos dinâmicos
  const form = useForm<Record<string, any>>({
    resolver: zodResolver(schema),
    defaultValues: {},
  });

  React.useEffect(() => {
    if (!open) form.reset();
  }, [open, form.reset]);

  // Atualiza o preço final conforme as opções selecionadas
  React.useEffect(() => {
    const subscription = form.watch((allValues) => {
      let total = produto.preco_promocional || produto.preco || 0;
      grupos.forEach((grupo, idx) => {
        const key = `grupo_${idx}`;
        const value = allValues[key];
        if (grupo.tipo === "unica_opcao" && typeof value === "string") {
          const opc = grupo.opcoes.find((o) => o.nome === value);
          if (opc?.preco_adicional) total += opc.preco_adicional;
        } else if (grupo.tipo === "multipla_opcao" && Array.isArray(value)) {
          value.forEach((v: string) => {
            const opc = grupo.opcoes.find((o) => o.nome === v);
            if (opc?.preco_adicional) total += opc.preco_adicional;
          });
        }
      });
      setPrecoFinal(total);
    });
    return () => subscription.unsubscribe();
  }, [form, grupos, produto]);

  const handleFormSubmit = (data: any) => {
    const opcoesSelecionadas = grupos.map((grupo, idx) => ({
      grupo: grupo.titulo,
      tipo: grupo.tipo,
      opcoes: data[`grupo_${idx}`],
    }));
    addItem({
      produto,
      opcoesSelecionadas: data,
      quantidade: 1,
      precoFinal,
    });
    onSubmit && onSubmit({ ...produto, opcoesSelecionadas });
    onOpenChange(false);
  };

  return (
    <ResponsiveModal open={open} onOpenChange={onOpenChange}>
      <ResponsiveModalContent side="bottom" className="max-w-lg w-full">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleFormSubmit)} className="flex flex-col gap-4">
            <ResponsiveModalHeader>
              <ResponsiveModalTitle>{produto.nome}</ResponsiveModalTitle>
              <ResponsiveModalDescription>{produto.descricao}</ResponsiveModalDescription>
            </ResponsiveModalHeader>
            <div className="flex flex-col gap-4 py-4">
              <ImageViewer imageUrl={produto.imagem} col={false} />
              {grupos.map((grupo, idx) => (
                <FormField
                  key={grupo.titulo}
                  control={form.control}
                  name={`grupo_${idx}`}
                  render={({ field }) => (
                    <FormItem className="flex flex-col gap-2">
                      <FormLabel>
                        {grupo.titulo} {grupo.obrigatorio && <span className="text-destructive">*</span>}
                      </FormLabel>
                      <FormDescription>
                        {grupo.tipo === "unica_opcao"
                          ? "Escolha uma opção."
                          : `Escolha até ${grupo.max_opcoes || "todas"} opções.`}
                      </FormDescription>
                      {grupo.tipo === "unica_opcao" ? (
                        <VariantSelectorMultiple
                          type="single"
                          value={field.value || ""}
                          onValueChange={field.onChange}
                          variants={grupo.opcoes.map((opcao) => ({
                            id: opcao.nome,
                            value: opcao.nome,
                            label:
                              opcao.nome + (opcao.preco_adicional ? ` (+R$ ${opcao.preco_adicional.toFixed(2)})` : ""),
                          }))}
                          className="w-full"
                          itemClassName="min-w-[120px]"
                        />
                      ) : (
                        <VariantSelectorMultiple
                          type="multiple"
                          values={Array.isArray(field.value) ? field.value : []}
                          onValuesChange={field.onChange}
                          variants={grupo.opcoes.map((opcao) => ({
                            id: opcao.nome,
                            value: opcao.nome,
                            label:
                              opcao.nome + (opcao.preco_adicional ? ` (+R$ ${opcao.preco_adicional.toFixed(2)})` : ""),
                          }))}
                          className="w-full"
                          itemClassName="min-w-[120px]"
                        />
                      )}
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <ResponsiveModalFooter>
              <Button type="submit" className="w-full">
                Adicionar ao carrinho - R$ {precoFinal.toFixed(2)}
              </Button>
            </ResponsiveModalFooter>
          </form>
        </Form>
      </ResponsiveModalContent>
    </ResponsiveModal>
  );
};
