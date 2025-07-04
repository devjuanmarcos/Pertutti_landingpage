"use client";
import React from "react";
import { ThemeProvider } from "next-themes";
import { WindowSizeProvider } from "@/context/WindowSizeContext";
import { HtmlFontSizeProvider } from "@/context/HtmlFontSizeContext";
import { AbstractIntlMessages, NextIntlClientProvider } from "next-intl";
import { UpdateProvider } from "@/context/UpdateContext";
import { CartProvider } from "../context/cart-context";
export default function Providers({
  children,
  locale,
  messages,
}: {
  children: React.ReactNode;
  locale: string | undefined;
  messages: AbstractIntlMessages | undefined;
}) {
  return (
    <>
      <NextIntlClientProvider messages={messages} timeZone={"America/Sao_Paulo"} locale={locale}>
        <WindowSizeProvider>
          <HtmlFontSizeProvider>
            <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
              <UpdateProvider>
                <CartProvider>{children}</CartProvider>
              </UpdateProvider>
            </ThemeProvider>
          </HtmlFontSizeProvider>
        </WindowSizeProvider>
      </NextIntlClientProvider>
    </>
  );
}
