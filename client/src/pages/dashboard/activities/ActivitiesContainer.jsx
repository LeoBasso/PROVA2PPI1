import { useState } from "react";
import Activity from "../../../components/pages/Activity";
import CreateActivityModal from "../../../components/pages/CreateActivityModal";
import { useFetchActivities } from "../../../queries/activities/activities";
import CompareActivitiesModal from '../../../components/pages/CompareActivitiesModal';
import { toast } from "react-toastify";

const ActivitiesContainer = () => {
  const { data, error, isLoading } = useFetchActivities();
  const [showDetails, setShowDetails] = useState(false);
  const [selectedActivities, setSelectedActivities] = useState([]);
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  console.log(selectedActivities);
  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro ao carregar atividades: {error.message}</div>;
  }

  const activity = data;
  console.log(activity);

  const handleSelectActivity = (activity, isSelected) => {
    if (isSelected) {
      if (selectedActivities.length < 2) {
        setSelectedActivities([...selectedActivities, activity]);
      }
    } else {
      setSelectedActivities(selectedActivities.filter(a => a.id !== activity.id));
    }
  };

  if (activity?.length <= 0) {
    return (
      <div className="flex">
        <section>
          <div className="mx-auto max-w-screen-xl ">
            <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
              <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                  <CreateActivityModal />
                  <h6>Nenhuma propriedade encontrada</h6>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="flex">
      <section>
        <div className="max-w-screen-xl">
          <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                <CreateActivityModal />
                <CompareActivitiesModal activities={selectedActivities}/>
                {/* <button onClick={handleCompare} disabled={selectedActivities.length !== 2} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  Comparar
                </button> */} 
                <h6>
                  {activity?.length} Atividade
                  {activity?.length > 1 ? "s" : ""} encontrada
                </h6>
              </div>
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500 border border-black300">
                <thead className="text-xs text-gray-300 uppercase bg-black border border-gray-300">
                  <tr>
                  <th scope="col" className="px-4 py-4">
                    </th>
                    <th scope="col" className="px-4 py-4">
                      Tipo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Distância
                    </th>
                    {showDetails && (
                      <>
                        <th scope="col" className="px-4 py-3">
                          Tempo
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Média
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Elevação
                        </th>
                        <th scope="col" className="px-4 py-3">
                          Data
                        </th>
                      </>
                    )}
                    <th scope="col" className="px-4 py-3">
                      Editar
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-300">
                  {activity?.map((activity) => (
                    <Activity 
                      key={activity.id} 
                      activity={activity} 
                      showDetails={showDetails} 
                      onSelectActivity={handleSelectActivity}
                    />
                  ))}
                </tbody>
              </table>
              <div className="flex justify-end p-4">
                <button onClick={() => setShowDetails(!showDetails)} className="text-blue-100">
                  {showDetails ? "Mostrar menos" : "Mostrar mais"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      {isCompareModalOpen && (
        <CompareActivitiesModal 
          activities={selectedActivities} 
          onClose={() => setIsCompareModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default ActivitiesContainer;
