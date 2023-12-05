import TemplateModal from 'component/modal/TemplateModal';
import React, { useEffect, useRef, useMemo, useState, useLayoutEffect } from 'react';
import './modal.css';
import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";
import { BaseButton, DangerButton, NormalButton, AddButton } from 'component/CustomButton';

const CustomTextField = styled(FormControlLabel)(({ theme }) => ({
    width: 'auto',
    alignItems: 'baseline',
    margin: 0,

    '& .MuiFormControlLabel-label': {
        fontSize: '16px',
        color: '#e57373',
        fontWeight: 'bold',
    },
    '& .MuiInputBase-input': {
        padding: '10px',
        height: '12px',
    },
    '& .MuiTextField-root': {
        width: '150px',
        background: '#fcfcfc',

        '.Mui-disabled': {
            background: '#f7f7f7',
        }
    },
}));

const UpdateNumberModal = ({ open, onClose, currentPlayerInfo, UpdateNumber }) => {
    const [number, setNumber] = useState("");

    useEffect(() => {
        if(open){
            if(currentPlayerInfo){
                setNumber(currentPlayerInfo.value);
            }
        }
    }, [open])

    return (
        <TemplateModal title="등번호변경" open={open} onClose={onClose}>
            <div className='update-container'>
                <div className='update-item'>
                    <CustomTextField
                        control={
                            <TextField
                                value={number}
                                onChange={(e)=>setNumber(e.target.value)}
                                fullWidth
                                inputProps={{ style: { height: '10px', fontSize: 14, fontWeight: 'bold', backgroundColor: 'white', textAlign: 'center' } }}
                                placeholder=''
                            />
                        }
                        label=""
                    />
                </div>
                <div className='update-button-contoller'>
                    <BaseButton onClick={() => UpdateNumber(number)}>수정</BaseButton>
                    <DangerButton onClick={onClose}>취소</DangerButton>
                </div>
            </div>
        </TemplateModal>
    )
}
export default UpdateNumberModal;