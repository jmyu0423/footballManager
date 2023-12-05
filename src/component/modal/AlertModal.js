import { Box, Modal, Dialog, DialogTitle, IconButton, DialogActions, styled, Button, DialogContent } from "@mui/material";

const StyledButton = styled(Button)(({ theme }) => ({
    background: 'red',
    color: '#fff',
    borderRadius: '4px',
    width: '80px'
}))

const AlertModal = ({open, onClose, content}) =>{
    return (
        <Dialog open={open} onClose={onClose} maxWidth='xl'>
            <div style={{ 
                width: '300px', 
                height: '100px',
                fontSize: '14px', 
                fontWeight: 'bold',
                display: 'flex', 
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '10px'
            }}>
                {content}
            </div>
            <DialogActions
                sx={{
                    
                    justifyContent: 'center',
                    background: '#EFEFEF',
                    '.MuiBox-root': {
                        margin: '0px'
                    }
                }}
            >
                <Box sx={{ flexGrow: 1, width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <StyledButton sx={{ background: '#898989', width: '100%' }} onClick={onClose}>확인</StyledButton>
                </Box>
            </DialogActions>
        </Dialog>
    )
}
export default AlertModal;