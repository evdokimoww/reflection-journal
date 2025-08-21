"use client";

import { Breadcrumb, Flex } from "@chakra-ui/react";
import { usePathname } from "next/navigation";
import { BREADCRUMPS_PAGE_NAMES } from "@/shared/data/breadcrumbs.data";
import { Fragment } from "react";

export default function ContentHeader() {
  const pathname = usePathname();
  const path = pathname.split("/").filter(Boolean);

  return (
    <Flex h="20" w="100%" mb="8" align="center">
      <Breadcrumb.Root size="lg">
        <Breadcrumb.List>
          {path.length > 0 ? (
            path.map((p: string, index) => {
              return (
                <Fragment key={p}>
                  <Breadcrumb.Item>
                    <Breadcrumb.Link href={`/${p}`}>
                      {/*todo fix after adding entries*/}
                      {BREADCRUMPS_PAGE_NAMES[
                        p as keyof typeof BREADCRUMPS_PAGE_NAMES
                      ] || p}
                    </Breadcrumb.Link>
                  </Breadcrumb.Item>
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
    </Flex>
  );
}
