import { Table, Text } from "@chakra-ui/react";
import React from "react";
import { EntryListItem } from "@/shared/types";

interface Props {
  entries: EntryListItem[];
  onRowDoubleClick: (id: string) => void;
}

export function EntriesTable({ entries, onRowDoubleClick }: Props) {
  return (
    <Table.Root size="sm" striped interactive>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader w="160px">Дата</Table.ColumnHeader>
          <Table.ColumnHeader>Краткое содержание</Table.ColumnHeader>
          <Table.ColumnHeader w="200px">Методология</Table.ColumnHeader>
          <Table.ColumnHeader textAlign="end">Теги</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {!!entries.length ? (
          entries.map((item) => (
            <Table.Row
              key={item.id}
              cursor="pointer"
              onDoubleClick={() => onRowDoubleClick(item.id)}
            >
              <Table.Cell>{item.created_at}</Table.Cell>
              <Table.Cell>{item.title}</Table.Cell>
              <Table.Cell>{item.methodology}</Table.Cell>
              <Table.Cell display="flex" justifyContent="end" gap="2">
                {item.tags.length ? (
                  item.tags.map((t) => <Text key={t}>#{t}</Text>)
                ) : (
                  <Text color="gray.400">теги не добавлены</Text>
                )}
              </Table.Cell>
            </Table.Row>
          ))
        ) : (
          <Table.Row>
            <Table.Cell colSpan={4}>Нет данных</Table.Cell>
          </Table.Row>
        )}
      </Table.Body>
    </Table.Root>
  );
}
