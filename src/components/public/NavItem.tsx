import Link from "next/link";
import { Box } from "@chakra-ui/react";
import type { SidebarMenuItem } from "@/shared/data/sidebar.data";

interface Props {
  link: SidebarMenuItem;
  isActive: boolean;
}

export default function NavItem({ link, isActive }: Props) {
  return (
    <Link href={link.href}>
      <Box
        _hover={{
          bg: "gray.400",
          color: "white",
        }}
        bg={isActive ? "gray.400" : ""}
        color={isActive ? "white" : ""}
        borderRadius="md"
        p="2"
      >
        {link.name}
      </Box>
    </Link>
  );
}
