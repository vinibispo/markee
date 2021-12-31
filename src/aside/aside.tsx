import { File } from 'resources/files/types'
import markeeLogo from './markee-logo.png'
import * as icon from 'ui/icons'
import * as S from './aside-styles'
import { MouseEvent } from 'react'

type AsideProps = {
    files: File[],
    onNewFile: () => void
    onSelectFile: (id: string) => (e: MouseEvent<HTMLAnchorElement>) => void
    onRemoveFile: (id: string) => (e: MouseEvent<HTMLAnchorElement>) => void
  }
export function Aside ({ files, onNewFile, onSelectFile, onRemoveFile }: AsideProps) {
  return (
    <S.Aside>
      <header>
        <S.H1>
          <S.LogoLink href='/'>
            <S.Img src={markeeLogo} alt='Markee.' />
          </S.LogoLink>
        </S.H1>
      </header>

      <S.H2>
        <span>Arquivos</span>
      </S.H2>

      <S.Button onClick={onNewFile}>
        <icon.PlusDark /> Adicionar arquivo
      </S.Button>

      <S.FileList>
        {files.map(file => (
          <S.FileListItem key={file.id}>
            <S.FileItemLink href={`/file/${file.id}`} onClick={onSelectFile(file.id)} active={file.active}>
              {file.name}
            </S.FileItemLink>

            {file.active && <S.StatusIconStyled status={file.status} />}

            {!file.active && (
              <S.RemoveButton onClick={onRemoveFile(file.id)} title={`Remover o arquivo ${file.name}`}>
                <S.RemoveIcon />
              </S.RemoveButton>
            )}
          </S.FileListItem>
        ))}
      </S.FileList>
    </S.Aside>
  )
}
