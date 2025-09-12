interface Field {
  id: string
  label?: string
  name?: string
  type: string
  placeholder?: string
  required?: boolean
  options?: string[]
  content?: string
  columnWidth?: string
}

interface FormData {
  id: string
  version: string
  name: string
  toEmail?: string
  subject?: string
  successMessage?: string
  fields: Field[]
}

export default function FormCanvas({ formData }: { formData: FormData }) {
  return (
    <div className="flex-1 p-4 ">
      <h2 className="text-xl font-bold mb-4">{formData.name}</h2>

      <form className="flex flex-wrap gap-4">
        {formData.fields.map((field) => {
          const widthClass = field.columnWidth ? `w-[${field.columnWidth}]` : "w-full"

          return (
            <div key={field.id} className={`${widthClass} flex flex-col`}>
              {field.label && (
                <label htmlFor={field.id} className="font-medium mb-1">
                  {field.label} {field.required && <span className="text-red-500">*</span>}
                </label>
              )}

              {/* Text, Email, Date, Time, File */}
              {["text", "email", "date", "time", "file"].includes(field.type) && (
                <input
                  id={field.id}
                  name={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  required={field.required}
                  className="border rounded p-2 w-full"
                />
              )}

              {/* Select */}
              {field.type === "select" && (
                <select
                  id={field.id}
                  name={field.name}
                  required={field.required}
                  className="border rounded p-2 w-full"
                  defaultValue=""
                >
                  <option value="" disabled>
                    {field.placeholder || "Select an option"}
                  </option>
                  {field.options?.map((opt, idx) => {
                    const [label, value] = opt.split("=")
                    return (
                      <option key={idx} value={value?.trim()}>
                        {label.trim()}
                      </option>
                    )
                  })}
                </select>
              )}

              {/* Radio */}
              {field.type === "radio" &&
                field.options?.map((opt, idx) => {
                  const [label, value] = opt.split("=")
                  return (
                    <label key={idx} className="inline-flex items-center mr-4">
                      <input
                        type="radio"
                        name={field.name}
                        value={value?.trim()}
                        className="mr-1"
                        required={field.required}
                      />
                      {label.trim()}
                    </label>
                  )
                })}

              {/* Checkbox */}
              {field.type === "checkbox" &&
                field.options?.map((opt, idx) => {
                  const [label, value] = opt.split("=")
                  return (
                    <label key={idx} className="inline-flex items-center mr-4">
                      <input
                        type="checkbox"
                        name={field.name}
                        value={value?.trim()}
                        className="mr-1"
                        required={field.required}
                      />
                      {label.trim()}
                    </label>
                  )
                })}

              {/* Acceptance / Content */}
              {field.type === "acceptance" && (
                <div className="border rounded p-2" dangerouslySetInnerHTML={{ __html: field.content || "" }} />
              )}
            </div>
          )
        })}
      </form>
    </div>
  )
}
