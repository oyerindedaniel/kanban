import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from '@/components/ui/alert-dialog';
import { useModal } from '@/hooks/use-modal-store';
import { api } from '@/trpc/react';
import { ReloadIcon } from '@radix-ui/react-icons';
import { useRouter } from 'next/navigation';
import { Button } from '../ui/button';

export default function DeleteBoard() {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteBoard';

  const boardId = data?.board?.id ?? '';

  const boardName = data?.board?.name ?? '';

  const mutateDeleteBoard = api.board.delete.useMutation({
    onSuccess: () => {
      onClose();
      router.push('/');
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const handleClose = () => {
    onClose();
  };

  const isDeleting = mutateDeleteBoard.isLoading;

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this board?</AlertDialogTitle>
          <AlertDialogDescription>
            {`Are you sure you want to delete the ‘${boardName}’ board? This action will remove all
            columns and tasks and cannot be reversed.`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            className="w-2/4"
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            onClick={() => mutateDeleteBoard.mutate({ id: boardId })}
          >
            {isDeleting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
          <Button
            onClick={onClose}
            variant="cancel"
            size="sm"
            className="w-2/4"
            disabled={isDeleting}
          >
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
