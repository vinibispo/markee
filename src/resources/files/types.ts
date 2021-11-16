export type Status = 'saved' | 'saving' | 'editing'
export type File = {
  id: string,
  name: string,
  content: string,
  active: boolean,
  status: Status
}
