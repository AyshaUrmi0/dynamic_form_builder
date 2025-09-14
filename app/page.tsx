import FormBuilder from "./components/FormBuilder"
import formData from "@/data/formSchema.json"

export default function Home() {
  return <FormBuilder formData={formData} />
}
