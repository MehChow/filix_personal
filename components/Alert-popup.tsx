import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { DMSans700 } from "~/utils/dmsans-text";

interface AlertPopupProps {
  alertOpen: boolean;
  setAlertOpen: (alertOpen: boolean) => void;
  message: { title: string; content: string };
  action?: () => void;
  actionText?: string;
  actionBgColor?: string;
  hasCancelAction?: boolean;
}

const AlertPopup = ({
  alertOpen,
  setAlertOpen,
  message,
  action,
  actionText,
  actionBgColor,
  hasCancelAction,
}: AlertPopupProps) => {
  return (
    <AlertDialog open={alertOpen} onOpenChange={() => setAlertOpen(false)}>
      <AlertDialogContent
        style={{
          width: "90%",
          borderWidth: 0,
        }}
      >
        <AlertDialogHeader>
          <AlertDialogTitle>{message.title}</AlertDialogTitle>
          <AlertDialogDescription>{message.content}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          {hasCancelAction && (
            <AlertDialogCancel>
              <DMSans700>Cancel</DMSans700>
            </AlertDialogCancel>
          )}

          {/* When action is specified */}
          {action ? (
            <AlertDialogAction onPress={action} className={actionBgColor}>
              <DMSans700>{actionText}</DMSans700>
            </AlertDialogAction>
          ) : (
            // Normal confirm button without action
            <AlertDialogAction>
              <DMSans700 style={{ color: "white" }}>Got it</DMSans700>
            </AlertDialogAction>
          )}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertPopup;
