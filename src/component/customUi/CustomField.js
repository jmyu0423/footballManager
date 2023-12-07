import { styled } from '@mui/material/styles';
import { Box, Button, Card, CardActions, CardContent, Container, FormControlLabel, Grid, MenuItem, TextField, Typography } from "@mui/material";

export const CustomTextField = styled(FormControlLabel)(({ fontSize, width, height }) => ({
    width: 'auto',
    alignItems: 'baseline',
    margin: 0,

    '& .MuiFormControlLabel-label': {
        fontSize: fontSize,
        color: '#e57373',
        fontWeight: 'bold',
    },
    '& .MuiInputBase-input': {
        padding: '10px',
        height: height,
    },
    '& .MuiTextField-root': {
        width: width,
        background: '#fcfcfc',

        '.Mui-disabled': {
            background: '#f7f7f7',
        }
    },
}));