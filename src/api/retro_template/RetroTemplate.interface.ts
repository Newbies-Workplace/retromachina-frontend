export interface RetroTemplateResponse {
    name: string
    desc: string | null
    columns: {
      color: string
      name: string
      desc: string | null
    }[]
}