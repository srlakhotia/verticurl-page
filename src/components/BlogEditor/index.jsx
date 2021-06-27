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
  Divider,
} from '@material-ui/core';
import axios from 'axios';
import { POST_BLOG, PUT_BLOG } from '../../constants/URLs';
import { useStyles } from './styles';
import { MONTH_NAMES } from '../../constants/helpers'

const BlogEditor = (props) => {
  BlogEditor.propTypes = {
    mode: PropTypes.oneOf(['add', 'view', 'edit']),
    setModalOpen: PropTypes.func,
    updateBlogData: PropTypes.func,
    data: PropTypes.object,
    dataSelector: PropTypes.string,
  };

  const {
    mode = 'add',
    setDialogProps = () => null,
    updateBlogData = () => null,
    data = {},
    dataSelector = ''
  } = props;

  const classes = useStyles();

  const [formData, setFormData] = useState({
    jobTitle: data.title?.title || '',
    jobDepartment: data.title?.department || ''
  });
  const [open, setOpen] = useState(true);
  const [error, setError] = useState({
    jobTitle: '',
    jobDepartment: ''
  })

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

  const REQUIRED_ERROR_TEXT = 'This is required field';

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
    if (!formData.jobTitle || !formData.jobDepartment) {
      setError({
        jobTitle: formData.jobTitle ? '' : REQUIRED_ERROR_TEXT,
        jobDepartment: formData.jobDepartment ? '' : REQUIRED_ERROR_TEXT,
      });
      return;
    }

    let payload = {
      title: formData.jobTitle,
      department: formData.jobDepartment,
      postDate: new Date().getTime(),
      applications: data.applications || [],
      isHidden: data.isHidden
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

  const validateField = (value, field) => {
    if (!value.trim()) {
      setError({
        ...error,
        [`${field}`]: REQUIRED_ERROR_TEXT
      });
    } else {
      if (error[field]) {
        setError({
          ...error,
          [`${field}`]: ''
        });
      }
    }
  }

  const renderApplicants = () => {
    return (
      <div>
        <Typography variant="h6" className={classes.applicantTitle}>
          Applicants
        </Typography>
        {
          data.applications.map((applicant, idx) => {
            return (<div key={idx} className={classes.applicant}>
              <Avatar src={applicant.avatar} className={classes.applicantAvatar} />
              <div>{applicant.name}</div>
            </div>)
          })
        }
      </div>
    );
  }

  const renderFormFields = (editMode = false) => {
    return (
      <div>
        <FormControl fullWidth>
          <TextField
            variant={'outlined'}
            margin={'normal'}
            required
            fullWidth
            error={!!error.jobTitle}
            helperText={error.jobTitle}
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
            onBlur={(e) => validateField(e.target.value, 'jobTitle')}
            data-selector={'job-title-field'}
          />
          <TextField
            variant={'outlined'}
            margin={'normal'}
            required
            fullWidth
            error={!!error.jobDepartment}
            helperText={error.jobDepartment}
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
            onBlur={(e) => validateField(e.target.value, 'jobDepartment')}
            data-selector={'job-department-field'}
          />
          {editMode && data.applications && data.applications.length > 0 && (
            <>
              <Divider
                variant={'fullWidth'}
              />
              {renderApplicants()}
            </>
          )}
        </FormControl>
      </div>
    );
  };

  const renderAddModal = () => {
    const disabledButtons = !!(error.jobTitle || error.jobDepartment);
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
          disabled={disabledButtons}
          data-selector={'submit-addForm'}
          onClick={() => submitForm(MODES.ADD, true)}
        >
          Add
        </Button>
        <Button
          variant={'text'}
          color={'secondary'}
          onClick={() => submitForm(MODES.ADD)}
          data-selector={'submit-addForm-draft'}
          disabled={disabledButtons}
        >
          Save as draft
        </Button>
      </DialogActions>
    </>);
  };
  const renderEditModal = () => {
    const disabledButton = !!(error.jobTitle || error.jobDepartment);
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
          disabled={disabledButton}
          data-selector={'edit-form-submit'}
        >
          Save
        </Button>
        {!data.isActive && (
          <Button
            type={'submit'}
            variant={'text'}
            color={'primary'}
            onClick={() => submitForm(MODES.EDIT)}
            disabled={disabledButton}
            data-selector={'edit-form-save-draft'}
          >
            Save as draft
          </Button>
        )}
      </DialogActions>
    </>);
  };
  const renderViewModal = () => {
    const postDate = new Date(data.postDate);
    return (<>
      <DialogTitle>View Job</DialogTitle>
      <DialogContent>
        <div className={classes.formGroup}>
          <Typography variant={'h6'} className={classes.formGroupTitle}>
            Job Title
        </Typography>
          <Typography variant={'body1'}>
            {formData.jobTitle}
          </Typography>
        </div>
        <div className={classes.formGroup}>
          <Typography variant={'h6'} className={classes.formGroupTitle}>
            Job Department
        </Typography>
          <Typography variant={'body1'}>
            {formData.jobDepartment}
          </Typography>
        </div>
        <div className={classes.formGroup}>
          <Typography variant={'h6'} className={classes.formGroupTitle}>
            Posted On
        </Typography>
          <Typography variant={'body1'}>
            {`${postDate.getDate()} ${MONTH_NAMES[postDate.getMonth()]} ${postDate.getFullYear()}`}
          </Typography>
        </div>
        <div className={classes.formGroup}>
          <Typography variant={'h6'} className={classes.formGroupTitle}>
            Is Active
        </Typography>
          <Typography variant={'body1'}>
            {`${data.isActive ? 'Yes' : 'No'}`}
          </Typography>
        </div>
        {data.applications && data.applications.length > 0 && renderApplicants()}
      </DialogContent>
      <DialogActions>
        <Button
          type={'submit'}
          variant={'contained'}
          color={'primary'}
          onClick={handleClose}
          disabled={!!(error.jobTitle || error.jobDepartment)}
        >
          Close
        </Button>
      </DialogActions>
    </>);
  };

  return (<>
    <Dialog
      open={open}
      fullWidth
      onClose={handleClose}
      maxWidth={'sm'}
      data-selector={dataSelector}
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