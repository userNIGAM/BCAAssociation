import { Edit2, Trash2 } from "lucide-react";

export default function TeamRow({ member, onEdit, onDelete }) {
  return (
    <tr className="border-t">
      <td>{member.name}</td>
      <td>{member.designation}</td>
      <td>{member.email}</td>
      <td className="flex gap-2">
        <button onClick={() => onEdit(member)}>
          <Edit2 size={18} />
        </button>
        <button onClick={() => onDelete(member._id)}>
          <Trash2 size={18} />
        </button>
      </td>
    </tr>
  );
}
