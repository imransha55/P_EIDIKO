

import Person3Icon from '@mui/icons-material/Person3';
import { Box,TextField,Typography,Paper,Grid,Container, Autocomplete} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import userServiceModule from '../../Services/user-service/UserService';
import Swal from 'sweetalert2';
import { helpFunction } from '../../Components/HelperComponent/helpFunction';
import {Divider} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useNavigate } from 'react-router';
import Loading from '../../Components/LoadingComponent/Loading';
import AutoEmpSearch from '../../Services/AutoEmpSearch/AutoEmpSearch';
import AddIcon from '@mui/icons-material/Add';
import dayjs from 'dayjs';
import RemoveIcon from '@mui/icons-material/Remove';


export default function ReportingManager(){
    //------EndDate
  const[visible,setVisible]=useState(false);
  const[status,setStatus]=useState("click")

  const handlelerButton=(e)=>{
if(status==="click"){
 setVisible(true)
  setStatus("")
}
else if(status!==1){
setVisible(false)
 setStatus("click")
}
  }
  //------------
    const button1={backgroundColor:"#2196F3",color:"#FFFFFF",borderRadius:"20px",marginBottom:"20px",width:"22%"}
    const textfield1={width: 400}
    const[empId,setEmpId]=useState("")
    const[managerId,setManagerId]=useState("")
    const [startDate,setstartDate]=useState(dayjs().format("YYYY-MM-DD"))
    const [endDate,setEndDate]=useState("")
    const [isloading ,setIsLoading]=useState(false)
    const navigate=useNavigate()

   const [state, setState] =useState({
    open: false,
    vertical: 'top',
    horizontal: 'center',
});
const { vertical, horizontal, open } = state;


const reportingManagerHandle=(e)=>{
    e.preventDefault()
    
    setIsLoading(true)
    let endDate1=helpFunction.endDateManipulation(endDate)

    userServiceModule.reportingManager(empId,managerId,startDate,endDate1).then((res)=>{
       

        if(res.status===201 && res.statusMessage==='success'){
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: res.message,
                showConfirmButton: false,
                timer: 1500
            })
           
        }
        else{
            setIsLoading(false)
            Swal.fire({
                position: 'center',
                icon: 'error',
                title: res.data.message,
                showConfirmButton: false,
                timer: 1500
            }
            )
        }

    }).catch((error)=>{
        setIsLoading(false)
        Swal.fire(
            {
                position: 'center',
                icon: 'error',
                title: error.response.data.message,
                showConfirmButton: false,
                timer: 1500
            }

        )

    })

}

 //backbutton
 const backbutton=useNavigate()

 //AutoComplete
const [data, setData]=useState([]);
const[records,setRecords]=useState();
console.log(managerId)

useEffect(()=>{
  AutoEmpSearch(records).then((res)=>{
    setData(res.data.result)
  })
    },[records])

    
    return(
        isloading ? <Loading/> :
        <Box style={{backgroundColor:"#FFFFFF",height:"92vh"}}>
<Box sx={{display:"flex",
                 justifyContent:"space-between",alignContent:"center",marginRight:"30px"}}>
                 {/* <FcBusinessman  style={{fontSize:'75px',
                    borderRadius:'50%',
                  backgroundColor:'#2196F3',
                  color:'white',
                 margin:'0px 0px',
                 padding:'0px'}}/> */}
                  <center><Typography color={"secondary"} style={{marginLeft:"34px",fontSize:"26px"}}>REPORTING MANAGER</Typography></center>
                  <Grid style={{justifyContent:"center"}}>
                <Button variant='outlined' style={{fontWeight:"bold",color:"#2196F3",marginBottom:"3px",marginTop:"4px",marginRight:"12px"}} 
                 onClick={()=>{backbutton("/user/reporting-manager-data")}}
                 startIcon={<ArrowBackIosNewIcon/>}>
            back
                </Button>
                </Grid>
                 </Box>

        <Divider color='#2196F3' sx={{ margin: '1px 0px',height:"1px"}}  />

        <Container style={{padding:"20px"}}>
            <form onSubmit={reportingManagerHandle}>
            <Paper elevation={0} style={{width:"auto"}} >

            
            <Box sx={{ flexFlow: 1 }}>
                <Grid container spacing={1} gap={3}  justifyContent={"center"} alignItems={"center"} alignContent={"center"}>

                   
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                     <Autocomplete 
            sx={{display:"flex"}}
            options={data.map((employee)=>employee.empId+"  ("+employee.userName+")")}
                                renderInput={(params)=> 
                                <TextField
                                style={textfield1}
                                required
                                 value={managerId}
                                 {...params} 
                                label='ManagerId'
                                className='outlined-basic-text-box'
                                id="outlined-basic" 
                                // OptionEqualToValue={employee.empId}
                                type='text'
                               onChange={(e)=>{setManagerId(e.target.value)}}
                            onKeyUp={(e)=>{setRecords(e.target.value)}}
                            />} />
                        {/* <TextField required value={managerId} onChange={(e)=>{setManagerId(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic" label="Manager Id" variant="outlined" style={textfield1} type='number' /> */}
                    </Grid>
                   
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        {/* <LocalizationProvider dateAdapter={AdapterDayjs}>

                            <DatePicker label="Start Date" defaultValue={dayjs('2023-01-01')} className='outlined-basic-text-box'  sx={{width:400}} />
                        </LocalizationProvider> */}

              <TextField required value={startDate} onChange={(e)=>{setstartDate(e.target.value)}} className='outlined-basic-text-box' id="outlined-basic1" label="Start Date" variant="outlined" style={textfield1} type='date'
                                        
                                    />  

                    </Grid >
              
                    <Grid item xs={12}className='form-group row'
             sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                                marginRight:"199px"
                            }}>

                     <Grid className='col-sm-2  mt-2'>
                      
                      {
                        status==="click"?<Button>
                        <AddIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                         :
                         <Button>
                        <RemoveIcon className='mx-2' name="isyes" style={{color:"0c93fa",}}
                         onClick={handlelerButton}
    
                         />
                         </Button>
                      }
                     <label className='col-sm-4 col-form-label'>Add EndDate(Optional)</label>

                   
                 </Grid>
                  </Grid>
                  
                  { 
                  visible ?
                  
                     <Grid item xs={12} sx={{display:'flex',
                                justifyContent:'center',
                                // alignItems:'center'
                            }}>
                                 
                        <TextField InputLabelProps={{shrink: true,}}
                        className='outlined-basic-text-box' id="outlined-basic1" 
                        label="End Date" variant="outlined" style={textfield1} type='date'
                                      value={endDate}
                          onChange={(e) => {setEndDate(e.target.value)}} />  
                                  
            </Grid >:null
                }
                   
                    <Grid item xs={12} sx={{display:'flex',
                    justifyContent:'center',
                    alignItems:'center'
                }}>
                        <Button type='submit' disableElevation variant="contained" style={button1}>Submit</Button>
                    </Grid>

                </Grid>
            </Box>
            </Paper>
            </form>
        </Container>
    </Box>

               


    )



}