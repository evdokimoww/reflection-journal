import { Box } from "@chakra-ui/react";

interface IBottomLinkProps {
  isActive?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}

export function SidebarBottomLink({
  isActive = false,
  onClick,
  children,
}: IBottomLinkProps) {
  return (
    <Box
      fontSize="14px"
      fontWeight={isActive ? "bold" : "normal"}
      color="gray.400"
      onClick={onClick}
      _hover={{
        textDecoration: "underline",
        cursor: "pointer",
      }}
    >
      {children}
    </Box>
  );
}
