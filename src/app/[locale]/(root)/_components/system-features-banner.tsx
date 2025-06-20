"use client";

import { AppWindow, MonitorSmartphone, LayoutDashboard, Shield, DollarSign, Medal, Calendar } from "lucide-react";
import { IconCard } from "./icon-card";

export const SystemFeaturesBanner = () => {
  return (
    <div className="flex flex-col gap-6 items-center justify-center w-full relative">
      <div className="flex flex-col w-full justify-center items-center max-w-[60.25rem] text-center">
        <span className="body-title ">Cardápio variado</span>
        <span className="heading-03-bold ">Nossos destaques</span>
        <span className="body-title-light ">
          Da suculência do X Bacon ao sabor único do Catupi King, escolha entre hambúrgueres clássicos, especiais,
          combos e acompanhamentos para todos os gostos!
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SystemFeaturesIconsCardsData.map((item, index) => {
          return <IconCard key={index} {...item} />;
        })}
      </div>
    </div>
  );
};

const SystemFeaturesIconsCardsData = [
  {
    icon: MonitorSmartphone,
    title: "X Bacon",
    description: "Blend especial, queijo, bacon, cebola e molho barbecue.",
  },
  {
    icon: LayoutDashboard,
    title: "Catupi King",
    description: "Blend especial, Catupiry Original, bacon e queijo à sua escolha.",
  },
  {
    icon: Shield,
    title: "Duplo X - Salada",
    description: "Dois hambúrgueres, queijo cheddar, salada e molhos.",
  },
  {
    icon: DollarSign,
    title: "Combos Especiais",
    description: "Hambúrguer + batata + bebida por um preço especial.",
  },
  {
    icon: Calendar,
    title: "Promoções do Dia",
    description: "Ofertas exclusivas e novidades toda semana.",
  },
  {
    icon: Medal,
    title: "Monte do seu jeito",
    description: "Escolha pães, queijos, adicionais e molhos para personalizar.",
  },
];
