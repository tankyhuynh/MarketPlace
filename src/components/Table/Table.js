import React from 'react';


const Table = ({ tableData }) => {
    const { head, body } = tableData

    const renderHead = head.map(col => {
        return (
                <th scope="col" className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                    { col.name }
                </th>
        );
    });

    const renderBody = () => {
        if(tableData){
            return body.map(row => {
                const colData = head.map(col => {
                    return (
                        <td className={row[col.fieldId].className}>
                            { row[col.fieldId].content }
                        </td>
                    );
                })
                return <tr>{ colData }</tr> 
            })
        }
    }

    // const renderFieldBodyContent  = fields.map(field => {
    //     return (
    //             <td className={field.className}>
    //                 { field.content }
    //             </td>
    //     );
    // })

    

    return (
        <>
            <div className="flex flex-col mt-6" style={{ maxWidth: '76vw' }}>
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>{ renderHead }</tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                { renderBody() }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>
            </div>

        </>
    );
}

export default Table;