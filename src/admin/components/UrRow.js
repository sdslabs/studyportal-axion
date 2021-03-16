/* eslint-disable react/prop-types */
import { makeStyles } from '@material-ui/core/styles';
import React, { useState } from 'react';
import rejectIcon from 'admin/assets/rejectIcon.svg';
import uploadIcon from 'admin/assets/uploadIcon.svg';
import rejectHover from 'admin/assets/rejectHover.svg';
import uploadHover from 'admin/assets/uploadHover.svg';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { Button, Grid, Fade, TextField } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  ltab: {
    justifyContent: 'center',
    borderRight: '1px solid rgba(43, 42, 40, 0.4)',
  },
  fileRow: {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#2B2A28',
    paddingTop: '24px',
    paddingBottom: '14px',
    borderTop: '1px solid rgba(65, 64, 66, 0.2)',
  },
  fileName: {
    fontFamily: 'Sansation',
    fontStyle: 'normal',
    fontWeight: 'normal',
    fontSize: '16px',
    color: '#2B2A28',
    paddingTop: '24px',
    paddingBottom: '14px',
    borderTop: '1px solid rgba(65, 64, 66, 0.2)',
    textAlign: 'left',
    '&:hover': {
      color: '#38A7DE',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    //backgroundColor: theme.palette.background.paper,
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 8, 3),
    background: '#fff',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    borderRadius: '9px',
  },
  modalTitle: {
    fontSize: '24px',
    color: '#2B2A28',
    marginBottom: '10px',
    paddingLeft: '9px',
  },
  closeIcon: {
    float: 'right',
    position: 'relative',
    left: '47px',
    cursor: 'pointer',
    transition: 'transform 0.35s',
    transitionTimingFunction: 'ease-in-out',
    '&:hover': {
      transform: 'rotate(180deg)',
    },
  },
}));

export default function FileRow(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const [upload, setUpload] = useState(false);
  const [reject, setReject] = useState(false);

  const handleUpload = () => {
    setUpload(!upload);
  };
  const handleReject = () => {
    setReject(!reject);
  };

  const toggleUpload = upload ? (
    <img src={uploadHover} style={{ width: '31px' }} />
  ) : (
    <img src={uploadIcon} />
  );
  const toggleReject = reject ? (
    <img src={rejectHover} style={{ paddingTop: '5px' }} />
  ) : (
    <img src={rejectIcon} style={{ paddingTop: '5px' }} />
  );

  return (
    <div>
      <Grid container>
        <Grid item xs={8} className={classes.fileName}>
          {props.name}
        </Grid>
        <Grid
          item
          xs={2}
          className={classes.fileRow}
          onMouseEnter={handleUpload}
          onMouseLeave={handleUpload}
        >
          <a href="#">{toggleUpload}</a>
        </Grid>
        <Grid
          item
          xs={2}
          className={classes.fileRow}
          onMouseEnter={handleReject}
          onMouseLeave={handleReject}
        >
          <a href="#" onClick={handleOpen}>
            {toggleReject}
          </a>
        </Grid>
      </Grid>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 200,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <CloseIcon className={classes.closeIcon} onClick={handleClose} />
            <p className={classes.modalTitle}>Are you sure you want to reject the request ?</p>
            <form className={classes.root} noValidate autoComplete="off">
              <TextField
                color="secondary"
                multiline
                rows={4}
                required
                label="Add a remark"
                fullWidth
                margin="normal"
                variant="outlined"
              />
            </form>
            <Button
              variant="contained"
              color="secondary"
              style={{ marginLeft: '8px', color: '#fff' }}
            >
              Submit
            </Button>
          </div>
        </Fade>
      </Modal>
    </div>
  );
}
