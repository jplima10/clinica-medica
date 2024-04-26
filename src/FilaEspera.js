import React from 'react';

const FilaEspera = ({ pacientes, especialidade, onClickChamar }) => {
  const pacientesFiltrados = Array.isArray(pacientes) ? pacientes.filter(paciente => paciente.especialidade === especialidade) : [];

  return (
    <div className="component fila-espera">
      <h2 style={{ marginBottom: '20px' }}>{especialidade}</h2>
      {pacientesFiltrados.length > 0 ? (
        pacientesFiltrados.map((paciente, index) => (
          <div key={index} className="nome-paciente">
            {index + 1}º - {paciente.nome}
          </div>
        ))
      ) : (
        <div style={{textAlign: 'center', color: 'red' }}>Sem pacientes</div>
      )}
      {pacientesFiltrados.length > 0 && (
        <button className="button" onClick={onClickChamar}>Chamar Próximo</button>
      )}
    </div>
  );
};

export default FilaEspera;
