import React, { useState, useEffect } from 'react';
import PacienteForm from './PacienteForm';
import FilaEspera from './FilaEspera';
import ProximoPaciente from './ProximoPaciente';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

const App = () => {
  const [pacientes, setPacientes] = useState({
    Ortopedia: [],
    Cardiologia: [],
    Psiquiatria: []
  });
  const [proximoPaciente, setProximoPaciente] = useState(null);

  useEffect(() => {
    const storedPacientes = JSON.parse(localStorage.getItem('pacientes')) || {
      Ortopedia: [],
      Cardiologia: [],
      Psiquiatria: []
    };
    const storedProximoPaciente = JSON.parse(localStorage.getItem('proximoPaciente')) || null;
    setPacientes(storedPacientes);
    setProximoPaciente(storedProximoPaciente);
  }, []);

  const adicionarPaciente = ({ nome, especialidade }) => {
    setPacientes(prevPacientes => {
      const updatedPacientes = { ...prevPacientes };
      const pacientesDaEspecialidade = Array.isArray(prevPacientes[especialidade]) ? prevPacientes[especialidade] : [];
      const pacienteExistente = pacientesDaEspecialidade.find(paciente => paciente.nome === nome);
  
      if (pacienteExistente) {
        alert(`O paciente ${nome} já está na lista de espera para ${especialidade}.`);
        return prevPacientes;
      }
  
      const novoPaciente = { nome, especialidade };
      updatedPacientes[especialidade] = [...pacientesDaEspecialidade, novoPaciente];
      localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
      console.log('Dados salvos no localStorage:', updatedPacientes);
      return updatedPacientes;
    });
  };
  

  const chamarProximo = (especialidade) => {
    const pacientesDaEspecialidade = pacientes[especialidade];
    if (pacientesDaEspecialidade.length > 0) {
      const proximo = pacientesDaEspecialidade[0];
      const novosPacientes = pacientesDaEspecialidade.slice(1);
      setPacientes(prevPacientes => {
        const updatedPacientes = { ...prevPacientes };
        updatedPacientes[especialidade] = novosPacientes;
        localStorage.setItem('pacientes', JSON.stringify(updatedPacientes));
        console.log('Dados salvos no localStorage:', updatedPacientes);
        return updatedPacientes;
      });
      setProximoPaciente(proximo);
      localStorage.setItem('proximoPaciente', JSON.stringify(proximo));
      alert(`Chamando próximo paciente de ${especialidade}: ${proximo.nome}`);
    } else {
      alert(`Não há pacientes na fila de ${especialidade}`);
    }
  };

  const limparProximoPaciente = () => {
    setProximoPaciente(null);
    localStorage.removeItem('proximoPaciente');
  };

  return (
    <div className="container">
      <h1 className="title">Agenda Médica</h1>
      <div className="component">
        <PacienteForm onSubmit={adicionarPaciente} />
      </div>
      <div className="fila-container">
        <FilaEspera pacientes={pacientes.Ortopedia} especialidade="Ortopedia" onClickChamar={() => chamarProximo("Ortopedia")} />
        <FilaEspera pacientes={pacientes.Cardiologia} especialidade="Cardiologia" onClickChamar={() => chamarProximo("Cardiologia")} />
        <FilaEspera pacientes={pacientes.Psiquiatria} especialidade="Psiquiatria" onClickChamar={() => chamarProximo("Psiquiatria")} />
        {proximoPaciente && <ProximoPaciente proximoPaciente={proximoPaciente} limparProximoPaciente={limparProximoPaciente} />}
      </div>
    </div>
  );
};

export default App;
