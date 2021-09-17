import React, { useRef, useState } from "react";
import { withRouter } from 'react-router-dom';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import Select from "react-select";
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

const AddEntryForm = (props) => {
    const form = useRef();
    const submitBtn = useRef();

    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState(0.0);
    const [quantity, setQuantity] = useState(0);
    const [section, setSection] = useState("null");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [menuSections, setMenuSections] = useState(null);

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/admin/menu-section").then((response) => {
            console.log(formatSections(response.data));
            setMenuSections(formatSections(response.data));
        });
    }, []);

    const formatSections = (sections) => {
        return sections.map((section) => (
            {
                value: section.id,
                label: section.title
            }
        ));
    };

    const onChangeName = (e) => {
        const name = e.target.value;
        console.log(name);
        setName(name);
    };

    const onChangeDescription = (e) => {
        const description = e.target.value;
        setDescription(description);
    };

    const onChangePrice = (e) => {
        const price = e.target.value;
        setPrice(price);
    };

    const onChangeQuantity = (e) => {
        const quantity = e.target.value;
        setQuantity(quantity);
    };

    const onChangeSection = (selectedSection) => {
        setSection(selectedSection);
    };

    const addMenuEntry = (e) => {
        e.preventDefault();

        setMessage("");
        setLoading(true);

        form.current.validateAll();

        if (submitBtn.current.context._errors.length === 0) {
            axios.post(process.env.REACT_APP_API_URL + "/api/admin/menu-entry/add", {
                "name": name,
                "description": description,
                "price": price,
                "quantity": quantity,
                "section": section.value
            }).then(() => {
                props.history.push("/menu-entries");
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
            <Form onSubmit={addMenuEntry} ref={form}>
                <div className="form-group">
                    <label htmlFor="name">Nome Pietanza</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="name"
                        value={name}
                        onChange={onChangeName}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="description">Descrizione</label>
                    <Input
                        type="text"
                        className="form-control"
                        name="description"
                        value={description}
                        onChange={onChangeDescription}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price">Prezzo</label>
                    <Input
                        name="price"
                        className="form-control"
                        type="number"
                        value={price}
                        onChange={onChangePrice}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="quantity">Quantità</label>
                    <Input
                        type="number"
                        className="form-control"
                        name="quantiy"
                        value={quantity}
                        onChange={onChangeQuantity}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="section">Sezione menu</label>
                    <Select
                        options={menuSections}
                        name="section"
                        value={section}
                        onChange={onChangeSection}
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

export default withRouter(AddEntryForm);