import React from "react";
import axios from "axios";
import MenuSection from "./MenuSection";
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from "../logo.svg";
import env from "react-dotenv";

export default function Menu() {
    const [sections, setSections] = React.useState(null);

    React.useEffect(() => {
        axios.get(env.API_URL + "/api/menu/active").then((response) => {
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
