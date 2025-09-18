"use client";

import { Breadcrumb, Button, Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { BREADCRUMPS_PAGE_NAMES } from "@/shared/data/breadcrumbs.data";
import React, { Fragment } from "react";
import { PAGES } from "@/shared/config/pages.config";
import Link from "next/link";

interface IPath {
  link: string;
  name: string;
}

export default function ContentHeader() {
  const pathname = usePathname();
  const path = pathname.split("/").reduce((acc, p) => {
    if (p) {
      acc.push({
        link: p,
        name:
          BREADCRUMPS_PAGE_NAMES[p as keyof typeof BREADCRUMPS_PAGE_NAMES] || p,
      });
    }
    return acc;
  }, [] as IPath[]);

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
            path.map((p: IPath, index) => {
              return (
                <Fragment key={p.link}>
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
    </Flex>
  );
}
