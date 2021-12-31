import { ChangeEvent, RefObject } from 'react'
import * as S from './content-styles'
import { marked } from 'marked'
import 'highlight.js/styles/github.css'
import DOMPurify from 'dompurify'
import { File } from 'resources/files/types'
import('highlight.js').then(hljs => {
  const highlight = hljs.default

  marked.setOptions({
    highlight: (code, language) => {
      if (language && highlight.getLanguage(language)) {
        return highlight.highlight(code, { language }).value
      }
      return highlight.highlightAuto(code).value
    }
  })
})

type ContentProps = {
    inputRef: RefObject<HTMLInputElement>,
    onUpdateFileName: (id: string) => (e: ChangeEvent<HTMLInputElement>) => void,
    onUpdateFileContent: (id: string) => (e: ChangeEvent<HTMLTextAreaElement>) => void,
    file?: File
  }
export function Content ({ inputRef, onUpdateFileName, onUpdateFileContent, file }: ContentProps) {
  if (!file) return null
  return (
    <S.ContentWrapper>
      <S.Header>
        <S.Input autoFocus value={file.name} ref={inputRef} onChange={onUpdateFileName(file.id)} />
      </S.Header>
      <S.ContentSection>
        <S.Textarea value={file.content} placeholder='Digite aqui seu markdown' onChange={onUpdateFileContent(file.id)} />
        <S.Article dangerouslySetInnerHTML={{ __html: marked(DOMPurify.sanitize(file.content)) }} />
      </S.ContentSection>
    </S.ContentWrapper>
  )
}
