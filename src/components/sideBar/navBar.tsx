import { Avatar, Box, Button, Flex, HStack, IconButton, Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, Stack, Text, useColorModeValue, useDisclosure } from "@chakra-ui/react"
import { HamburgerIcon, CloseIcon, AddIcon } from '@chakra-ui/icons'
import Image from "next/image"
import { signOut, useSession } from "next-auth/react"
import { redirect } from "next/navigation"
import { useServerContext } from "@/context/serverContext/server.context"

interface Props {
    to?: string,
    children: React.ReactNode
  }
  
  const Links = [{label: 'Settings', link: 'settings'}]
  
  const NavLink = (props: Props) => {
    const { children, to } = props
    return (
      <Box
        as="a"
        px={2}
        py={1}
        rounded={'md'}
        _hover={{
          textDecoration: 'none',
          bg: useColorModeValue('gray.200', 'gray.700'),
        }}
        href={to ? to : '#'}>
        {children}
      </Box>
    )
  }
  
  export default function NavBar() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const context = useServerContext()
    const { status, data } = useSession({
        required: true,
        onUnauthenticated() {
          redirect('/api/auth/signin')  
        },
      })

    const handleSignOut = () => {
        signOut({redirect: true})
    }
  
    return (
      <>
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
          <Flex h={16} alignItems={'center'} justifyContent={'space-between'}>
            <IconButton
              size={'md'}
              icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
              aria-label={'Open Menu'}
              display={{ md: 'none' }}
              onClick={isOpen ? onClose : onOpen}
              border={'2px solid grey'}
            />
            <HStack spacing={8} alignItems={'center'}>
                <HStack spacing={2} alignItems={'center'}>
                    <Image
                        src="/royalgaming_logo.svg"
                        alt="royalgaming_logo"
                        className="dark:invert"
                        width={50}
                        height={24}
                        priority
                    />
                    <Text fontSize={'2xl'}>RoyalGaming</Text>
                </HStack>
              <HStack as={'nav'} spacing={4} display={{ base: 'none', md: 'flex' }}>
                {Links.map(({label, link}) => (
                  <NavLink key={link} to={link}>{label}</NavLink>
                ))}
              </HStack>
            </HStack>
            <Flex alignItems={'center'}>
              <Button
                display={{ base: 'none', md: 'flex' }}
                variant={'solid'}
                colorScheme={'teal'}
                size={'sm'}
                mr={4}
                leftIcon={<AddIcon />}>
                Server
              </Button>
              <Menu>
                <MenuButton
                  as={Button}
                  rounded={'full'}
                  variant={'link'}
                  cursor={'pointer'}
                  minW={0}>
                  <Avatar
                    size={'sm'}
                  />
                </MenuButton>
                <MenuList>
                    <MenuGroup title={data?.user.name}>
                        <MenuItem onClick={handleSignOut}>Sign out</MenuItem>
                    </MenuGroup>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
  
          {isOpen ? (
            <Box pb={4} display={{ md: 'none' }}>
              <Stack as={'nav'} spacing={4}>
                {Links.map(({label, link}) => (
                  <NavLink key={link} to={link}>{label}</NavLink>
                ))}
              </Stack>
            </Box>
          ) : null}
        </Box>
      </>
    )
  }
  