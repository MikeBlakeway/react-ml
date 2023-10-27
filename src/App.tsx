// import SketchPad from './features/SketchPad'
import { Grid } from '@mui/material'

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
    {/* <SketchPad /> */}
  </Grid>
)

export default App
