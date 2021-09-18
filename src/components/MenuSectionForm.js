import React, { useRef, useState } from "react";
import { withRouter } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import axios from "axios";

const required = (value) => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Campo obbligatorio!
            </div>
        );
    }
};

const MenuSectionForm = (props) => {
    const form = useRef();
    const submitBtn = useRef();

    const [title, setTitle] = useState("");
    const [sorting, setSorting] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/admin/menu-section/" + props.match.params.value).then((response) => {
            setTitle(response.data.title);
            setSorting(response.data.sorting);
        });
    }, [props]);

    const onChangeTitle = (e) => {
        const title = e.target.value;
        setTitle(title);
    };

    const onChangeSorting = (e) => {
        const sorting = e.target.value;
        setSorting(sorting);
    };

    const MenuSectionEdit = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (submitBtn.current.context._errors.length === 0) {
            axios.post(process.env.REACT_APP_API_URL + "/api/admin/menu-section/update/" + props.match.params.value, {
                "title": title,
                "sorting" : sorting,
            }).then(() => {
                props.history.push("/menu-sections");
                window.location.reload();
            }, (error) => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setLoading(false);
                setMessage(resMessage);
            }
            );

        } else {
            setLoading(false);
        }
    };

    return (
        <div className="col-md-12">
            <Form onSubmit={MenuSectionEdit} ref={form}>
                <div className="form-group">
                    <label htmlFor="name">Nome Pietanza</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="title"
                        value={title}
                        onChange={onChangeTitle}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrizione</label>
                    <Input
                        type="number"
                        className="form-control"
                        name="sorting"
                        value={sorting}
                        onChange={onChangeSorting}
                    />
                </div>

                <div className="form-group">
                    <button className="btn btn-primary btn-block" disabled={loading}>
                        {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                        )}
                        <span>Salva</span>
                    </button>
                </div>

                {message && (
                    <div className="form-group">
                        <div className="alert alert-danger" role="alert">
                            {message}
                        </div>
                    </div>
                )}
                <CheckButton style={{ display: "none" }} ref={submitBtn} />
            </Form>

        </div>
    );
};

export default withRouter(MenuSectionForm);