import React, { useRef, useState } from 'react'

//Components imports
import Navbar from '../components/Navbar'
import TodosMain from '../components/TodosMain/TodosMain';

//Chakra ui imports
import { Container, useToast } from '@chakra-ui/react'

export default function Dashboard() {

    //State - Todo
    const [todos, setTodos] = useState([]);
    const [activeTodo, setActiveTodo] = useState()


    //Refs
    const todoNameRef = useRef();
    const todoDescriptionRef = useRef();

    //Toast message
    const toast = useToast()

    //Modal states
    const [isOpen, setIsOpen] = useState(false);
    const [isEdit, setIsEdit] = useState(false)
    const onClose = () => setIsOpen(false);


    //Function to handle submission of todo
    const handleSubmitTodo = () => {

        //Handling errors
        if (todoNameRef.current.value === "" || todoDescriptionRef.current.value === "") {
            toast({
                title: 'Error',
                description: "Todo name and description can't be empty",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }

        else if (todoDescriptionRef.current.value.split('').length < 100) {
            toast({
                title: 'Error',
                description: "Todo Description should be more than 100 words",
                status: 'error',
                duration: 2000,
                isClosable: true,
            })
        }

        //If there is no error
        else {
            //If the popup is edit popup
            if (isEdit) {
                const filtered = todos.filter(t => t.id !== activeTodo.id);
                const editTodo =  todos.find(t => t.id === activeTodo.id);
                editTodo.todoName = todoNameRef.current.value;
                editTodo.todoDescription = todoDescriptionRef.current.value;
                setTodos([...filtered, editTodo]);
                setIsOpen(false)
                setIsEdit(false)
                setActiveTodo({})
                toast({
                    title: 'Success',
                    description: "Todo updated successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }

            //If the popupup is create popup
            else {
                setTodos(prev => [...prev, { id: todos.length + 1, todoName: todoNameRef.current.value, todoDescription: todoDescriptionRef.current.value, status: "notCompleted" }]);
                setIsOpen(false)
                toast({
                    title: 'Success',
                    description: "Todo created successfully!",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                })
            }

        }
    }


    return (
        <>
            <Navbar />

            <Container maxW='1200px' className='my-16'>
                <TodosMain
                    isOpen={isOpen}
                    setIsOpen={setIsOpen}
                    onClose={onClose}
                    todoNameRef={todoNameRef}
                    todoDescriptionRef={todoDescriptionRef}
                    handleSubmitTodo={handleSubmitTodo}
                    todos={todos}
                    setTodos={setTodos}
                    isEdit={isEdit}
                    setIsEdit={setIsEdit}
                    activeTodo={activeTodo}
                    setActiveTodo={setActiveTodo}
                />
            </Container>

        </>
    )
}
