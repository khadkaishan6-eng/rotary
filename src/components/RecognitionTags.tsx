import type { Recognition } from '@/data/site';

export function RecognitionTags({ tags, detailed = false }: { tags: Recognition[]; detailed?: boolean }) {
  const shown = detailed ? tags : tags.slice(0, 3);
  return <ul className={`recognition-tags ${detailed ? 'recognition-tags-full' : ''}`} aria-label="Rotary recognitions">
    {shown.map(tag => <li key={tag.label}><span className="recognition-tag" title={`${tag.label}${tag.recordedYear ? ` · recorded in ${tag.recordedYear}` : ''}`}>
      {detailed ? tag.label : tag.shortLabel ?? tag.label}{tag.years && ` (${tag.years})`}
    </span>{detailed && tag.recordedYear && <span className="recognition-record">Recorded {tag.recordedYear}{tag.sourceUrl && <> · <a className="underline" href={tag.sourceUrl} target="_blank" rel="noopener noreferrer">Source</a></>}</span>}</li>)}
    {!detailed && tags.length > shown.length && <li><span className="recognition-tag" title={tags.slice(3).map(tag => tag.label).join(', ')}>+{tags.length - shown.length}</span></li>}
  </ul>;
}
