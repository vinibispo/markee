export type File = {
  id: string,
  name: string,
  content: string,
  active: boolean,
  status: 'saved' | 'saving' | 'editing'
}
