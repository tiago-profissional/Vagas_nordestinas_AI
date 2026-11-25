import { create } from 'zustand'

type CVData = {
  name: string
  email: string
  phone: string
  location: string
  totalExperience: string
  skills: string[]
  experience: {
    title: string
    company: string
    period: string
    current: boolean
  }[]
  aiAnalysis: {
    text: string
    status: "success" | "warning"
  }[]
  score: number
}

type CVStore = {
  hasCV: boolean
  isLoading: boolean
  error: string | null
  cvData: CVData | null
  uploadCV: (file: File) => Promise<void>
  clearCV: () => void
}

export const useCVStore = create<CVStore>((set) => ({
  hasCV: false,
  isLoading: false,
  error: null,
  cvData: null,

  uploadCV: async (file: File) => {
    set({ isLoading: true, error: null })

    try {
      const formData = new FormData()
      formData.append("file", file)

      const res = await fetch("/api/upload-cv", {
        method: "POST",
        body: formData,
      })
      const data: unknown = await res.json()

      if (!res.ok) {
        const errorData =
          typeof data === "object" && data !== null
            ? data as { detalhe?: unknown; message?: unknown }
            : {}
        throw new Error(
          (typeof errorData.detalhe === "string" && errorData.detalhe) ||
            (typeof errorData.message === "string" && errorData.message) ||
            `Falha no envio (${res.status}).`,
        )
      }

      if (typeof data !== "object" || data === null || !("name" in data)) {
        throw new Error("A resposta do servidor não contém a análise do currículo.")
      }

      set({
        hasCV: true,
        isLoading: false,
        cvData: data as CVData,
      })
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : String(error),
      })
    }
  },

  clearCV: () => set({ hasCV: false, cvData: null, error: null })
}))