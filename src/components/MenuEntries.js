import React, {useState} from "react";
import axios from "axios";
import {withRouter} from "react-router";
import {DataGrid} from "@mui/x-data-grid";

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

    const columns = [
        { field: 'id', headerName: 'ID', flex: 2 },
        { field: 'name', headerName: 'Nome', editable: true, flex: 2 },
        { field: 'description', headerName: 'Descrizione', editable: true, flex: 3 },
        { field: 'price', headerName: 'Prezzo', type: 'number', editable: true, flex: 1 },
        { field: 'quantity', headerName: 'Quantità', editable: true, flex: 1, type: 'number'  },
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