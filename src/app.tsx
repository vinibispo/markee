import { Aside } from 'aside'
import { Content } from 'content'
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react'
import { File } from 'resources/files/types'
import styled from 'styled-components'
import { v4 as uuid } from 'uuid'

export function App () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>

    function updateStatus () {
      const file = files.find(file => file.active === true)

      if (!file || file.status !== 'editing') {
        return
      }

      timer = setTimeout(() => {
        setFiles(files => files.map(file => {
          if (file.active) {
            return {
              ...file,
              status: 'saving'
            }
          }

          return file
        }))

        setTimeout(() => {
          setFiles(files => files.map(file => {
            if (file.active) {
              return {
                ...file,
                status: 'saved'
              }
            }

            return file
          }))
        }, 300)
      }, 300)
    }

    updateStatus()

    return () => clearTimeout(timer)
  }, [files])

  const handleNewFile = () => {
    inputRef.current?.focus()
    const newFile: File = { id: uuid(), name: 'Sem título', content: '', active: true, status: 'saved' }
    setFiles(f => [...f.map(file => ({ ...file, active: false })), newFile])
  }

  const handleUpdateFileName = (id: string) => (e: ChangeEvent<HTMLInputElement>) => {
    setFiles(f => f.map(file => {
      if (file.id === id) {
        return { ...file, name: e.target.value, status: 'editing' }
      }
      return file
    }
    ))
  }

  const handleUpdateFileContent = (id: string) => (e: ChangeEvent<HTMLTextAreaElement>) => {
    setFiles(f => f.map(file => {
      if (file.id === id) {
        return { ...file, content: e.target.value, status: 'editing' }
      }
      return file
    }
    ))
  }

  const handleSelectFile = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    setFiles(f => f.map(file => ({ ...file, active: file.id === id })))
  }
  const handleRemoveFile = (id: string) => (e: MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation()
    setFiles(f => f.filter(file => id !== file.id))
  }
  return (
    <Main>
      <Aside onRemoveFile={handleRemoveFile} files={files} onNewFile={handleNewFile} onSelectFile={handleSelectFile} />
      <Content inputRef={inputRef} onUpdateFileName={handleUpdateFileName} onUpdateFileContent={handleUpdateFileContent} file={files.find(file => file.active)} />
    </Main>
  )
}
const Main = styled.main`
  display: flex;
  height: 100vh;
`
