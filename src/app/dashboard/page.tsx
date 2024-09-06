'use client'

import Home from '@/components/home/home';
import NavBar from '@/components/sideBar/navBar';
import { Center, Spinner } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Page() {
  const { status } = useSession({
    required: true,
    onUnauthenticated() {
      redirect('/api/auth/signin')  
    },
  })
  return (
    <>
    {status == 'authenticated' ? 
      <Home/>
      :
      <Center marginTop={5}>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    }
      
    </>
  );
}
