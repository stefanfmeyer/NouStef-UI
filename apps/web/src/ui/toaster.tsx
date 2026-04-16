import { Box, Portal, Toast, Toaster } from '@chakra-ui/react';
import { toaster } from './toaster-store';

export function AppToaster() {
  return (
    <Portal>
      <Toaster toaster={toaster} insetInline={{ mdDown: '4', md: '6' }} insetBlockStart={{ mdDown: '4', md: '6' }}>
        {(toast) => (
          <Toast.Root maxW={{ base: 'calc(100vw - 2rem)', md: 'sm' }} rounded="8px">
            <Toast.Indicator />
            <Box flex="1" minW={0}>
              {toast.title ? <Toast.Title>{toast.title}</Toast.Title> : null}
              {toast.description ? <Toast.Description>{toast.description}</Toast.Description> : null}
            </Box>
            {toast.meta?.closable !== false ? <Toast.CloseTrigger /> : null}
          </Toast.Root>
        )}
      </Toaster>
    </Portal>
  );
}
