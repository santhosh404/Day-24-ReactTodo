import React, { useEffect, useState } from 'react';

//Chakra ui imports
import {
    Button,
    Card,
    CardHeader,
    CardBody,
    Heading,
    Box,
    Text,
    Tooltip,
    useColorMode,
    StackDivider,
    Stack,
    PopoverTrigger,
    Popover,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    Select,
    useToast,
    Skeleton
} from '@chakra-ui/react'


//Reusable components imports
import Filter from '../reusable/Filter';
import CustomModal from '../reusable/Modal';

//Asserts imports
import menuIconLight from "../../assets/three-dot-light.svg";
import menuIconDark from "../../assets/three-dot-dark.svg";



export default function TodosMain({
    isOpen,
    setIsOpen,
    onClose,
    todoNameRef,
    todoDescriptionRef,
    handleSubmitTodo,
    todos,
    setTodos,
    isEdit,
    setIsEdit,
    activeTodo,
    setActiveTodo
}) {

    const [todoCopies, setTodoCopies] = useState(todos)

    //Getting the color mode
    const { colorMode } = useColorMode();

    //Toast message
    const toast = useToast()


    //Function to change the status of todo
    const handleSelectChange = (event, id) => {
        const newTodos = [...todos];
        const filtered = newTodos.find(t => t.id === id);
        filtered.status = event.target.value;
        setTodos(newTodos);
    };

    useEffect(() => {
        setTodoCopies(todos)
    }, [todos])

    //Funtion to filter Todos
    const handleFilterOnChange = (e) => {
        const selectedVal = e.target.value;
        if (selectedVal == "all") {
            setTodoCopies(todos)
        }
        else {
            setTodoCopies(todos.filter(todo => todo.status === selectedVal))
        }
    }

    //Function to delete the Todos
    const handleDelete = (id) => {
        setTodos([...todos.filter(todo => todo.id !== id)]);
        toast({
            title: 'Success',
            description: "Todo removed successfully!",
            status: 'success',
            duration: 2000,
            isClosable: true,
        })
    }


    //Function to Edit the Todos
    const handleEdit = (actTodo) => {
        setActiveTodo(actTodo);
        setIsOpen(true);
        setIsEdit(true);
    }


    return (
        <>

            <div className='flex justify-center md:justify-between items-center flex-wrap md:flex-nowrap gap-5 md:gap-0'>
                <h1 className='font-extrabold' style={{ fontSize: "30px" }}>Your Todos ({todoCopies.length})</h1>
                <div className='flex justify-center md:justify-end gap-5 flex-wrap md:flex-nowrap'>
                    <Filter todos={todos} setTodos={setTodos} handleFilterOnChange={handleFilterOnChange} />
                    <Button variant='outline' colorScheme='blue' className='w-full sm:w-auto' onClick={() => setIsOpen(true)}>Create Todo</Button>
                </div>
            </div>


            <div className='flex flex-wrap md:flex-no-wrap gap-5 justify-center mt-10 overflow-auto p-1'>
                {
                    todoCopies.length === 0 ? "No Records Exists" :

                        todoCopies.map((todo, index) => (
                            <Card key={index} h={"auto"}>
                                <div className='flex justify-between items-center'>
                                    {/* Todo Heading */}
                                    <CardHeader>
                                        <Heading size='md'>{todo.todoName}</Heading>
                                    </CardHeader>

                                    {/* Edit and Delete Popovers */}
                                    <Popover style={{ width: 'auto' }} placement='right-start'>
                                        <PopoverTrigger>
                                            <div className={`rounded-full p-1 ${colorMode === "dark" ? "bg-gray-600" : "bg-gray-200"} cursor-pointer mr-4`}>
                                                {
                                                    colorMode === "dark" ? <img src={menuIconLight} /> : <img src={menuIconDark} />
                                                }
                                            </div>
                                        </PopoverTrigger>
                                        <PopoverContent width={"auto"}>
                                            <PopoverArrow />
                                            <PopoverBody>
                                                <p onClick={() => handleEdit(todo)} className={`p-1 ${colorMode === "dark" ? "hover:bg-gray-600" : "hover:bg-gray-200"} rounded-md cursor-pointer`}>Edit</p>
                                                <p onClick={() => handleDelete(todo.id)} className={`p-1 ${colorMode === "dark" ? "hover:bg-red-500" : "hover:bg-red-200"} rounded-md cursor-pointer`}>Delete</p>
                                            </PopoverBody>
                                        </PopoverContent>
                                    </Popover>

                                </div>


                                <CardBody>
                                    <Stack divider={<StackDivider />} spacing='4'>

                                        {/* Todo Description */}
                                        <Box className='w-[250px] md:w-[300px]'>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Summary
                                            </Heading>
                                            <Tooltip hasArrow fontSize='xs' label={todo.todoDescription}>
                                                <Text pt='2' fontSize='sm' className='description text-justify'>
                                                    {todo.todoDescription}
                                                </Text>
                                            </Tooltip>
                                        </Box>

                                        {/* Todo Status Update */}
                                        <Box>
                                            <Heading size='xs' textTransform='uppercase'>
                                                Status
                                            </Heading>
                                            <Select value={todo.status} className='mt-3' onChange={(e) => handleSelectChange(e, todo.id)}>
                                                <option value='completed' defaultValue={todo.status === "completed" ? "selected" : ""}>Completed</option>
                                                <option value='notCompleted' defaultValue={todo.status === "notCompleted" ? "selected" : ""}>Not Completed</option>
                                            </Select>
                                        </Box>
                                    </Stack>
                                </CardBody>
                            </Card>
                        ))
                }
            </div>

            {/* Modal Component */}
            <CustomModal
                isOpen={isOpen}
                onClose={() => {
                    onClose()
                    setActiveTodo({})
                    setIsEdit(false)
                }}
                activeTodo={activeTodo}
                setActiveTodo={setActiveTodo}
                modalHeader={isEdit ? "Update Your Todo" : "Create Your Todo"}
                todoNameRef={todoNameRef}
                todoDescriptionRef={todoDescriptionRef}
                handleSubmitTodo={handleSubmitTodo}
                isEdit={isEdit}
            />
        </>
    )
}
