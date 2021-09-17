import React from "react";

export default function MenuSection({entries}) {
    return (
        <section className="menu-section">
            {Object.values(entries).map((entry, index) => (
                <article className="menu-entry" key={index}>
                    <h3 className="entry-name">{entry.name}</h3>
                    <strong className="entry-price">€{entry.price}</strong>
                    <p className="entry-description">{entry.description}</p>
                </article>
            ))}
        </section>
    );
}