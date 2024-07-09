import { useState } from "react";
import DeleteActivityModal from "./DeleteActivityModal";
import UpdateActivityModal from "./UpdateActivityModal";
import { Checkbox } from 'flowbite-react';
import { FaRunning, FaBiking, FaSwimmer, FaWalking } from 'react-icons/fa'; // Exemplos de ícones

const activityIcons = {
  Corrida: FaRunning,
  Ciclismo: FaBiking,
  Natação: FaSwimmer,
  Caminhada: FaWalking
};

const Activity = ({ activity, showDetails, onSelectActivity }) => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    onSelectActivity(activity, !isChecked); // Passa a atividade selecionada e o estado atualizado
  };

  const IconComponent = activityIcons[activity.type] || FaRunning; // Default icon if type is not found

  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3">
        <Checkbox checked={isChecked} onChange={handleCheckboxChange} />
      </td>
      <td className="px-4 py-3">
        <IconComponent className="mr-2" /> {activity.type}
      </td>
      <td className="px-4 py-3">{activity.distance} Km</td>
      {showDetails && (
        <>
          <td className="px-4 py-3">{activity.time} min</td>
          <td className="px-4 py-3">{activity.avg} Km/h</td>
          <td className="px-4 py-3">{activity.elevation} m</td>
          <td scope="row" className="px-4 py-3 font-medium whitespace-nowrap">
            {activity.date}
          </td>
        </>
      )}
      <td className="flex-1 m-0 p-3 justify-end">
        <UpdateActivityModal value={activity} />
      </td>
      <td className="flex-1 p-3">
        <DeleteActivityModal value={activity} />
      </td>
    </tr>
  );
};

export default Activity;
