import { VersionData } from "@/services/versions/interfece";
import { getVersions } from "@/services/versions/versions";
import { Box, Button, FormControl, FormErrorMessage, FormLabel, Input, PinInputField, Select, Spinner } from "@chakra-ui/react";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";

export default function ServerForm () {
    const [versions, setVersions] = useState<VersionData[]>([])
    const [input, setInput] = useState<{
        serverName?: string
        serverVersion?: VersionData
    }>({serverName: ''})

    useEffect(() => {
        getVersionsData()
    }, [])

    // public methods
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInput({...input, [event.target.name]: event.target.value})
    }

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedVersion = versions.find(v => v.id === event.target.value)
        setInput({...input, serverVersion: selectedVersion})
    }

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log({input});
        
    }

    // private methods
    const getVersionsData = () => {
        getVersions()
            .then((data) => {
                console.log(data);
                if (data) {
                    setVersions(data.versions)
                    setInput({...input, serverVersion: data.versions[0]})
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }

    return (
        <>
            {versions.length != 0 ? 
                <Box>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired>
                            <FormLabel htmlFor='name'>Server Name</FormLabel>
                            <Input onChange={handleInputChange} name='serverName' placeholder='name' />
                            <FormErrorMessage>{'required'}</FormErrorMessage>
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor='version'>Server Version</FormLabel>
                            <Select onChange={handleSelectChange} name='serverVersion'>
                                {versions.map((v, i) => 
                                    <option selected={i === 0} value={v.id} key={v.id}>{v.type} {v.id}</option>
                                )}
                            </Select>
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme='teal'
                            isLoading={false}
                            type='submit'
                        >
                            Submit
                        </Button>
                    </form>
                </Box>   
                :
                <Spinner></Spinner>
            }
        </>
    )
}