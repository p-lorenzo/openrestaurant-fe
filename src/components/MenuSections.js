import React, { useState } from "react";
import axios from "axios";
import { withRouter, Link } from "react-router-dom";
import { DataGrid, GridRenderCellParams } from "@mui/x-data-grid";


const MenuSections = () => {
    const [sections, setSections] = useState(null);

    const columns = [
        { field: 'title', headerName: 'Titolo', editable: true, flex: 6 },
        { field: 'sorting', headerName: 'Ordinamento', editable: true, flex: 1, type: 'number' },
        {
            field: 'id', headerName: ' ', flex: 1, renderCell: (params: GridRenderCellParams) => (
                <Link to={"/menu-section-edit/"+params.value} className="btn btn-info">
                    Edit
                </Link>
            ),
        }
    ];

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/admin/menu-section").then((response) => {
            setSections(response.data);
        });
    }, []);

    if (!sections) {
        return (
            <h1>Nessuna sezione disponibile.</h1>
        );
    }

    return (
        <div>
            <section className="menu-sections">
                <DataGrid
                    editMode="row"
                    rows={sections}
                    columns={columns}
                    autoHeight="true"
                />
            </section>
        </div>
    );

};

export default withRouter(MenuSections);