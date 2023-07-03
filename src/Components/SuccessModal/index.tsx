import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { FC } from "react";

interface IModalProps {
    open:boolean,
    move:number,
    bestScore:number | null,
    handleRestart:() => void,
}
export const SuccessModal:FC<IModalProps> = ({open,move,bestScore,handleRestart}) => {
  return (
    <div>
      <Dialog
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent>
          You completed the game in {move} moves. Your best score is {bestScore} moves.
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleRestart}>
            Restart
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
