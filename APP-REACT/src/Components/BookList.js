import React from "react";

const BookList = ({book, setBook, books, setListUpdated}) => {

    const handleDelete = id => {
        //Consulta
        const requestInit = {
            method: 'DELETE',
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
        setListUpdated(true)
    }

    let {titulo, autor, edicion} = book
    const handleUpdate = id => {
        edicion = parseInt(edicion, 10)
        //Validacion de los datos
        if (titulo === '' || autor === '' || edicion <= 0){
            alert('Todos los campos son obligatorios')
            return
        } 

        //Consulta
        const requestInit = {
            method: 'PUT',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify(book)
        }
        fetch('http://localhost:9000/api/' + id, requestInit)
        .then(res => res.text())
        .then(res => console.log(res))
        setListUpdated(true)

        setBook({
            titulo: '',
            autor: '',
            edicion: 0
        })
        
    }

    return(
        <table className="table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Edition</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book => (
                    <tr key={book.id}>
                        <td>{book.id}</td>
                        <td>{book.titulo}</td>
                        <td>{book.autor}</td>
                        <td>{book.edicion}</td>
                        <td>
                            <div className="mb-3">
                                <button onClick={()=>handleDelete(book.id)} className="btn btn-danger">DELETE</button>
                            </div>
                            <div className="mb-3">
                                <button onClick={()=>handleUpdate(book.id)} className="btn btn-dark">UPDATE</button>
                            </div>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}

export default BookList;