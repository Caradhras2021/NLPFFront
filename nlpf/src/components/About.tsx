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
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
        <div className="row align-items-center my-5">
          <div className="col-lg-5" style={{ textAlign: "right" }}>
            <h1 className="font-weight-light">Frontend</h1>
            <br />
            <h4>Avantages : </h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
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
            <h4>Avantages : </h4>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry s standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
