import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBiking, faRunning, faWalking, faSwimmer } from "@fortawesome/free-solid-svg-icons";

function EditarAtividade() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [atividade, setAtividade] = useState({
    type: "",
    distance: "",
    time: "",
    elevation: "",
    date: "",
    avg: ""
  });

  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState({});

  useEffect(() => {
    async function fetchAtividade() {
      try {
        const response = await axios.get(`http://localhost:4000/Atividades/${id}`);
        setAtividade(response.data);
      } catch (error) {
        console.error("Erro ao obter a atividade:", error);
      }
    }

    fetchAtividade();
  }, [id]);

  const clearMessageAndErrors = () => {
    setMensagem("");
    setErros({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAtividade((prevAtividade) => ({
      ...prevAtividade,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = {};
    if (!atividade.distance) {
      errors.distance = "A distância é obrigatória";
    }
    if (!atividade.time) {
      errors.time = "O tempo de movimentação é obrigatório";
    }
    if (!atividade.date) {
      errors.date = "A data é obrigatória";
    }
    if (atividade.type !== "Natação" && !atividade.elevation) {
      errors.elevation = "O ganho de elevação é obrigatório";
    } else if (atividade.type === "Natação" && atividade.elevation) {
      setAtividade((prevAtividade) => ({
        ...prevAtividade,
        elevation: "",
      }));
    }

    if (Object.keys(errors).length === 0) {
      const distancia = parseFloat(atividade.distance);
      const tempoMovimentacao = parseFloat(atividade.time);

      if (!isNaN(distancia) && !isNaN(tempoMovimentacao) && tempoMovimentacao !== 0) {
        const tempoEmHoras = tempoMovimentacao / 60;
        const velocidadeMedia = distancia / tempoEmHoras;

        const novaAtividade = { ...atividade, avg: velocidadeMedia.toFixed(2) };

        try {
          await axios.put(`http://localhost:4000/Atividades/${id}`, novaAtividade);
          setMensagem("Atividade atualizada com sucesso");
          setTimeout(() => {
            clearMessageAndErrors();
            navigate("/");
          }, 3000);
        } catch (error) {
          console.error("Erro ao atualizar a atividade:", error.response.data);
          setMensagem("Erro ao atualizar a atividade. Por favor, tente novamente.");
          setTimeout(clearMessageAndErrors, 3000);
        }
      } else {
        setAtividade((prevAtividade) => ({
          ...prevAtividade,
          avg: ""
        }));
      }
    } else {
      setErros(errors);
      setTimeout(clearMessageAndErrors, 3000);
    }
  };

  const renderIcon = () => {
    switch (atividade.type) {
      case "Ciclismo":
        return <FontAwesomeIcon icon={faBiking} />;
      case "Corrida":
        return <FontAwesomeIcon icon={faRunning} />;
      case "Caminhada":
        return <FontAwesomeIcon icon={faWalking} />;
      case "Natação":
        return <FontAwesomeIcon icon={faSwimmer} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-light p-4">
      <h1 className="text-darkgrey">Editar Atividade</h1>
      {mensagem && (
        <div className="alert alert-success" role="alert">
          {mensagem}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo de Atividade:</label>
          <div>
            {renderIcon()} {atividade.type}
          </div>
        </div>
        <div className="mb-3">
          <label className="form-label">Distância (km):</label>
          <input
            type="number"
            className="form-control"
            name="distance"
            value={atividade.distance}
            onChange={handleChange}
          />
          {erros.distance && (
            <div className="text-danger">{erros.distance}</div>
          )}
        </div>
        <div className="mb-3">
          <label className="form-label">Tempo de Movimentação (min):</label>
          <input
            type="number"
            className="form-control"
            name="time"
            value={atividade.time}
            onChange={handleChange}
          />
          {erros.time && (
            <div className="text-danger">{erros.time}</div>
          )}
        </div>
        {atividade.type !== "Natação" && (
          <div className="mb-3">
            <label className="form-label">Ganho de Elevação (metros):</label>
            <input
              type="number"
              className="form-control"
              name="elevation"
              value={atividade.elevation}
              onChange={handleChange}
            />
            {erros.elevation && (
              <div className="text-danger">{erros.elevation}</div>
            )}
          </div>
        )}
        <div className="mb-3">
          <label className="form-label me-1">Data:</label>
          {new Date(atividade.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
        </div>
        <button type="submit" className="btn btn-primary">
          Atualizar Atividade
        </button>
        <Link to="/" className="btn btn-secondary ms-2">
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default EditarAtividade;
