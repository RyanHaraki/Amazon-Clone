//rfce
import React from "react";
import "./Home.css";
import Product from "./Product";

function Home() {
  return (
    <div className="home">
      <div className="home-container">
        <img
          className="home-image"
          src="
https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg
"
        ></img>

        <div className="home-row">
          <Product
            id="1421412421"
            title={
              "The Lean Startup: How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses"
            }
            price={10.99}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg"
            }
            rating={5}
          />
          <Product
            id="4fd98qw498fe498f4ew"
            title="MINGER LED Strip Lights, 16.4ft RGB LED Light Strip 5050 LED Tape Lights"
            price={20.88}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/71aHa67y7cL._AC_SL1000_.jpg"
            }
            rating={4}
          />
        </div>

        <div className="home-row">
          <Product
            id="1414214"
            title="Samsung LC52309FWEM51 49' Curved LED Gaming Monitor"
            price={199.99}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/71Swqqe7XAL._AC_SX466_.jpg"
            }
            rating={4}
          />
          <Product
            id="4fe9ew4fw98f4w98eewfw"
            title="Fire TV Stick bundle with Echo Dot (3rd Gen - Charcoal)"
            price={89.98}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/61QSx5BvTwL._AC_SL1000_.jpg"
            }
            rating={5}
          />
          <Product
            id="4fe9ew4fw98f4w98eewfw"
            title="Keurig K-Compact Coffee Maker, Black"
            price={78.0}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/71nVdKlDksL._AC_SL1500_.jpg"
            }
            rating={5}
          />
        </div>

        <div className="home-row">
          <Product
            id="4fe9ew4fw98f4w98eewfw"
            title="Apple iPad Pro Tablet (128GB, Wi-Fi, 9.7 inch) Rose (Renewed)"
            price={518.95}
            image={
              "https://images-na.ssl-images-amazon.com/images/I/91QlrgIeLOL._AC_SL1500_.jpg"
            }
            rating={3}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
