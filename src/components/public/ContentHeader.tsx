import { Breadcrumb, Button, Dialog, Flex } from "@chakra-ui/react";
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
}

export default function ContentHeader({
  removeEntry,
  isRemoveEntryLoading,
  router,
  pathname,
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
      h="20"
      w="100%"
      align="center"
      gap="4"
      position="sticky"
      top="0"
      bg="white"
      zIndex="10"
      pl="8"
    >
      <Breadcrumb.Root size="lg" fontWeight="bold">
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
      {pathname === PAGES.ENTRIES && (
        <Link href={PAGES.CREATE_ENTRY}>
          <Button variant="surface" size="sm">
            + Новая запись
          </Button>
        </Link>
      )}
      {entityID && (
        <Dialog.Root role="alertdialog" size="xs">
          <Dialog.Trigger asChild>
            <Button variant="surface" size="sm">
              Удалить запись
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
