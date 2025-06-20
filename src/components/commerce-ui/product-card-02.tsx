"use client";

import ImageViewer from "@/components/commerce-ui/image-viewer-basic";
import PriceFormat from "@/components/commerce-ui/price-format-basic";
import StarRatingFractions from "@/components/commerce-ui/star-rating-fractions";
import { Button } from "@/components/ui/button";

const DEFAULT_IMAGE_URL =
  "https://raw.githubusercontent.com/stackzero-labs/ui/refs/heads/main/public/placeholders/headphone-4.jpg";

interface ProductCard_02Props {
  imageUrl?: string;
  discount?: string | null;
  title?: string;
  rating?: number;
  reviewCount?: number;
  description?: string;
  destaque?: boolean;
  stockCount?: number;
  hasShipping?: boolean;
  shippingText?: string;
  price?: number;
  prefix?: string;
  onAddToCart?: () => void;
  onBuyNow?: () => void;
  col?: boolean;
}

function ProductCard_02({
  description = "Experience next-level audio with the AeroTune X9, the world's most advanced wireless headset designed for audiophiles, gamers, and music lovers alike. With QuantumBass™ technology, every beat, bass drop, and whisper is delivered in studio-quality precision.",
  discount = "20% OFF",
  hasShipping = true,
  imageUrl = DEFAULT_IMAGE_URL,
  destaque = true,
  onAddToCart = () => {},
  onBuyNow = () => {},
  prefix = "$",
  price = 39.59,
  rating = 4.45,
  reviewCount = 362,
  shippingText = "Free Shipping",
  title = "AeroTune X9",
  col = false,
}: ProductCard_02Props = {}) {
  return (
    <div
      className={`bg-card grid w-full ${col ? "grid-cols-2" : "grid-cols-4"} gap-6 rounded-lg border p-4 items-center`}
    >
      <div className="relative col-span-4 w-full md:col-span-2">
        {discount && (
          <div className="absolute top-2 left-2 z-10 w-fit rounded-lg bg-primary/80 p-2">
            <p className="body-caption-bold text-primary-foreground">{discount}</p>
          </div>
        )}
        <ImageViewer imageUrl={imageUrl} col={col} />
      </div>

      <div className="col-span-4 flex flex-col gap-6 md:col-span-2">
        <div className="flex flex-col gap-2">
          <p className="heading-03-bold text-card-foreground">{title}</p>
          <div className="flex flex-row flex-wrap items-center gap-2">
            <StarRatingFractions readOnly value={rating} />
            <p className="body-title text-primary">({rating})</p>
            <p className="body-callout text-muted-foreground">{reviewCount} avaliações</p>
          </div>
          <p className="body-paragraph text-muted-foreground">{description}</p>
        </div>

        <div className="flex flex-col gap-2">
          {destaque ? (
            <div className="flex flex-row items-center gap-2">
              <div className="w-fit rounded-lg border border-primary bg-primary/30 px-2 py-1 body-callout-bold text-primary uppercase">
                Destaque
              </div>
              <p className="body-callout text-muted-foreground">Destaque do mês</p>
            </div>
          ) : (
            <div className="w-fit rounded-lg border border-destructive bg-destructive/30 px-2 py-1 body-callout-bold text-destructive uppercase">
              Fora de Estoque
            </div>
          )}

          {hasShipping && (
            <p>
              <a
                href="#"
                className="body-caption underline underline-offset-4 opacity-80 hover:opacity-100 text-primary"
              >
                {shippingText}
              </a>{" "}
              <span className="body-caption text-muted-foreground">em todos os pedidos</span>
            </p>
          )}
        </div>

        <PriceFormat prefix={prefix} value={price} className="text-4xl heading-03-bold text-primary" />

        <div className="flex flex-row flex-wrap gap-4">
          <Button variant="outline" size="lg" className="w-full md:w-fit body-title-bold" onClick={onAddToCart}>
            Adicionar no carrinho
          </Button>
          <Button size="lg" className="w-full md:w-fit body-title-bold" onClick={onBuyNow}>
            Comprar
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard_02;
export type { ProductCard_02Props };
