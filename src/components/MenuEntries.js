import React, { useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { DataGrid } from "@mui/x-data-grid";

const MenuEntries = (props) => {
    const [menuEntries, setMenuEntries] = useState(null);

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/admin/menu-entry").then((response) => {
            setMenuEntries(response.data);
        });
    }, []);

    const handleClick = () => {
        props.history.push("/new-menu-entry");
        window.location.reload();
    };

    const handleDelete = (e) => {
        axios.delete(process.env.REACT_APP_API_URL + "/api/admin/menu-entry/delete/" + e.target.attributes["data-id"].nodeValue);
        let rows = [...menuEntries];
        rows.splice(rows.findIndex(function(i){
            return i.id === e.target.attributes["data-id"].nodeValue;
        }), 1);
        setMenuEntries(rows);
    };

    const columns = [
        { field: 'name', headerName: 'Nome', editable: true, flex: 2 },
        { field: 'description', headerName: 'Descrizione', editable: true, flex: 3 },
        { field: 'price', headerName: 'Prezzo', type: 'number', editable: true, flex: 1 },
        { field: 'quantity', headerName: 'Quantità', editable: true, flex: 1, type: 'number' },
        {
            field: 'id', headerName: ' ', flex: 1, renderCell: (params: GridRenderCellParams) => (
                <div className="btn-group">
                    <Link to={"/menu-entry-edit/" + params.value} className="btn btn-info">
                        Modifica
                    </Link>
                    <button data-id={params.value} className="btn btn-danger" onClick={(e) => { handleDelete(e) }}>
                        Elimina
                    </button>
                </div>
            ),
        }
    ];

    if (!menuEntries) {
        return (
            <h1>Ci dispiace per l'inconveniente, nessu menù è attualmente disponibile.</h1>
        );
    }

    return (
        <div>
            <button className="btn btn-info" onClick={handleClick}>Nuova Pietanza</button>
            <section className="menu-entries">
                <DataGrid
                    rows={menuEntries}
                    columns={columns}
                    autoHeight="true"
                />
            </section>
        </div>
    );
};

export default withRouter(MenuEntries);