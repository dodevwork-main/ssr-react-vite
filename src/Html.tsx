import { ReactNode } from 'react'

import refreshScript from './refresh-hack.js?raw'

type Props = {
  children: ReactNode
}

const IS_DEV = import.meta.env.DEV

export function Html({ children }: Props) {
  return (
    <html lang='en'>
      <head>
        <meta charSet='UTF-8' />
        {IS_DEV && (
          <>
            <script type='module' src='/@vite/client' />
            <script
              type='module'
              dangerouslySetInnerHTML={{ __html: refreshScript }}
            />
          </>
        )}
        <link rel='icon' type='image/svg+xml' href='/vite.svg' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0' />
        <title>SSR React Vite</title>
      </head>
      <body>
        <div id='root'>{children}</div>
      </body>
    </html>
  )
}
