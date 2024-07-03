import DeleteActivityModal from "./DeletePropertyModal";
import UpdateActivityModal from "./UpdateActivityModal";

const Activity = (activity) => {
  return (
    <tr className="border-b dark:border-gray-700">
      <td className="px-4 py-3"></td>
      <td scope="row" className="px-4 py-3 font-medium  whitespace-nowrap">
        {activity.date}
      </td>

      <td className="px-4 py-3">{activity.type}</td>
      <td className="px-4 py-3">{activity.distance}</td>
      <td className="px-4 py-3">{activity.elevation}</td>
      <td className="px-4 py-3">{activity.time}</td>

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
