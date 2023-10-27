// import SketchPad from './features/SketchPad'
import { Grid } from '@mui/material'

import { SketchPad } from './features/SketchPad'

export const App: React.FC = () => (
  <Grid
    container
    spacing={2}
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
    }}
  >
    <Grid
      item
      flex={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      sx={{
        width: '400px',
        height: '400px',
      }}
    >
      <SketchPad />
    </Grid>
  </Grid>
)

export default App
