import { Box, Breadcrumb, Button, Dialog, Flex } from "@chakra-ui/react";
import { BREADCRUMPS_PAGE_NAMES } from "@/shared/data/breadcrumbs.data";
import React, { Fragment } from "react";
import { PAGES } from "@/shared/constants.ts";
import Link from "next/link";
import { RemoveEntryDialog } from "@/components/public/RemoveEntryDialog";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { createToastSuccess } from "@/shared/utils/utils.ts";

interface Path {
  link?: string;
  name: string;
}

interface Props {
  removeEntry: (
    id: string,
    router: AppRouterInstance,
    showSuccessMessage: (message: string) => void,
  ) => void;
  isRemoveEntryLoading: boolean;
  pathname: string;
  router: AppRouterInstance;
  onOpenSidebar: () => void;
}

export default function ContentHeader({
  removeEntry,
  isRemoveEntryLoading,
  router,
  pathname,
  onOpenSidebar,
}: Props) {
  let entityID: string = "";

  const path = pathname.split("/").reduce((acc, p) => {
    if (p) {
      const name =
        BREADCRUMPS_PAGE_NAMES[p as keyof typeof BREADCRUMPS_PAGE_NAMES];
      if (name) {
        acc.push({
          link: p,
          name,
        });
      } else {
        entityID = p;
        acc.push({
          name: "Просмотр и редактирование записи",
        });
      }
    }
    return acc;
  }, [] as Path[]);

  const handleRemoveEntry = () => {
    removeEntry(entityID, router, createToastSuccess);
  };

  return (
    <Flex
      h={{ base: "16", md: "20" }}
      w="100%"
      align="center"
      gap={{ base: 2, md: 4 }}
      position="sticky"
      top="0"
      bg="white"
      pl={{ base: 3, md: 4 }}
      pr={{ base: 3, md: 4 }}
      zIndex="sticky"
    >
      <Button
        variant="ghost"
        size={{ base: "xs", md: "sm" }}
        display={{ base: "inline-flex", md: "none" }}
        onClick={onOpenSidebar}
        flexShrink={0}
      >
        &#9776;
      </Button>
      <Box overflow="hidden" flex="1" minW="0">
        <Breadcrumb.Root
          size={{ base: "sm", md: "lg" }}
          fontWeight="bold"
        >
          <Breadcrumb.List>
            {path.length > 0 ? (
              path.map((p: Path, index) => {
                return (
                  <Fragment key={p.name}>
                    {index !== path.length - 1 ? (
                      <Link href={`/${p.link}`}>
                        <Breadcrumb.Item>{p.name}</Breadcrumb.Item>
                      </Link>
                    ) : (
                      <Breadcrumb.CurrentLink>{p.name}</Breadcrumb.CurrentLink>
                    )}
                    {index < path.length - 1 && <Breadcrumb.Separator />}
                  </Fragment>
                );
              })
            ) : (
              <Breadcrumb.Item>
                <Breadcrumb.CurrentLink>Дашборд</Breadcrumb.CurrentLink>
              </Breadcrumb.Item>
            )}
          </Breadcrumb.List>
        </Breadcrumb.Root>
      </Box>
      {pathname === PAGES.ENTRIES && (
        <Link href={PAGES.CREATE_ENTRY}>
          <Button
            variant="surface"
            size={{ base: "xs", md: "sm" }}
            ml={{ base: 1, md: 2 }}
            flexShrink={0}
            display={{ base: "none", sm: "inline-flex" }}
          >
            + Новая запись
          </Button>
        </Link>
      )}
      {entityID && (
        <Dialog.Root role="alertdialog" size="xs">
          <Dialog.Trigger asChild>
            <Button
              variant="surface"
              size={{ base: "xs", md: "sm" }}
              flexShrink={0}
            >
              <Box as="span" display={{ base: "none", sm: "inline" }}>
                Удалить запись
              </Box>
              <Box as="span" display={{ base: "inline", sm: "none" }}>
                Удалить
              </Box>
            </Button>
          </Dialog.Trigger>
          <RemoveEntryDialog
            removeEntry={handleRemoveEntry}
            isRemoveEntryLoading={isRemoveEntryLoading}
          />
        </Dialog.Root>
      )}
    </Flex>
  );
}
