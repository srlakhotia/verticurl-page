import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormControl,
  Typography,
  TextField,
  Avatar,
  DialogActions,
  Button,
} from '@material-ui/core';
import axios from 'axios';
import { POST_BLOG, PUT_BLOG } from '../../constants/URLs';

const BlogEditor = (props) => {
  BlogEditor.propTypes = {
    mode: PropTypes.oneOf(['add', 'view', 'edit']),
    setModalOpen: PropTypes.func,
    updateBlogData: PropTypes.func,
    data: PropTypes.object
  };

  const {
    mode = 'add',
    setDialogProps = () => null,
    updateBlogData = () => null,
    data = {}
  } = props;

  const [formData, setFormData] = useState({
    jobTitle: data.jobTitle?.title || '',
    jobDepartment: data.jobTitle?.department || ''
  });
  const [open, setOpen] = useState(true);

  const MODES = {
    ADD: 'add',
    EDIT: 'edit',
    VIEW: 'view'
  };

  const resetDialogProps = () => {
    setDialogProps({
      mode: null,
      data: {},
      open: false
    });
  };

  useEffect(() => {
    return () => {
      resetDialogProps();
    }
  }, []);

  const handleClose = () => {
    setOpen(false);
    resetDialogProps();
  };

  const submitForm = (submitMode, isSubmit) => {
    let payload = {
      title: formData.jobTitle,
      department: formData.jobDepartment,
      postDate: new Date().getTime(),
      applications: data.applications || []
    };
    if (submitMode === MODES.ADD) {
      payload = {
        ...payload,
        isActive: isSubmit || false
      }
      axios
        .post(POST_BLOG, payload)
        .then(res => {
          updateBlogData(res.data)
        })
        .catch(err => { console.log('err', err) });
    } else {
      const URL = PUT_BLOG.replace(':id', data.id);
      payload = {
        ...payload,
        isActive: isSubmit || false
      };

      axios
        .put(URL, payload)
        .then(res => {
          updateBlogData(res.data, true)
        })
        .catch(err => { console.log('err', err) });
    }
    handleClose();
  };

  const renderFormFields = (editMode = false) => {
    return (
      <div>
        <FormControl>
          <TextField
            variant={'outlined'}
            margin={'normal'}
            required
            fullWidth
            id={'job-title'}
            label={'Job Title'}
            name={'job_title'}
            autoComplete={"true"}
            autoFocus
            value={formData.jobTitle}
            onChange={e =>
              setFormData({
                ...formData,
                jobTitle: e.target.value
              })
            }
          />
          <TextField
            variant={'outlined'}
            margin={'normal'}
            required
            fullWidth
            id={'job-department'}
            label={'Job Department'}
            name={'job_department'}
            value={formData.jobDepartment}
            onChange={e =>
              setFormData({
                ...formData,
                jobDepartment: e.target.value
              })
            }
          />
          {editMode && data.applications.length > 0 && (
            <div>
              <Typography variant="body1">
                Applicants
                </Typography>
              {
                data.applications.map((applicant, idx) => {
                  return (<div key={idx}>
                    <Avatar src={applicant.avatar} />
                    <div>{applicant.name}</div>
                  </div>)
                })
              }
            </div>
          )}
        </FormControl>
      </div>
    );
  };

  const renderAddModal = () => {
    return (<>
      <DialogTitle>Add Job</DialogTitle>
      <DialogContent>
        {renderFormFields()}
      </DialogContent>
      <DialogActions>
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          onClick={() => submitForm(MODES.ADD, true)}
        >
          Add
        </Button>
        <Button
          variant={'text'}
          color={'secondary'}
          onClick={() => submitForm(MODES.ADD)}
        >
          Save as draft
        </Button>
      </DialogActions>
    </>);
  };
  const renderEditModal = () => {
    return (<>
      <DialogTitle>Edit Job</DialogTitle>
      <DialogContent>
        {renderFormFields(true)}
      </DialogContent>
      <DialogActions>
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          onClick={() => submitForm(MODES.EDIT, true)}
        >
          Save
        </Button>
        {!data.isActive && (
          <Button
            type={'submit'}
            variant={'text'}
            color={'primary'}
            onClick={() => submitForm(MODES.EDIT)}
          >
            Save as draft
          </Button>
        )}
      </DialogActions>
    </>);
  };
  const renderViewModal = () => {
    return (<>
      <DialogTitle>View Job</DialogTitle>
    </>);
  };

  return (<>
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      maxWidth={'sm'}
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