import React from 'react'

// Chakra ui imports
import {
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    ModalHeader,
    ModalFooter,
    FormControl,
    FormLabel,
    Input,
    Button,
    Modal,
    Divider,
    Textarea
} from '@chakra-ui/react'

export default function CustomModal({ 
    isEdit, 
    isOpen, 
    onClose, 
    modalHeader, 
    todoNameRef, 
    todoDescriptionRef, 
    handleSubmitTodo, 
    activeTodo 
}) {

    return (
        <>
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size={"lg"}
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>{modalHeader}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        {/* Todo Name input */}
                        <FormControl>
                            <FormLabel>Todo name</FormLabel>
                            <Input ref={todoNameRef} defaultValue={activeTodo?.todoName} placeholder='Todo name' required />
                        </FormControl>

                        <Divider mt={"5"} />

                        {/* Todo Description input */}
                        <FormControl mt={4}>
                            <FormLabel>Description</FormLabel>
                            <Textarea ref={todoDescriptionRef} defaultValue={activeTodo?.todoDescription} placeholder='Description' required />
                        </FormControl>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleSubmitTodo}>
                            {isEdit ? "Update" : "Save"}
                        </Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}
