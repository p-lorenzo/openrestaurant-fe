import React from "react";
import axios from "axios";
import MenuSection from "./MenuSection";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../logo.svg";
import { withRouter } from "react-router";

const Menu = () => {
    const [sections, setSections] = React.useState(null);

    React.useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + "/api/menu/example").then((response) => {
            setSections(response.data.sections);
        });
    }, []);

    if (!sections) {
        return (
            <h1>Ci dispiace per l'inconveniente, nessu menù è attualmente disponibile.</h1>
        );
    }
    
    return (
        <div className="container">
            <section className="menu col-md-6 col-sm-12">
                <img src={logo} className="menu-logo" alt="logo" />
                {sections.map((section, index) => (
                    <article className="menu-section" key={index}>
                        <h1 className="section-title">{section.title}</h1>
                        <MenuSection entries={section.entries} />
                    </article>
                ))}
            </section>
        </div>
    );
}

export default withRouter(Menu);
