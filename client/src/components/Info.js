/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React, { useState } from 'react';
import { Button, Modal, ModalBody, ModalFooter } from 'reactstrap';

const Info = props => {
  const [open, setOpen] = useState(true);
  const [focusAfterClose] = useState(true);

  const toggle = () => setOpen(!open);

  return (
    <div>
      <Modal returnFocusAfterClose={focusAfterClose} isOpen={open}>
        <ModalBody>
          Welcome to your profile! If you wish to save it, just fill out a
          little info about yourself in the 'About Me' section to the right.
          <br />
          <br />
          Enjoy!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggle}>
            Got it!
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default Info;
