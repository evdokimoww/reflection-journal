import {
  Box,
  CloseButton,
  Dialog,
  Flex,
  Heading,
  Portal,
  Text,
} from "@chakra-ui/react";
import { IMethodology } from "@/shared/data/methodolodies.data";

interface IProps {
  methodology: IMethodology;
}

export function MethodologyItemDialog({ methodology }: IProps) {
  return (
    <Portal>
      <Dialog.Backdrop />
      <Dialog.Positioner>
        <Dialog.Content>
          <Dialog.Header>
            <Dialog.Title>{methodology.title}</Dialog.Title>
          </Dialog.Header>
          <Dialog.Body>
            <Flex direction="column" gap="4">
              <Text>{methodology.description}</Text>
              {!!methodology.theory && (
                <Box>
                  <Heading size="md" mb="2">
                    Немного теории:
                  </Heading>
                  {methodology.theory.split("\n").map((paragraph, index) => (
                    <Text key={index} mb="2">
                      {paragraph}
                    </Text>
                  ))}
                </Box>
              )}
              {!!methodology.steps.length && (
                <Box>
                  <Heading size="md" mb="2">
                    Шаги:
                  </Heading>
                  {methodology.steps.map((step) => (
                    <Box key={step.id} mb="2">
                      <Text fontWeight="bold">{step.question}</Text>
                      {step.description && (
                        <Text fontSize="sm">{step.description}</Text>
                      )}
                      {step.hint && <Text fontSize="sm">{step.hint}</Text>}
                    </Box>
                  ))}
                </Box>
              )}
            </Flex>
          </Dialog.Body>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
}
