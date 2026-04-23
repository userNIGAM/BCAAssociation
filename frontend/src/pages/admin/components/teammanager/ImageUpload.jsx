export default function ImageUpload({ form, setForm }) {
  return (
    <div className="mt-4">
      {form.image && (
        <img
          src={form.image}
          alt="preview"
          className="w-16 h-16 rounded-full mb-2"
        />
      )}

      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
      />

      <input
        type="file"
        onChange={(e) => {
          const file = e.target.files[0];
          if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
              setForm({ ...form, image: reader.result });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
    </div>
  );
}
