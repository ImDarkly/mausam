import { Icon } from '@iconify/react';
import { Button } from '@nextui-org/button';
import {
  Modal,
  ModalBody,
  ModalContent,
  useDisclosure,
} from '@nextui-org/modal';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';

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
        className="min-h-96 bg-transparent shadow-none"
        size="md"
        scrollBehavior="inside"
        autoFocus
      >
        <ModalContent>
          <ModalBody className="bg-transparent">
            <GooglePlacesAutocomplete apiKey="****" />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CitySelector;
