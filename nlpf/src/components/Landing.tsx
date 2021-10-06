import React from 'react';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

function Landing() {
  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-3"><br /></div>
          <div className="col-lg-6">
            <h1 className="font-weight-light">Caradhras</h1>
            <br />
            <p>
              Bienvenue sur l&apos;outil d&apos;évaluation de bien créé par
              l&apos;entreprise Caradhras.
              <br />
              Elle vous permettra d&apos;avoir une estimation précise
              en fonction de nombreux critères.
              <br />
              Explorez des biens similaires sur notre carte intégrée, le tout gratuitement.
            </p>
            <br />
            <Link className="nav-link" to="/formsearch">
              <Button type="submit">
                Evaluez votre bien !
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Landing;
