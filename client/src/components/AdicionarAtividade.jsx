import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBiking,
  faRunning,
  faWalking,
  faSwimmer,
} from "@fortawesome/free-solid-svg-icons";

function AdicionarAtividade() {
  const navigate = useNavigate();

  const [atividade, setAtividade] = useState({
    type: "",
    distance: "",
    time: "",
    elevation: "",
    date: "",
    avg: "",
  });

  const [mensagem, setMensagem] = useState("");
  const [erros, setErros] = useState({});

  const clearMessage = () => {
    setMensagem("");
  };

  const clearErrors = () => {
    setErros({});
  };

  const handleTypeChange = (type) => {
    setAtividade((prevAtividade) => ({
      ...prevAtividade,
      type: type,
      elevation: type === "Natação" ? "" : prevAtividade.elevation,
    }));
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
    if (!atividade.type) {
      errors.type = "O tipo de atividade é obrigatório";
    }
    if (!atividade.distance) {
      errors.distance = "A distância é obrigatória";
    }
    if (!atividade.time) {
      errors.time = "O tempo de movimentação é obrigatório";
    }
    if (!atividade.date) {
      errors.date = "A data é obrigatória";
    }

    if (Object.keys(errors).length === 0) {
      const distancia = parseFloat(atividade.distance);
      const tempoMovimentacao = parseFloat(atividade.time);

      if (
        !isNaN(distancia) &&
        !isNaN(tempoMovimentacao) &&
        tempoMovimentacao !== 0
      ) {
        const tempoEmHoras = tempoMovimentacao / 60;
        const velocidadeMedia = distancia / tempoEmHoras;

        const novaAtividade = { ...atividade, avg: velocidadeMedia.toFixed(2) };

        try {
          await axios.post("http://localhost:4000/activity", novaAtividade);
          setMensagem("Atividade sendo adicionada, aguarde...");
          setTimeout(() => {
            clearMessage();
            navigate("/");
          }, 3000);
        } catch (error) {
          console.error("Erro ao adicionar a atividade:", error.response.data);
          setMensagem(
            "Erro ao adicionar a atividade. Por favor, tente novamente."
          );
          setTimeout(clearMessage, 3000);
        }
      } else {
        setAtividade((prevAtividade) => ({
          ...prevAtividade,
          avg: "",
        }));
      }
    } else {
      setErros(errors);
      setTimeout(clearErrors, 3000);
    }
  };

  return (
    <div className="bg-light p-4">
      <h1 className="text-darkgrey">Adicionar Nova Atividade</h1>
      {mensagem && (
        <div className="alert alert-success" role="alert">
          {mensagem}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Tipo de Atividade:</label>
          <div>
            <FontAwesomeIcon
              icon={faBiking}
              title="Ciclismo"
              size="2x"
              onClick={() => handleTypeChange("Ciclismo")}
              style={{
                cursor: "pointer",
                marginRight: "10px",
                color: atividade.type === "Ciclismo" ? "orange" : "gray",
              }}
            />
            <FontAwesomeIcon
              icon={faRunning}
              title="Corrida"
              size="2x"
              onClick={() => handleTypeChange("Corrida")}
              style={{
                cursor: "pointer",
                marginRight: "10px",
                color: atividade.type === "Corrida" ? "orange" : "gray",
              }}
            />
            <FontAwesomeIcon
              icon={faWalking}
              title="Caminhada"
              size="2x"
              onClick={() => handleTypeChange("Caminhada")}
              style={{
                cursor: "pointer",
                marginRight: "10px",
                color: atividade.type === "Caminhada" ? "orange" : "gray",
              }}
            />
            <FontAwesomeIcon
              icon={faSwimmer}
              title="Natação"
              size="2x"
              onClick={() => handleTypeChange("Natação")}
              style={{
                cursor: "pointer",
                color: atividade.type === "Natação" ? "orange" : "gray",
              }}
            />
          </div>
          {erros.type && <div className="text-danger">{erros.type}</div>}
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
          {erros.time && <div className="text-danger">{erros.time}</div>}
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
          <label className="form-label">Data:</label>
          <input
            type="date"
            className="form-control"
            name="date"
            value={atividade.date}
            onChange={handleChange}
          />
          {erros.date && <div className="text-danger">{erros.date}</div>}
        </div>
        <button type="submit" className="btn btn-primary">
          Adicionar Atividade
        </button>
        <Link to="/" className="btn btn-secondary ms-2">
          Cancelar
        </Link>
      </form>
    </div>
  );
}

export default AdicionarAtividade;
