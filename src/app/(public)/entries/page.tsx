import { Box, Table } from "@chakra-ui/react";
import React from "react";
import { format } from "date-fns";
import { REFLECTION_ENTRIES } from "@/shared/data/reflection-entries.data";
import { METHODOLOGIES_NAMES } from "@/shared/data/methodolodies.data";
import { TableFilters } from "@/app/(public)/entries/TableFilters";

export default function EntriesPage() {
  return (
    <Box>
      <TableFilters />
      <Table.Root size="sm" striped>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader w="160px">Дата</Table.ColumnHeader>
            <Table.ColumnHeader>Краткое содержание</Table.ColumnHeader>
            <Table.ColumnHeader>Методология</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Теги</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {REFLECTION_ENTRIES.map((item) => (
            <Table.Row key={item.id}>
              <Table.Cell>
                {format(item.createdAt, "dd.MM.yyyy HH:mm")}
              </Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>
                {
                  METHODOLOGIES_NAMES[
                    item.methodId as keyof typeof METHODOLOGIES_NAMES
                  ]
                }
              </Table.Cell>
              <Table.Cell textAlign="end">
                {item.tags.map((t) => `#${t}`).join(" ")}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
