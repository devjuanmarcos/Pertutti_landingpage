"use client";

import React from "react";
import { useCart } from "@/components/context/cart-context";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerFooter } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";

export const CartDrawerButton: React.FC = () => {
  const [open, setOpen] = React.useState(false);
  const { items, clearCart } = useCart();
  const total = items.reduce((acc, item) => acc + item.precoFinal * item.quantidade, 0);

  console.log("Cart items:", items);

  return (
    <>
      <div className="fixed bottom-4 left-0 right-0 z-50 flex justify-center pointer-events-none">
        <Button className="w-[90vw] max-w-md shadow-lg pointer-events-auto" size="lg" onClick={() => setOpen(true)}>
          Ver Carrinho ({items.length}) - R$ {total.toFixed(2)}
        </Button>
      </div>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent className="max-w-lg mx-auto w-full">
          <DrawerHeader>
            <DrawerTitle>Seu Carrinho</DrawerTitle>
          </DrawerHeader>
          <ScrollArea className="h-[72vh] md:h-[60vh] px-2">
            {items.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">Seu carrinho está vazio.</div>
            ) : (
              <div className="flex flex-col gap-4">
                {items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 border-b pb-3 last:border-b-0">
                    <img src={item.produto.imagem} alt={item.produto.nome} className="w-16 h-16 rounded object-cover" />
                    <div className="flex-1">
                      <div className="font-bold text-base">{item.produto.nome}</div>
                      <div className="text-sm text-muted-foreground">{item.produto.descricao}</div>
                      <div className="text-xs mt-1">
                        {Object.entries(item.opcoesSelecionadas).map(([grupo, opcoes]) => (
                          <div key={grupo}>
                            <span className="font-medium">{grupo.replace("grupo_", "")}:</span>{" "}
                            {Array.isArray(opcoes)
                              ? opcoes.map((op) => (typeof op === "string" ? op : op?.nome)).join(", ")
                              : typeof opcoes === "string"
                                ? opcoes
                                : opcoes && typeof opcoes === "object" && "nome" in opcoes
                                  ? opcoes.nome
                                  : ""}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex flex-col items-end justify-between">
                      <span className="font-bold text-primary">R$ {item.precoFinal.toFixed(2)}</span>
                      <span className="text-xs">Qtd: {item.quantidade}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <DrawerFooter>
            <Button
              className="w-full"
              size="lg"
              disabled={items.length === 0}
              onClick={() => alert("Compra finalizada! (mock)")}
            >
              Finalizar compra
            </Button>
            <Button variant="destructive" className="w-full" onClick={clearCart} disabled={items.length === 0}>
              Limpar carrinho
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};
