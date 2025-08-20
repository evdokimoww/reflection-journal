import React, { PropsWithChildren } from "react";
import { Grid, GridItem } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";

export default function PublicLayout({ children }: PropsWithChildren<unknown>) {
  return (
    <Grid templateColumns="repeat(8, 1fr)" gap="6">
      <GridItem colSpan={1}>
        <Sidebar />
      </GridItem>
      <GridItem colSpan={7} p="8">
        {children}
      </GridItem>
    </Grid>
  );
}
