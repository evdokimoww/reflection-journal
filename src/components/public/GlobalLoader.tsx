import { Box, Center, Spinner } from "@chakra-ui/react";

export function GlobalLoader() {
  return (
    <Box pos="absolute" inset="0" bg="bg/90" zIndex="2">
      <Center h="full">
        <Spinner
          size="xl"
          borderWidth="6px"
          css={{ "--spinner-track-color": "colors.gray.200" }}
        />
      </Center>
    </Box>
  );
}
