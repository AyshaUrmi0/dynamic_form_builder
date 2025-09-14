import { FormBuilder } from "./components"
import formData from "@/data/formSchema.json"

export default function Home() {
  return <FormBuilder formData={formData} />
}
