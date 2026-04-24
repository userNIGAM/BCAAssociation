import { Edit2, Trash2 } from "lucide-react";

export default function TeamRow({ member, onEdit, onDelete }) {
  return (
    <tr className="border-t">
      <td className="p-3">{member.name || "No Name"}</td>

      <td>{member.designation || "No Designation"}</td>

      <td>{member.email}</td>

      <td className="flex gap-2">
        <button
          onClick={() => onEdit(member)}
          className="text-blue-600"
        >
          <Edit2 size={18} />
        </button>

        <button
          onClick={() => onDelete(member._id)}
          className="text-red-600"
        >
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}