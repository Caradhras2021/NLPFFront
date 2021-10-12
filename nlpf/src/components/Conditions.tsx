import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { BsFillCaretRightFill } from 'react-icons/bs'
    
export const Conditions = () => {

  const [show, setShow] = useState(false);
   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
  return (
    <div className="container">

      <a onClick={handleShow} style={{fontStyle: "italic", cursor: "pointer", color: "blue"}} ><BsFillCaretRightFill/>voir nos CGU</a>
   
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Conditions générales d'utilisations</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <p>Ceci est un texte vraiment très peu intéressant</p>
            <p>Regardons plutôt cette magnifique vidéo :</p>
            <iframe 
                width="560"
                height="315"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Fermer
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Conditions;
