"use client";

import Link from "next/link";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import NavItem from "@/components/public/NavItem";
import { SIDEBAR_MENU_LINKS } from "@/shared/data/sidebar.data";
import { usePathname } from "next/navigation";
import { PAGES } from "@/config/pages.config";
import { SidebarBottomLink } from "@/components/public/SidebarBottomLink";

interface ISidebarProps {
  onSignOut: () => void;
}

export default function Sidebar({ onSignOut }: ISidebarProps) {
  const pathname = usePathname();
  const originalPathname = "/" + (pathname.split("/").filter(Boolean)[0] || "");

  return (
    <Flex
      minH="100vh"
      borderRightWidth="1px"
      borderRightColor="gray.300"
      w={{ md: 80 }}
      direction="column"
      justify="space-between"
    >
      <Box>
        <Flex h="20" mx="8" mb="8" direction="column" justify="center">
          <Text fontSize={{ md: "lg", lg: "xl" }} fontWeight="bold">
            Reflection Journal
          </Text>
        </Flex>
        <Flex mx="8" direction="column">
          {SIDEBAR_MENU_LINKS.map((link) => (
            <NavItem
              key={link.name}
              link={link}
              isActive={link.href === originalPathname}
            />
          ))}
        </Flex>
      </Box>
      <Flex
        h="20"
        borderTopWidth="1px"
        borderTopColor="gray.300"
        align="center"
      >
        <Avatar.Root ml="8" mr="4">
          <Avatar.Fallback name="User Name" />
        </Avatar.Root>
        <Box>
          <Link href={PAGES.PROFILE}>
            <SidebarBottomLink
              isActive={PAGES.PROFILE.includes(originalPathname)}
            >
              username@mail.ru
            </SidebarBottomLink>
          </Link>
          <Link href={PAGES.AUTH}>
            <SidebarBottomLink onClick={onSignOut}>Выйти</SidebarBottomLink>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}
