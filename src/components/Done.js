import React from 'react';

function Done({ success, text = '', links = [] }) {
  let html = null;

  if (success) {
    html = <p>Bravo!</p>;
  } else {
    html = (
      <>
        <p>{text}</p>
        <ul>
          {links.map((p) => (
            <li ley={p.link}>
              <a href={p.link}>{p.text}</a>
            </li>
          ))}
        </ul>
      </>
    );
  }

  return (
    <>
      <h2 className="text-2xl leading-8 my-8 font-semibold font-display text-gray-900 sm:text-3xl sm:leading-9">
        Tack för ditt svar!
      </h2>
      {html}
    </>
  );
}

export default Done;

/*
{
  "text": "Tack för att du deltog!",
  "links": [
    {
      "text": "Läs mer om coronaviruset i Stockholm på 117",
      "link": "https://www.1177.se/Stockholm/sa-fungerar-varden/varden-i-stockholms-lan/om-corona/"
    }
  ]
}
*/
