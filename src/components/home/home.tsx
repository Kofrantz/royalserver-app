import { useServerContext } from "@/context/serverContext/server.context"
import { LogData, LogType, ServerStatus } from "../../context/serverContext/interfaces"
import useWebSocket from "@/hooks/useWebSocket"
import { Input, Button, Center, InputGroup, InputRightElement, Spinner, Stack, Text, VStack, Box } from "@chakra-ui/react"
import axios from "axios"
import { useSession } from "next-auth/react"
import { ChangeEvent, useEffect, useState } from "react"

export default function Home () {
    const session = useSession()
    const [commandField, setCommandField] = useState<string>('')
    const { logs, serverStatus } = useServerContext()

    // public methods
    const handleRunServer = () => {
        // startServer()
        // setServerStatus(ServerStatus.LOADING)
    }

    const handleStopServer = () => {
        // stopServer()
        // setServerStatus(ServerStatus.STOPPING)
    }

    const handleExecCommand = () => {
        // sendCommand(commandField)
        // setCommandField('')
    }

    const handleCommandInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setCommandField(event.target.value)
    }

    // private methods

    const getStatusColor = (s: ServerStatus): string => {
        switch(s) {
            case ServerStatus.GETTING_STATUS:
                return 'darkturquoise'
            case ServerStatus.LOADING:
                return 'darkturquoise'
            case ServerStatus.STOPPING:
                return 'darkturquoise'
            case ServerStatus.RUNNING:
                return 'lightgreen'
            case ServerStatus.STOPPED:
                return 'orange'
            case ServerStatus.FAILED:
                return 'red'
            case ServerStatus.NOT_FOUND:
                return 'red'
            default:
                return 'black'
        }
    }

    const getLogColor = (l: LogData): string => {
        switch(l.type) {
            case LogType.MESSAGE:
                return 'white'
            case LogType.ERROR:
                return 'red'
            case LogType.CLOSE:
                return 'orange'
            default:
                return 'white'
        }
    }

    return (
        <>
        <Center marginTop={5} >
            {!session.data ? 
                <Spinner
                    thickness='4px'
                    speed='0.65s'
                    emptyColor='gray.200'
                    color='blue.500'
                    size='xl'
                />
                :
                <Stack spacing={3} border={'2px solid grey'} padding={'1rem'} margin={'0.5rem'}>
                    <Stack spacing={4} direction='row' align='center'>
                        <Text fontSize={{base: '2xl', md: '3xl'}}>Server Status: </Text>
                        <Text fontSize={{base: '2xl', md: '3xl'}} color={getStatusColor(serverStatus)}>{serverStatus}</Text>
                    </Stack>
                    <Stack spacing={3} direction='row' align='center'>
                        <Button onClick={() => {handleRunServer()}} colorScheme='teal' size='sm' w={'100%'}>Run Server</Button>
                        <Button onClick={() => {handleStopServer()}} colorScheme='teal' size='sm' w={'100%'}>Stop Server</Button>
                    </Stack>
                </Stack>
            }
        </Center>
        <Center marginTop={5}>
            {logs.length ? 
                <VStack bgColor={'gray.200'} padding={5} w={"90vw"} borderRadius={'0.575rem'} spacing={4}>
                    <VStack textAlign={"left"} align={"left"} overflowY="auto" maxHeight={'400px'} flexDirection={'column-reverse'} w={'100%'}>
                        {logs.map((log, i) => <Text key={i} flexShrink="0" color={getLogColor(log)}>{log.msg}</Text>)}
                    </VStack>
                    <InputGroup size='md'>
                        <Input
                            pr='4.5rem'
                            type={'text'}
                            placeholder='Command'
                            onChange={handleCommandInputChange}
                            bgColor={'white'}
                        />
                        <InputRightElement width='4.5rem'>
                            <Button h='1.75rem' size='sm' onClick={handleExecCommand} type='submit'>
                                Send
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </VStack>
            : null}
        </Center>
        </>
    )
}