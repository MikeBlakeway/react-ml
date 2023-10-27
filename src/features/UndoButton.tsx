import { Button } from '@mui/material'

interface UndoButtonProps {
  handleUndo: () => void
  disabled?: boolean
}

export const UndoButton: React.FC<UndoButtonProps> = ({
  handleUndo,
  disabled = true,
}) => (
  <Button variant='outlined' onClick={handleUndo} disabled={disabled}>
    UNDO
  </Button>
)
