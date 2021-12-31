import { useEffect, useRef, useState, ChangeEvent, MouseEvent } from 'react'
import { File } from './types'
import { v4 as uuid } from 'uuid'
import localforage from 'localforage'

export function useFiles () {
  const inputRef = useRef<HTMLInputElement>(null)
  const [files, setFiles] = useState<File[]>([])

  const handleCreateNewFile = () => {
    inputRef.current?.focus()
    const newFile: File = { id: uuid(), name: 'Sem título', content: '', active: true, status: 'saved' }
    setFiles(f => f.map(file => ({ ...file, active: false })).concat(newFile))
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

  const handleSelectFile = (id: string) => (e: MouseEvent) => {
    e.preventDefault()
    setFiles(f => f.map(file => ({ ...file, active: file.id === id })))
  }
  const handleRemoveFile = (id: string) => (e: MouseEvent) => {
    e.stopPropagation()
    setFiles(f => f.filter(file => id !== file.id))
  }
  useEffect(() => {
    localforage.setItem('@Markee:files', files)
  }, [files])

  useEffect(() => {
    const getFromStorage = async () => {
      const files = await localforage.getItem<File[]>('@Markee:files')
      if (files && files.length > 0) {
        setFiles(files)
        return
      }
      handleCreateNewFile()
    }
    getFromStorage()
  }, [])
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

  return {
    inputRef,
    files,
    handleCreateNewFile,
    handleRemoveFile,
    handleSelectFile,
    handleUpdateFileName,
    handleUpdateFileContent
  }
}
