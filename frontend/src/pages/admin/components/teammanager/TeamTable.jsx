import TeamRow from "./TeamRow";

export default function TeamTable({ members, onEdit, onDelete }) {
  return (
    <table className="w-full bg-white rounded-xl shadow">
      <thead>
        <tr className="bg-gray-100">
          <th>Name</th>
          <th>Designation</th>
          <th>Email</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {members.map((m) => (
          <TeamRow key={m._id} member={m} onEdit={onEdit} onDelete={onDelete} />
        ))}
      </tbody>
    </table>
  );
}
