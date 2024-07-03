import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBiking, faRunning, faSwimmer, faWalking, faTrash, faSearch, faEdit } from "@fortawesome/free-solid-svg-icons";


const ListAtividade = () => {
  const [atividades, setAtividades] = useState([]);
  const [detalhesAtividade, setDetalhesAtividade] = useState({});
  const [filtroTipoAtividade, setFiltroTipoAtividade] = useState(null);
  const [atividadesSelecionadas, setAtividadesSelecionadas] = useState([]);

  useEffect(() => {
    const fetchAtividades = async () => {
      try {
        const response = await axios.get("http://localhost:4000/Atividades");
        setAtividades(response.data);
      } catch (error) {
        console.error("Erro ao buscar atividades:", error);
      }
    };

    fetchAtividades();
  }, []);

  const excluirAtividade = async (atividadeId) => {
    const confirmarExclusao = window.confirm("Tem certeza de que deseja excluir esta atividade?");

    if (confirmarExclusao) {
      try {
        await axios.delete(`http://localhost:4000/Atividades/${atividadeId}`);
        setAtividades(atividades.filter((atividade) => atividade._id !== atividadeId));
        setAtividadesSelecionadas(atividadesSelecionadas.filter(id => id !== atividadeId));
      } catch (error) {
        console.error("Erro ao excluir a atividade:", error);
      }
    }
  };

  const toggleDetalhes = (atividade) => {
    if (detalhesAtividade._id === atividade._id) {
      setDetalhesAtividade({});
    } else {
      setDetalhesAtividade(atividade);
    }
  };

  const handleFiltroTipoAtividadeChange = (event) => {
    const tipoSelecionado = event.target.value;
    setFiltroTipoAtividade(tipoSelecionado);
  };

  const handleSelecionarAtividade = (atividadeId) => {
    if (atividadesSelecionadas.includes(atividadeId)) {
      setAtividadesSelecionadas(atividadesSelecionadas.filter(id => id !== atividadeId));
    } else {
      if (atividadesSelecionadas.length < 2) {
        setAtividadesSelecionadas([...atividadesSelecionadas, atividadeId]);
      } else {
        alert("Você só pode selecionar até 2 atividades para comparar.");
      }
    }
  };

  const handleCompararAtividades = () => {
    if (atividadesSelecionadas.length === 2) {
      const atividadesParaComparar = atividades.filter(atividade => atividadesSelecionadas.includes(atividade._id));

      if (atividadesParaComparar[0].type === atividadesParaComparar[1].type) {
        alert(`COMPARAÇÃO DE ATIVIDADES:
          Atividade 1:
            Tipo: ${atividadesParaComparar[0].type}
            Data: ${new Date(atividadesParaComparar[0].date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
            ${atividadesParaComparar[0].type !== 'Natação' ? `Ganho de elevação: ${atividadesParaComparar[0].elevation} metros` : ''}
            Média: ${atividadesParaComparar[0].avg} km/h
            Tempo decorrido: ${atividadesParaComparar[0].time} min
            Distância: ${atividadesParaComparar[0].distance} km
  
          Atividade 2:
            Tipo: ${atividadesParaComparar[1].type}
            Data: ${new Date(atividadesParaComparar[1].date).toLocaleDateString("pt-BR", { timeZone: "UTC" })}
            ${atividadesParaComparar[1].type !== 'Natação' ? `Ganho de elevação: ${atividadesParaComparar[1].elevation} metros` : ''}
            Média: ${atividadesParaComparar[1].avg} km/h
            Tempo decorrido: ${atividadesParaComparar[1].time} min
            Distância: ${atividadesParaComparar[1].distance} km`);
      } else {
        alert("Você só pode comparar atividades do mesmo tipo.");
      }
    } else {
      alert("Você precisa selecionar exatamente duas atividades para comparar.");
    }
  };


  const atividadesFiltradas = filtroTipoAtividade ? atividades.filter(atividade => atividade.type === filtroTipoAtividade) : atividades;

  const atividadesOrdenadas = atividadesFiltradas.slice().sort((a, b) => new Date(b.date) - new Date(a.date));

  const iconesAtividade = {
    Ciclismo: faBiking,
    Corrida: faRunning,
    Caminhada: faWalking,
    Natação: faSwimmer,
  };

  const handleLimparSelecao = () => {
    setAtividadesSelecionadas([]);
  };

  return (
    <div className="bg-light p-4 position-relative">
      <h1 className="text-darkgrey">Minhas Atividades</h1>
      <div className="mb-3">
        <label htmlFor="filtroTipoAtividade" className="form-label"></label>
        <select id="filtroTipoAtividade" className="form-select" value={filtroTipoAtividade} onChange={handleFiltroTipoAtividadeChange}>
          <option value="">Selecione um filtro</option>
          <option value="Ciclismo">Ciclismo</option>
          <option value="Corrida">Corrida</option>
          <option value="Caminhada">Caminhada</option>
          <option value="Natação">Natação</option>
        </select>
      </div>
      <div className="mb-3">
        <button className="btn btn-primary me-2" onClick={handleCompararAtividades} disabled={atividadesSelecionadas.length !== 2}>
          Comparar
        </button>
        <Link to="/adicionarAtividade">
          <button className="btn btn-primary me-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus-lg" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2Z" />
            </svg> Adicionar Atividade
          </button>
        </Link>
        <button className="btn btn-secondary me-2" onClick={() => setFiltroTipoAtividade(null)}>Reiniciar Filtro</button>
        <button className="btn btn-secondary me-2" onClick={handleLimparSelecao}>Limpar Seleção</button>
      </div>


      <div className="row row-cols-4">
        {atividadesOrdenadas.map((atividade, index) => (
          <div key={index} className="col mb-4">
            <div className="border p-3 position-relative">
              <label>
                <input type="checkbox" className="filled-in" checked={atividadesSelecionadas.includes(atividade._id)} onChange={() => handleSelecionarAtividade(atividade._id)} />
                <span></span>
              </label>
              <div><strong>Tipo: </strong>
                {atividade.type} {iconesAtividade[atividade.type] && (
                  <FontAwesomeIcon icon={iconesAtividade[atividade.type]} size="1x" className="me-2" />
                )}
              </div>
              <strong>Data:</strong> {new Date(atividade.date).toLocaleDateString("pt-BR", { timeZone: "UTC" })} <br />
              {detalhesAtividade._id === atividade._id ? (
                <>
                  {atividade.type !== 'Natação' && (
                    <>
                      <strong>Ganho de elevação:</strong> {atividade.elevation} metros <br />
                    </>
                  )}
                  <strong>Média:</strong> {atividade.avg} km/h <br />
                  <strong>Tempo decorrido:</strong> {atividade.time} min <br />
                  <strong>Distância:</strong> {atividade.distance} km <br />
                </>
              ) : null}
              <Link to="#" onClick={() => excluirAtividade(atividade._id)} className="btn btn-floating btn-small waves-effect waves-light orange me-2">
                <FontAwesomeIcon icon={faTrash} />
              </Link>

              <Link to="#" onClick={() => toggleDetalhes(atividade)} className="btn btn-floating btn-small waves-effect waves-light grey me-2">
                <FontAwesomeIcon icon={faSearch} />
              </Link>

              <Link to={`/editarAtividade/${atividade._id}`} className="btn btn-floating btn-small waves-effect waves-light grey me-2">
                <FontAwesomeIcon icon={faEdit} />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListAtividade;
