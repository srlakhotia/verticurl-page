import React, { useState, useEffect} from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  // DialogActions,
  DialogContent,
} from '@material-ui/core';

const BlogEditor = (props) => {
  BlogEditor.propTypes = {
    mode: PropTypes.oneOf(['add', 'view', 'edit']),
    setModalOpen: PropTypes.func,
    data: PropTypes.object
  };

  const MODES = {
    ADD: 'add',
    EDIT: 'edit',
    VIEW: 'view'
  }

  const {
    mode = 'add',
    setDialogProps = () => null,
    data = {}
  } = props;

  console.log('data:: ', data)
  useEffect(() => {
    return () => {
      setDialogProps({
        mode: null,
        data: {},
        open: false
      });
    }
  })
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    setDialogProps({
      mode: null,
      data: {},
      open: false
    });
  };


  const renderAddModal = () => {
    return (<div>add</div>)
  };
  const renderEditModal = () => {
    return (<div>edit</div>)
  };
  const renderViewModal = () => {
    return (<div>view</div>)
  };

  return (<>
    <Dialog
      open={open}
      onClose={handleClose}
    >
      <DialogContent>
        {mode === MODES.ADD && renderAddModal()}
        {mode === MODES.EDIT && renderEditModal()}
        {mode === MODES.VIEW && renderViewModal()}
      </DialogContent>
    </Dialog>
  </>)
}

export default BlogEditor;