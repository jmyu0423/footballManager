import { Box, Modal, Dialog, DialogTitle, IconButton, DialogActions, styled, Button, DialogContent } from "@mui/material";
import { GridCloseIcon } from "@mui/x-data-grid";

const TemplateModal = ({ title, open, onClose, children }) => {
    return (
        <Dialog open={open} onClose={onClose} maxWidth='xl'>
            <DialogTitle sx={{
                color: '#14286b',
                fontFamily: 'Spoqa Han Sans Neo',
                fontStyle: 'normal',
                fontWeight: 700,
                fontSize: '18px',
                padding: '5px',
                textAlign: 'center',
                userSelect: 'none',
            }}>
                {title}
            </DialogTitle>
            <IconButton aria-label="close"
                onClick={onClose}
                sx={{ position: 'absolute', right: 8, top: 8, padding: '1px', color: (theme) => theme.palette.grey[500] }}>
                <GridCloseIcon />
            </IconButton>
            {children}
        </Dialog>
    )
}
export default TemplateModal;