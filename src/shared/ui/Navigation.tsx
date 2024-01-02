import { useNavigate } from 'react-router-dom'

import { Path } from '~/shared/config/constants'

export function Navigation() {
  const navigate = useNavigate()

  return (
    <>
      {items.map(({ id, link, label }) => (
        <button key={id} onClick={() => navigate(link)}>
          {label}
        </button>
      ))}
    </>
  )
}

const items = [
  { id: 1, link: Path.Home, label: 'Home' },
  { id: 2, link: Path.EnvExample, label: 'Env Example' },
  { id: 3, link: Path.News, label: 'News' },
]
