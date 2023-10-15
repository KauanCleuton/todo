"use client"



import { List } from "../../backend/models/types/Todo"
import { useEffect, useState, useReducer, FormEvent } from "react"


const Page = () => {
  const [value, setValue] = useState('');
  const [list, setList] = useState<List[]>([]);
  const [edit, setEdit] = useState(false);
  const [textEdit, setTextEdit] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:3333/list'); // Substitua pela rota apropriada
      if (response.ok) {
        const data = await response.json();
        setList(data);
      }
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddClick = async () => {
    try {
      const response = await fetch('http://localhost:3333/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: value,
          description: value,
          completed: false,
        }),
      });

      if (response.ok) {
        setValue('');
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const Remove = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3333/delete/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  const editText = (text: string) => {
    setTextEdit(text);
    setEdit(!edit);
  }
  const handleEditButton = async (id: number) => {
    if (textEdit.trim() === '') {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3333/edit/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: textEdit,
          description: textEdit,
        }),
      });

      if (response.ok) {
        setTextEdit('');
        setEdit(!edit);
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleCheckedButton = async (id: number, completed: boolean) => {
    try {
      const response = await fetch(`http://localhost:3333/done/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          completed: !completed,
        }),
      });

      if (response.ok) {
        fetchData();
      }
    } catch (error) {
      console.error(error);
    }
  }
  return (
    <div className="container mx-auto p-5 items-center">
      <h1 className="text-center text-4xl my-4">Lista de Tarefas</h1>
      <div className="max-w-2xl mx-auto flex-wrap flex rounded-md border bg-gray-900 border-gray-400 p-4 my-4">
        <input placeholder="Digite um item"
          className="rounded-md flex-1 text-center border border-white p-3 bg-transparent text-white outline-none" type="text" value={value}
          onChange={(e) => setValue(e.target.value)} />
        <button className="p-4" onClick={handleAddClick}>Adicionar</button>
      </div>
      <ul className="max-w-2xl h-96 rounded-md mx-auto overflow-x-auto">
        {list.map(item => (
          <li className={`flex p-3 my-3 border-b items-center rounded-md border-gray-700 ${item.completed && 'bg-gray-800'} cursor-pointer transition duration-150 hover:bg-gray-900 ease-in`} key={item.id} >
            <input onChange={() => handleCheckedButton(item.id, item.completed)} type="checkbox" className="rounded-md mr-4 w-5 h-5" checked={item.completed} name="" id="" />
            <p className="flex-1 te text-xl">{item.title}</p> <button onClick={() => Remove(item.id)}
              className="mx-4 bg-red-600
             text-white py-1 px-3 text-xl rounded-full transition duration-150  hover:bg-red-500 ease-in">X</button> <button className="bg-gray-900
             text-white py-2 mx-4 px-2 rounded-xl transition duration-150 hover:bg-gray-700 ease-in" onClick={() => editText(item.title)}>Editar</button>
          </li>
        ))}
      </ul>
      {edit && (
        list.map(item => (
          <div className="fixed w-10/12 h-auto mx-auto flex rounded-md border bg-gray-900 border-gray-400 p-4 my-4" key={item.id}>
            <input placeholder="Digite um item"
              className="rounded-md flex-1 text-center border border-white p-3 bg-transparent text-white outline-none" type="text" value={textEdit}
              onChange={(e) => setTextEdit(e.target.value)} />
            <button className="p-4" onClick={() => handleEditButton(item.id)}>Editar</button>
          </div>
        ))
      )}


    </div>
  )
}

export default Page
