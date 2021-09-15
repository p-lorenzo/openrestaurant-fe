import React from "react";
import axios from "axios";
import MenuSection from "./MenuSection";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../logo.svg";

const baseURL = "http://127.0.0.1:8000/api/menu/active";

export default function Menu() {
    const [sections, setSections] = React.useState(null);

    React.useEffect(() => {
        axios.get(baseURL).then((response) => {
            setSections(response.data.sections);
        });
    }, []);
    console.log(sections);
    if (!sections) return null;


    return (
        <section className="menu">
            <img src={logo} className="menu-logo" alt="logo"/>
            {sections.map((section, index) => (
                <article className="menu-section" key={index}>
                    <h1 className="section-title">{section.title}</h1>
                    <MenuSection  entries={section.entries}/>
                </article>
            ))}
        </section>
    );
}
