import React, { useState } from 'react';
import { Button, Form, Row, Col } from 'react-bootstrap';

const PacienteForm = ({ onSubmit }) => { 
  const [nome, setNome] = useState('');
  const [especialidade, setEspecialidade] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ nome, especialidade });
    setNome('');
    setEspecialidade('');
  };

  return (
    <Form onSubmit={handleSubmit} style={{ width: '100%' }}>
      <Row className="mb-3">
        <Col xs={6}>
          <Form.Group controlId="formNome">
            <Form.Label>Nome do Paciente</Form.Label>
            <Form.Control
              type="text"
              placeholder="Digite o nome do paciente"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
          </Form.Group>
        </Col>

        <Col xs={4}>
          <Form.Group controlId="formEspecialidade">
            <Form.Label>Especialidade Médica</Form.Label>
            <Form.Control
              as="select"
              value={especialidade}
              onChange={(e) => setEspecialidade(e.target.value)}
            >
              <option value="">Selecione a especialidade</option>
              <option value="Ortopedia">Ortopedia</option>
              <option value="Cardiologia">Cardiologia</option>
              <option value="Psiquiatria">Psiquiatria</option>
            </Form.Control>
          </Form.Group>
        </Col>

        <Col xs={2} className="d-flex align-items-end">
          <Button variant="primary" type="submit">
            Adicionar
          </Button>
        </Col>
      </Row>
    </Form>
  );
};

export default PacienteForm;
