import { Box, Button, Flex, Input, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaPlus } from 'react-icons/fa';
import { getTodos, postTodos } from '../redux/todosReducer/action';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch } from 'redux';

const TodoInput = () => {
    const [todo, setTodo] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const dispatch: Dispatch<any> = useDispatch();
    const toast = useToast();
    const value: string | null = localStorage.getItem('token');
    const token: { [key: string]: any } | null = value ? JSON.parse(value) : null;
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        if(!todo){
            toast({
                title : "All fields are required",
                description : "Can't post empty todo",
                status : 'warning',
                isClosable : true,
                duration : 4000,
                position : 'top'
            })
            return;
        }

        const newTodo = {
            title: todo,
            created_at: Date.now(),
            priority: Math.ceil(Math.random() * 10),
            status: false,
            description: description
        }

        await dispatch(postTodos(newTodo));
        await dispatch(getTodos(token?.token));
        setTodo('');
        setDescription('');
    }

  
}

export default TodoInput;