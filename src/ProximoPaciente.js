// ProximoPaciente.js
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';

const ProximoPaciente = ({ proximoPaciente, limparProximoPaciente }) => {
  const [showModal, setShowModal] = useState(false);

  const handleLimpar = () => {
    setShowModal(true);
  };

  const handleConfirmarLimpar = () => {
    limparProximoPaciente();
    setShowModal(false);
  };

  const handleFecharModal = () => {
    setShowModal(false);
  };

  return (
    <div className="component proximo-paciente">
      <h2>Próximo Paciente</h2>
      <div>
        <strong>Nome:</strong> {proximoPaciente.nome}
      </div>
      <div>
        <strong>Especialidade:</strong> {proximoPaciente.especialidade}
      </div>
      <Button variant="danger" onClick={handleLimpar} style={{ marginTop: '10px' }}>
        <i className="bi bi-trash"></i> Limpar
      </Button>
      <Modal show={showModal} onHide={handleFecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar Limpar</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Tem certeza de que deseja limpar o próximo paciente?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleFecharModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmarLimpar}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProximoPaciente;
