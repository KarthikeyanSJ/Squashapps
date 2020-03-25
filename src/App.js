import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import Radio from '@material-ui/core/Radio';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import OtpInput from 'react-otp-input';
import axios from "axios";
import './App.css';


const API_URL = "http://localhost:3001/BackEnd";
function TabPanel(props) {
const { children, value, index, ...other } = props;
  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `wrapped-tab-${index}`,
    'aria-controls': `wrapped-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function TabsWrappedLabel() {
  
  const classes = useStyles();
  const [value, setValue_T] = React.useState('one');
  const [name, setName] = React.useState('');
  const [value_gen, setValue] = React.useState('female');
  const [age, setAge] = React.useState('');
  const [state, setState] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [cmp_name, setCompanyName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [job_title, setJobTitle] = React.useState('');
  const [experience, setExperience] = React.useState('');
  // const [state, setState] = React.useState({checkedA: true});
  const terms = 'I accept the Terms and Conditions';
  const handleChange_T = (event, newValue) => {
    setValue_T(newValue);
  };
  const handleChange = event => {
    setName(event.target.value);
  };
  const handleChange_gen = event => {
    setValue(event.target.value);
  };
  const handleChange_country = event => {
    setAge(event.target.value);
  };
  const handleChange_state = event => {
    setState(event.target.value);
  };
  const handleChange_phone = event => {
    setPhone(event.target.value);
  };
  const handleChange_cname = event => {
    setCompanyName(event.target.value);
  };
  const handleChange_email = event => {
    setEmail(event.target.value);
  };
  const handleChange_jobtitle = event => {
    setJobTitle(event.target.value);
  };
  const handleChange_exp = event => {
    setExperience(event.target.value);
  };
  const handleChange_check = event => {
    setState({ ...state, [event.target.name]: event.target.checked });
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Tabs value={value} onChange={handleChange_T} aria-label="wrapped label tabs example">
          <Tab
            value="one"
            label="1. Personal Details"
            wrapped
            {...a11yProps('one')}
          />
          <Tab value="two" label="2. Company Details" {...a11yProps('two')} />
          <Tab value="three" label="3. Email Verification" {...a11yProps('three')} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index="one">
        <div className="header_text">
        <h2>Add your Personal details</h2>
        <h4>Lorem Ipsum is simply dummy test of the printing and typesetting industry</h4>
        </div>
      <form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={name} onChange={handleChange} label="Name" />
      </FormControl>      
      <FormControl component="fieldset">
  <FormLabel component="legend">Gender</FormLabel>
  <RadioGroup aria-label="gender" name="gender1" value={value_gen} onChange={handleChange_gen}>    
    <FormControlLabel value="male" control={<Radio />} label="Male" />
    <FormControlLabel value="female" control={<Radio />} label="Female" />
  </RadioGroup>
</FormControl>
<FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={age}
          onChange={handleChange_country}
          label="Country"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>India</MenuItem>
          <MenuItem value={20}>Italy</MenuItem>
          <MenuItem value={30}>Iran</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">State</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={state}
          onChange={handleChange_state}
          label="State"
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Tamil Nadu</MenuItem>
          <MenuItem value={20}>Puducherry</MenuItem>
          <MenuItem value={30}>West Bengal</MenuItem>
        </Select>
      </FormControl>
       <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Phone</InputLabel>
        <OutlinedInput id="component-outlined" value={phone} onChange={handleChange_phone} label="Phone" />
      </FormControl>         
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Next
      </Button>
    </form>
    <h4 className="footer_text">Already have an acount? <span className="Login_text"> Log In </span></h4>
      </TabPanel>
      <TabPanel value={value} index="two">
      <div className="header_text">
        <h2>Add your Company details</h2>
        <h4>Lorem Ipsum is simply dummy test of the printing and typesetting industry</h4>
        </div>
      <form className={classes.root} noValidate autoComplete="off">
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Company Name</InputLabel>
        <OutlinedInput id="component-outlined" value={cmp_name} onChange={handleChange_cname} label="Name" />
      </FormControl> 
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Email Id</InputLabel>
        <OutlinedInput id="component-outlined" value={email} onChange={handleChange_email} label="Name" />
      </FormControl> 
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Job Title</InputLabel>
        <OutlinedInput id="component-outlined" value={job_title} onChange={handleChange_jobtitle} label="Name" />
      </FormControl> 
      <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Years of Experience</InputLabel>
        <OutlinedInput id="component-outlined" value={experience} onChange={handleChange_exp} label="Name" />
      </FormControl> 
      <FormControlLabel
        control={<Checkbox checked={state.checkedA} onChange={handleChange_check} name="checkedA" />}
        label={terms}
      />
      <div className="row">
      <Button variant="contained">Back</Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Send OTP
      </Button>
      </div>
      </form>
      </TabPanel>
      <TabPanel value={value} index="three">      
      <form className={classes.root} noValidate autoComplete="off">
      <h1 className="header_text">Enter your OTP</h1>
      <h4 className="header_text">For your security, we need to verify your identity. We sent a 5-digit code to <span className="Login_text"> name@domain.com </span>. Please enter it below.</h4>
      <div>
        <h5>Enter your code</h5>
        <OtpInput
         inputStyle={{
          width: '3rem',
          height: '3rem',
          margin: '0 2rem',
          fontSize: '2rem',
          borderRadius: 4,
          border: '1px solid rgba(0,0,0,0.3)',
        }}
          onChange={otp => console.log(otp)}
          numInputs={5}
          separator={<span>  </span>}
        />
      </div>
      <div className="row">
      <Button variant="contained">Back</Button>
      <Button
        variant="contained"
        color="primary"
        className={classes.button}
        endIcon={<Icon>send</Icon>}
      >
        Verify
      </Button>
      </div>
      <hr></hr>
      <h4 className="header_text">Didn't receive the email? Check your spam filter for an email form <span className="Login_text"> name@domain.com </span>.</h4>
      </form>
      </TabPanel>
    </div>
  );
}
