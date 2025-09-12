interface Field {
  id: string
  label: string
  type: string
  placeholder?: string
}

interface FormData {
  title: string
  fields: Field[]
}

export default function FormCanvas({ formData }: { formData: FormData }) {
  return (
    <div className="flex-1 p-4  ">
      <h2 className="text-xl font-bold mb-4">{formData.title}</h2>

      <form className="space-y-4">
        {formData.fields.map((field) => (
          <div key={field.id} className="flex flex-col">
            <label htmlFor={field.id} className="font-medium">
              {field.label}
            </label>

            {field.type === "textarea" ? (
              <textarea
                id={field.id}
                placeholder={field.placeholder}
                className="border rounded p-2"
              />
            ) : (
              <input
                id={field.id}
                type={field.type}
                placeholder={field.placeholder}
                className="border rounded p-2"
              />
            )}
          </div>
        ))}
      </form>
    </div>
  )
}
