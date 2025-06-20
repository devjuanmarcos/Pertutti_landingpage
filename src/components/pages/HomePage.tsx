"use client";

import { ImageTextBanner } from "@/app/[locale]/(root)/_components/image-text-banner";
import { MainBanner } from "@/app/[locale]/(root)/_components/main-banner";
import { SystemFeaturesBanner } from "@/app/[locale]/(root)/_components/system-features-banner";
import { Separator } from "@ui/separator";
import ProductCard_02 from "@/components/commerce-ui/product-card-02";
import destaquesJson from "@/data/destaques.json";
import maisVendidosJson from "@/data/mais_vendidos.json";
import type { CardapioDestaques, CardapioMaisVendidos } from "@/types/cardapio";
import { useState } from "react";
import { ProductCustomizationModal } from "@/components/commerce-ui/product-customization-modal";
import type { ProdutoDestaque } from "@/types/cardapio";

export const HomePage = () => {
  const cardapio: CardapioDestaques = destaquesJson as CardapioDestaques;
  const mais_vendidos: CardapioMaisVendidos = maisVendidosJson as CardapioMaisVendidos;
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoSelecionado, setProdutoSelecionado] = useState<ProdutoDestaque | null>(null);

  const handleOpenModal = (produto: ProdutoDestaque) => {
    setProdutoSelecionado(produto);
    setModalOpen(true);
  };

  return (
    <div className="flex flex-col gap-[4rem] min-h-screen">
      <MainBanner />
      <div className="flex flex-col gap-[4rem] max-w-[76.8125rem] w-full mx-auto max-xl:max-w-[90vw]">
        <Separator className="bg-primary" />
        <section className="flex flex-col gap-6 items-center justify-center w-full relative">
          <div className="flex flex-col w-full justify-center items-center max-w-[60.25rem] text-center">
            <span className="body-title ">Cardápio variado</span>
            <span className="heading-03-bold ">Nossos destaques</span>
            <span className="body-title-light ">
              Da suculência do X Bacon ao sabor único do Catupi King, escolha entre hambúrgueres clássicos, especiais,
              combos e acompanhamentos para todos os gostos!
            </span>
          </div>
          <div className="grid grid-cols-1 gap-8">
            {cardapio.destaques.map((produto) => (
              <ProductCard_02
                key={produto.nome}
                imageUrl={produto.imagem}
                title={produto.nome}
                description={produto.descricao}
                price={produto.preco_promocional || produto.preco || 0}
                prefix="R$ "
                discount={
                  produto.preco_promocional
                    ? `${Math.round(
                        100 - (produto.preco_promocional / (produto.preco_original || produto.preco || 1)) * 100
                      )}% OFF`
                    : undefined
                }
                destaque={true}
                stockCount={10}
                hasShipping={false}
                shippingText=""
                rating={5}
                reviewCount={0}
                onAddToCart={() => handleOpenModal(produto)}
                onBuyNow={() => handleOpenModal(produto)}
              />
            ))}
          </div>
        </section>
        <Separator className="bg-primary" />
        <SystemFeaturesBanner />
        <Separator className="bg-primary" />
        <section className="flex flex-col gap-6 items-center justify-center w-full relative">
          <div className="flex flex-col w-full justify-center items-center max-w-[60.25rem] text-center">
            <span className="body-title ">Preferidos</span>
            <span className="heading-03-bold ">Nossos hambúrgueres mais vendidos</span>
            <span className="body-title-light ">
              Da suculência do X Bacon ao sabor único do Catupi King, escolha entre hambúrgueres clássicos, especiais,
              combos e acompanhamentos para todos os gostos!
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {mais_vendidos.mais_vendidos.map((produto) => (
              <ProductCard_02
                key={produto.nome}
                imageUrl={produto.imagem}
                title={produto.nome}
                description={produto.descricao}
                price={produto.preco_promocional || produto.preco || 0}
                prefix="R$ "
                discount={
                  produto.preco_promocional
                    ? `${Math.round(
                        100 - (produto.preco_promocional / (produto.preco_original || produto.preco || 1)) * 100
                      )}% OFF`
                    : undefined
                }
                destaque={true}
                stockCount={10}
                hasShipping={false}
                shippingText=""
                rating={5}
                reviewCount={0}
                onAddToCart={() => handleOpenModal(produto)}
                onBuyNow={() => handleOpenModal(produto)}
                col={true}
              />
            ))}
          </div>
        </section>
      </div>
      <Separator className="bg-primary" />
      <ImageTextBanner />
      <Separator className="bg-primary" />
      {produtoSelecionado && (
        <ProductCustomizationModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          produto={produtoSelecionado}
          onSubmit={(products) => {
            console.log("Produtos personalizados:", products);
            setModalOpen(false);
          }}
        />
      )}
    </div>
  );
};
