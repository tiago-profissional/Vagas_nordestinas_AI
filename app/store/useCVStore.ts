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

    const formData = new FormData()
    formData.append("file", file)

    const res = await fetch("/api/upload-cv", {
      method: "POST",
      body: formData,
    })

    const data = await res.json()

    set({
      hasCV: true,
      isLoading: false,
      cvData: data.cvData,
    })
  },

  clearCV: () => set({ hasCV: false, cvData: null, error: null })
}))