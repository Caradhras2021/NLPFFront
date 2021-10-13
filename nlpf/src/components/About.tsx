import React from 'react';

function About() {
  return (
    <div className="about">
      <div className="container">
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://sourcedexter.com/wp-content/uploads/2017/09/flask-python.png"
              alt=""
            />
          </div>
          <div className="col-lg-5" style={{ textAlign: "left" }}>
            <h1 className="font-weight-light">Backend</h1>
            <br />
            <h4>Avantages : </h4>
            <p>
              Flask est un framework avec de nombreuses ressources disponibles
              (vidéos yt, documentation claire). Il utilise également la bibliothèque
              originelle de Python qui est un langage à typage fort dynamique 
              qui permet une certaine flexibilité dans le code.
            </p>
            <h4>Inconvénients : </h4>
            <p>
              L’utilisation des arguments optionnels dans l’url des requêtes a été
              compliquée à prendre en main.
            </p>
          </div>
        </div>
        <div className="row align-items-center my-5">
          <div className="col-lg-5" style={{ textAlign: "right" }}>
            <h1 className="font-weight-light">Frontend</h1>
            <br />
            <h4>Avantages : </h4>
            <p>
              Une grande documentation est à disposition sur les modules, ressources, bibliothèques.
              Intégrer de nombreuses bibliothèques nous a simplifié l’accomplissement de nos features : Bootstrap notamment.
            </p>
            <h4>Inconvénients : </h4>
            <p>
              Peu de documentation sur les erreurs du typage des props.
            </p>
          </div>
          <div className="col-lg-7">
            <img
              style={ {maxWidth: '50%' }}
              className="img-fluid rounded mb-4 mb-lg-0"
              src="http://logos-download.com/wp-content/uploads/2016/09/React_logo_logotype_emblem.png"
              alt=""
            />
          </div>
        </div>
        <div className="row align-items-center my-5">
          <div className="col-lg-7">
            <img
              className="img-fluid rounded mb-4 mb-lg-0"
              src="https://citywebconsultants.co.uk/sites/default/files/inline-images/mongo-medium.png"
              alt=""
            />
          </div>
          <div className="col-lg-5" style={{ textAlign: "left" }}>
            <h1 className="font-weight-light">Data</h1>
            <br />
            <h4>Critique : </h4>
            <p>
              La base de données relationnelle aurait été plus adéquate car elle 
              aurait amélioré la performance de l’application: la récupération des 
              objets était longue et la recherche par objet n’était pas optimisée.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
