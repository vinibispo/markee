import { Aside } from 'aside'
import { Content } from 'content'
import { useFiles } from 'resources/files/use-files'
import styled from 'styled-components'

export function App () {
  const {
    inputRef,
    files,
    handleUpdateFileContent,
    handleUpdateFileName,
    handleSelectFile,
    handleRemoveFile,
    handleCreateNewFile
  } = useFiles()
  return (
    <Main>
      <Aside onRemoveFile={handleRemoveFile} files={files} onNewFile={handleCreateNewFile} onSelectFile={handleSelectFile} />
      <Content inputRef={inputRef} onUpdateFileName={handleUpdateFileName} onUpdateFileContent={handleUpdateFileContent} file={files.find(file => file.active)} />
    </Main>
  )
}
const Main = styled.main`
  display: flex;
  height: 100vh;
`
