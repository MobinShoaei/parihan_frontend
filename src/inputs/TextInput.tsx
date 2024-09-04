import {alpha, styled} from '@mui/material/styles';
import {InputBase, InputBaseProps} from '@mui/material';

const TextInput = styled(InputBase)((props) => ({
    marginTop: '10px',
    // '& .MuiInputBase-input': {
    borderRadius: "6px",
    position: 'relative',
    backgroundColor: '#FFFFFF',
    border: '1px solid',
    borderColor: props.error ? props.theme.palette.error.main : props.theme.palette.secondary.light,
    fontSize: 16,
    width: '100%',
    padding: '10px 10px',
    transition: props.theme.transitions.create([
        'border-color',
        'background-color',
        'box-shadow',
    ]),
    // Use the system font instead of the default Roboto font.
    '&:focus': {
        boxShadow: `${alpha(props.error ? props.theme.palette.error.main : props.theme.palette.primary.main, 0.25)} 0 0 0 0.2rem`,
        borderColor: props.error ? props.theme.palette.error.main : props.theme.palette.primary.main,
    },
    '&::placeholder': {
        color: props.error ? props.theme.palette.error.main : '#8C8C8C',
    }
    // },
}));

export default TextInput;
