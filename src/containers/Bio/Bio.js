import React from "react";
import "./Bio.css";

import headshot from "../../img/headshot.png";

export default class Bio extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="bio-container">
        <div className="bio">
          <div className="img-container">
            <img
              src={headshot}
              height="450px"
              alt=""
            />
          </div>

          <div className="text">
            <div className="heading">RECENT PUBLIC COMMISSIONS</div>
            <div className="element">
              <h4>Cowbell Brewery, Blyth Ontario | 2018</h4>
              <p>Painting for main dining room</p>
            </div>
            <div className="element">
              <h4>Blyth Festival Theatre, Blyth Ontario | 2017</h4>
              <p>Painting used for new entrance to theatre</p>
            </div>
          </div>
          <div className="text">
            <div className="heading">USE OF PAINTINGS</div>
            <div className="element">
              <h4>Blyth Festival, Blyth Ontario | 2017</h4>
              <p>Painting used on festival poster and PR materials</p>
            </div>
            <div className="element">
              <h4>Alice Munroe Festival, Wingham Ontario | 2015</h4>
              <p>Painting used on festival poster and PR materials</p>
            </div>
          </div>
          <div className="text">
            <div className="heading">RECENT SHOWS</div>
            <div className="element">
              <h4>2022</h4>
              <p>
                Solo Show – “A Closer Look” Blyth Festival Art Gallery, Blyth,
                Ontario
              </p>
            </div>
            <div className="element">
              <h4>2015</h4>
              <p>
                Solo Show – “A Trick of the Light” Blyth Festival Art Gallery,
                Blyth, Ontario
              </p>
            </div>
            <div className="element">
              <h4>2010</h4>
              <p>
                Solo Show – “A Sense of Place” Marten Arts Gallery, Bayfield
                Ontario
              </p>
            </div>
            <div className="element">
              <h4>2002</h4>
              <p>
                Three Person Show, “The Selective Eye” Blyth Festival Art
                Gallery, Blyth, Ontario
              </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
