import TeamRow from "./TeamRow";

export default function TeamTable({
  members,
  onEdit,
  onDelete,
}) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Name</th>
            <th>Designation</th>
            <th>Email</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <TeamRow
              key={member._id}
              member={member}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}