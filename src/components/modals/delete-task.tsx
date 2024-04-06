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

export function DeleteTask() {
  const router = useRouter();

  const { isOpen, onClose, type, data } = useModal();

  const isModalOpen = isOpen && type === 'deleteTask';

  const taskId = data?.task?.id ?? '';

  const mutateDeleteTask = api.task.delete.useMutation({
    onSuccess: () => {
      onClose();
      router.refresh();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const handleClose = () => {
    onClose();
  };

  const isDeleting = mutateDeleteTask.isLoading;

  return (
    <AlertDialog open={isModalOpen} onOpenChange={handleClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete this task?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to delete the ‘Build settings UI’ task and its subtasks? This
            action cannot be reversed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button
            className="w-2/4"
            variant="destructive"
            size="sm"
            disabled={isDeleting}
            onClick={() => mutateDeleteTask.mutate({ id: taskId })}
          >
            {isDeleting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Delete
          </Button>
          <Button variant="cancel" size="sm" className="w-2/4" disabled={isDeleting}>
            Cancel
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
