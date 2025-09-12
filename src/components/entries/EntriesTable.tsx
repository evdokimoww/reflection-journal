import { Box, Table } from "@chakra-ui/react";
import { EntriesTableFilters } from "@/components/entries/EntriesTableFilters";
import { REFLECTION_ENTRIES } from "@/shared/data/reflection-entries.data";
import { format } from "date-fns";
import { METHODOLOGIES_NAMES } from "@/shared/data/methodolodies.data";
import React from "react";

interface IProps {
  onRowDoubleClick: (id: string) => void;
}

export function EntriesTable({ onRowDoubleClick }: IProps) {
  return (
    <Box>
      <EntriesTableFilters />
      <Table.Root size="sm" striped interactive>
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
            <Table.Row
              key={item.id}
              cursor="pointer"
              onDoubleClick={() => onRowDoubleClick(item.id)}
            >
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
