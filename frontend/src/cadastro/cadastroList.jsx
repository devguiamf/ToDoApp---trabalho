import React from "react";
import IconButton from "../template/iconButton";

export default props => {
    const renderRows = () => {
        const list = props.list || [];
        return list.map(cadastro => (
            <tr key={cadastro._id}>
                <td className={cadastro.done ? 'markedAsDone' : ''}>{cadastro.nome}</td>
                <td className={cadastro.done ? 'markedAsDone' : ''}>{cadastro.createdAt}</td>  
                <td>
                    <IconButton style='danger' icon='trash-o'                     
                            onClick={() => props.handleRemove(cadastro)}></IconButton>
                </td>
            </tr>
        ));
    }
    return (
        <table className='table'>
            <thead>
                <tr>
                    <th>Nomes</th>
                    <th >Data</th>
                    <th >Excluir</th>

                </tr>
            </thead>
            <tbody>
                {renderRows()}
            </tbody>
        </table>
    )
}