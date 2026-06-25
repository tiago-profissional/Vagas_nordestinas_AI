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
    await new Promise(resolve => setTimeout(resolve, 2000))
    set({
      hasCV: true,
      isLoading: false,
      cvData: {
        name: 'João Silva',
        email: 'joaosilva@email.com',
        phone: '(11) 99999-9999',
        location: 'São Paulo, SP',
        totalExperience: '2 anos',
        skills: ['WordPress', 'HTML', 'CSS', 'JavaScript', 'PHP'],
        experience: [
          {
            title: 'Desenvolvedor Frontend',
            company: 'Agência Web Solutions',
            period: '03/2023 – Atual',
            current: true
          }
        ],
        aiAnalysis: [
          { text: 'Destaque mais resultados com números e métricas', status: 'success' },
          { text: 'Adicione mais palavras-chave técnicas relevantes', status: 'warning' },
          { text: 'Organize melhor suas experiências e projetos', status: 'warning' },
          { text: 'Inclua uma seção de certificações e cursos', status: 'success' },
        ],
        score: 72
      }
    })
  },

  clearCV: () => set({ hasCV: false, cvData: null, error: null })
}))