import { Box, Card, Flex, Stack, Table, Text } from "@chakra-ui/react";
import React from "react";
import { EntryListItem } from "@/shared/types";

interface Props {
  entries: EntryListItem[];
  onRowDoubleClick: (id: string) => void;
}

export function EntriesTable({ entries, onRowDoubleClick }: Props) {
  return (
    <>
      {/* Desktop Table View */}
      <Box display={{ base: "none", md: "block" }}>
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
      </Box>

      {/* Mobile Card View */}
      <Stack display={{ base: "flex", md: "none" }} gap="2">
        {!!entries.length ? (
          entries.map((item) => (
            <Card.Root
              key={item.id}
              cursor="pointer"
              onDoubleClick={() => onRowDoubleClick(item.id)}
              _hover={{ bg: "gray.50" }}
            >
              <Card.Body p="3">
                <Stack gap="2">
                  <Text fontWeight="bold" fontSize="sm">
                    {item.title}
                  </Text>
                  <Flex direction="column" gap="1">
                    <Flex align="center" gap="2">
                      <Text fontSize="xs" color="gray.600" fontWeight="medium">
                        Дата:
                      </Text>
                      <Text fontSize="xs">{item.created_at}</Text>
                    </Flex>
                    <Flex align="center" gap="2">
                      <Text fontSize="xs" color="gray.600" fontWeight="medium">
                        Методология:
                      </Text>
                      <Text fontSize="xs">{item.methodology}</Text>
                    </Flex>
                    <Flex align="center" gap="2" flexWrap="wrap">
                      <Text fontSize="xs" color="gray.600" fontWeight="medium">
                        Теги:
                      </Text>
                      {item.tags.length ? (
                        <Flex gap="1" flexWrap="wrap">
                          {item.tags.map((t) => (
                            <Text key={t} fontSize="xs">
                              #{t}
                            </Text>
                          ))}
                        </Flex>
                      ) : (
                        <Text fontSize="xs" color="gray.400">
                          теги не добавлены
                        </Text>
                      )}
                    </Flex>
                  </Flex>
                </Stack>
              </Card.Body>
            </Card.Root>
          ))
        ) : (
          <Card.Root>
            <Card.Body p="3">
              <Text fontSize="sm">Нет данных</Text>
            </Card.Body>
          </Card.Root>
        )}
      </Stack>
    </>
  );
}
