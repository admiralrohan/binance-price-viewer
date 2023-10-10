import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";

function Modal({
  title = null,
  trigger,
  isOpen,
  setIsOpen,
  children,
}: {
  title?: string | null;
  trigger: React.ReactNode;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  children: React.ReactNode;
}) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
      <Dialog.Trigger asChild>{trigger}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-[#0B0819] fixed inset-0" />

        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          {title && <Dialog.Title>{title}</Dialog.Title>}
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export default Modal;
