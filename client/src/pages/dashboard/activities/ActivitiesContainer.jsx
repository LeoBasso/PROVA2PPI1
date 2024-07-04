import Activity from "../../../components/pages/Activity";
import CreateActivityModal from "../../../components/pages/CreateActivityModal";
import { useFetchActivities } from "../../../queries/activities/activities";

const ActivitiesContainer = () => {

  const activity = useFetchActivities();
  console.log(activity);
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
        <div className=" max-w-screen-xl ">
          <div className="bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden border border-gray-300">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
              <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center md:space-x-3 flex-shrink-0">
                <CreateActivityModal />
                <h6>
                  {activity?.data?.length} Propriedade
                  {activity?.data?.length > 1 && "s"} encontrada
                  {activity?.data?.length > 1 && "s"}{" "}
                </h6>
              </div>
            </div>
            <div className="mx-auto">
              <table className="w-full text-sm text-left text-gray-500  border border-black300">
                <thead className="text-xs text-gray-300 uppercase bg-black border border-gray-300">
                  <tr>
                    <th scope="col" className="px-4 py-3 ">
                      <span className="sr-only">Actions</span>
                    </th>
                    <th scope="col" className="px-4 py-4">
                      Tipo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Distância
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Tempo
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Média
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Data
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Editar
                    </th>
                    <th scope="col" className="px-4 py-3">
                      Excluir
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-gray-800 text-gray-300">
                  {activity?.data?.map((activity) => {
                    return <Activity key={activity.id} activity={activity} />;
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default ActivitiesContainer;
