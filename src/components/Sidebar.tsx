"use client";

import Link from "next/link";
import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import NavItem from "@/components/NavItem";
import { SIDEBAR_MENU_LINKS } from "@/shared/data/sidebar.data";
import { usePathname } from "next/navigation";
import { match } from "path-to-regexp";
import { PAGES } from "@/config/pages.config";

type BottomLinkProps = {
  isActive?: boolean;
  children: React.ReactNode;
};

const BottomLink = ({ isActive = false, children }: BottomLinkProps) => (
  <Box
    fontSize="14px"
    fontWeight={isActive ? "bold" : "normal"}
    color="gray.400"
    _hover={{
      textDecoration: "underline",
      cursor: "pointer",
    }}
  >
    {children}
  </Box>
);

export default function Sidebar() {
  const pathname = usePathname();

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
        <Flex h="20" mx="8" direction="column" justify="center">
          <Text fontSize="2xl" fontWeight="bold">
            Reflection Journal
          </Text>
        </Flex>
        <Flex mx="8" direction="column">
          {SIDEBAR_MENU_LINKS.map((link) => (
            <NavItem
              key={link.name}
              link={link}
              isActive={!!match(link.href)(pathname)}
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
            <BottomLink isActive={!!match(PAGES.PROFILE)(pathname)}>
              username@mail.ru
            </BottomLink>
          </Link>
          <Link href={PAGES.AUTH}>
            <BottomLink>Выйти</BottomLink>
          </Link>
        </Box>
      </Flex>
    </Flex>
  );
}
