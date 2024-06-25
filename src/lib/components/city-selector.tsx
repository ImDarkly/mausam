import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import { Autocomplete, AutocompleteItem } from '@nextui-org/react';

const CitySelector = () => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button
        onClick={onOpen}
        className="text-xl font-bold text-default-50"
        variant="light"
      >
        San Francisco
        <Icon icon="material-symbols:swap-vert-rounded" className="size-5" />
      </Button>
      <Modal
        isOpen={isOpen}
        placement="center"
        backdrop="blur"
        onOpenChange={onOpenChange}
        hideCloseButton
        className="bg-transparent shadow-none"
        size="md"
        scrollBehavior="inside"
        autoFocus
      >
        <ModalContent>
          <ModalBody className="bg-transparent">
            <Autocomplete
              className="text-primary"
              selectorIcon={null}
              classNames={{
                selectorButton: 'hidden',
                clearButton: 'mr-1 text-primary',
              }}
              menuTrigger="input"
              startContent={
                <Icon
                  icon="material-symbols:search-rounded"
                  className="size-5"
                />
              }
              size="lg"
            >
              <AutocompleteItem key="san_francisco">
                San Francisco
              </AutocompleteItem>
            </Autocomplete>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CitySelector;
