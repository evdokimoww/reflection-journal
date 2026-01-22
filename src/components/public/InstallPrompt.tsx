"use client";

import { useEffect, useState } from "react";
import { Box, Button, Card, Flex, Text, CloseButton } from "@chakra-ui/react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const checkStandalone = () => {
      const nav = window.navigator;
      const isStandaloneMode = window.matchMedia(
        "(display-mode: standalone)"
      ).matches;
      const isIOSStandalone =
        "standalone" in nav &&
        (nav as { standalone: boolean }).standalone === true;
      const isAndroidApp = document.referrer.includes("android-app://");

      return isStandaloneMode || isIOSStandalone || isAndroidApp;
    };

    setIsIOS(
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window)
    );

    setIsStandalone(checkStandalone());

    // Обработка события beforeinstallprompt для Android/Chrome
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      console.log("beforeinstallprompt event fired");
    };

    // Проверяем, может ли приложение быть установлено
    const checkInstallability = async () => {
      if (
        "serviceWorker" in navigator &&
        "BeforeInstallPromptEvent" in window
      ) {
        // Браузер поддерживает установку
        console.log("PWA installation is supported");
      }
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    checkInstallability();

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === "accepted") {
      console.log("User accepted the install prompt");
      setIsDismissed(true);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    // Сохраняем в localStorage, чтобы не показывать снова
    if (typeof window !== "undefined") {
      localStorage.setItem("pwa-install-dismissed", "true");
    }
  };

  // Проверяем, был ли баннер закрыт ранее
  useEffect(() => {
    if (typeof window !== "undefined") {
      const dismissed = localStorage.getItem("pwa-install-dismissed");
      if (dismissed === "true") {
        setIsDismissed(true);
      }
    }
  }, []);

  // Не показываем, если приложение уже установлено или баннер закрыт
  if (isStandalone || isDismissed) {
    return null;
  }

  // Показываем баннер, если есть deferredPrompt (для Android/Chrome)
  // Или показываем инструкции для iOS
  if (!deferredPrompt && !isIOS) {
    return null; // Не показываем ничего, если нет prompt и не iOS
  }

  return (
    <Box
      position="fixed"
      bottom="0"
      left="0"
      right="0"
      zIndex="overlay"
      p={{ base: 4, md: 6 }}
    >
      <Card.Root
        maxW={{ base: "100%", md: "600px" }}
        mx="auto"
        bg="white"
        boxShadow="xl"
      >
        <Card.Body p={{ base: 4, md: 6 }}>
          <Flex
            direction={{ base: "column", md: "row" }}
            gap={4}
            align={{ base: "stretch", md: "center" }}
          >
            <Flex flex="1" direction="column" gap={2}>
              <Flex justifyContent="space-between" alignItems="center">
                <Text fontSize={{ base: "lg", md: "xl" }} fontWeight="bold">
                  Установите приложение
                </Text>
                <CloseButton
                  onClick={handleDismiss}
                  aria-label="Закрыть"
                  size="sm"
                />
              </Flex>
              <Text fontSize={{ base: "sm", md: "md" }} color="gray.600">
                {deferredPrompt
                  ? "Установите Reflection Journal для быстрого доступа и работы в офлайн режиме."
                  : "Для установки на iOS: нажмите кнопку «Поделиться» и выберите «На экран «Домой»»."}
              </Text>
            </Flex>
            <Flex
              gap={2}
              align="center"
              direction={{ base: "column", md: "row" }}
              w={{ base: "100%", md: "auto" }}
            >
              {deferredPrompt && (
                <Button
                  colorPalette="blue"
                  onClick={handleInstallClick}
                  w={{ base: "100%", md: "auto" }}
                >
                  Установить
                </Button>
              )}
            </Flex>
          </Flex>
        </Card.Body>
      </Card.Root>
    </Box>
  );
}
