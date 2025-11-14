import Link from "next/link";
import { Avatar, Box, Flex, Skeleton, Text } from "@chakra-ui/react";
import NavItem from "@/components/public/NavItem";
import { SIDEBAR_MENU_LINKS } from "@/shared/data/sidebar.data";
import { PAGES } from "@/shared/constants.ts";
import { SidebarBottomLink } from "@/components/public/SidebarBottomLink";

interface Props {
  pathname: string;
  onSignOut: () => void;
  isProfileLoading: boolean;
  userEmail: string;
}

export default function Sidebar({
  pathname,
  onSignOut,
  isProfileLoading,
  userEmail,
}: Props) {
  const originalPathname = "/" + (pathname.split("/").filter(Boolean)[0] || "");

  return (
    <Flex
      minH="100%"
      borderRightWidth="1px"
      borderRightColor="gray.300"
      w={{ md: 80 }}
      direction="column"
      justify="space-between"
      overflow="hidden"
    >
      <Box>
        <Flex
          h="20"
          mx="8"
          mb="8"
          direction="column"
          justify="center"
          position="sticky"
          top="0"
        >
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
          {isProfileLoading ? (
            <Skeleton height="5" width="150px" />
          ) : (
            <Link href={PAGES.PROFILE}>
              <SidebarBottomLink isActive={PAGES.PROFILE === originalPathname}>
                {userEmail}
              </SidebarBottomLink>
            </Link>
          )}
          <SidebarBottomLink onClick={onSignOut}>Выйти</SidebarBottomLink>
        </Box>
      </Flex>
    </Flex>
  );
}
