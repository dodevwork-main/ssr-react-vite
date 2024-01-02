import { API_EXAMPLE } from '~/shared/config/env'
import { Navigation } from '~/shared/ui/Navigation'

function EnvExample() {
  return (
    <>
      <Navigation />
      Env Example - {API_EXAMPLE}
    </>
  )
}

export default EnvExample
