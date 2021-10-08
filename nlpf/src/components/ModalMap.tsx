import React, {useState} from 'react';
import { Button, Modal } from 'react-bootstrap';
import { Acquisition } from './Table';
import CustomMap from './Map';
    
export const ModalMap = ({ data, elt }: { data: Acquisition[], elt: Acquisition }) => {

  const [show, setShow] = useState(false);
   
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
   
  return (
    <div className="container">
   
      <Button variant="primary" onClick={handleShow}>
        See Map
      </Button>
   
      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{ elt.address + ' ' + elt.city + ' ' + elt.zip }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <CustomMap data={data} elt={elt}/>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
   
export default ModalMap;
