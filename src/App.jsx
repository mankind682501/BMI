

import './App.css'  
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import  { useState } from 'react';
import ReactSpeedometer from "react-d3-speedometer";





function App() {
  const[height, setHeight]=useState('')
  const[weight, setWeight]=useState('')
  const[bmi, setBmi]=useState(0)
  const[text, setText]=useState('')
  const[IsHeight, setIsHeight]=useState(true)
  const[IsWeight, setIsWeight]=useState(true)
 

  const validate=(e)=>{
    const name=e.target.name
    const value=e.target.value
    
    if(!! value.match(/^[0-9]*$/)){
      if(name=='height'){
        setHeight(value)
        setIsHeight(true)
      }
      else if(name=='weight'){
        setWeight(value)
        setIsWeight(true)
      }
    }
    else{
      if(name=='height'){
        setHeight(value)
        setIsHeight(false)
      }
      else if(name=='weight'){
        setWeight(value)
        setIsWeight(false)
      }
    }
  }

    const calculate=(e)=>{
      e.preventDefault()
      if(height==""||weight==""){
        alert('Please fill the form completely')
      }
      else{
        const heightinmetres=height/100
        const bmivalue=Math.floor(weight/(heightinmetres*2))
        setBmi(bmivalue)
        setBmiText(bmivalue);
        console.log(bmivalue);
        
      }
    };

    const setBmiText = (bmi) => {
      if (bmi <= 18.5) {
        setText('You are underweight.');
      } else if (bmi > 18.5 && bmi <= 25) {
        setText(' You have a healthy weight.');
      } else if (bmi > 25 && bmi < 30) {
        setText('You are overweight.');
      }  else {
        setText('You are in the obese range.');
      }
    };

    const resetForm=()=>{
      setHeight('');
      setWeight('');
      setBmi(0)
      setText('')
      setIsHeight(true)
      setIsWeight(true)
    }

    

    
  

  return (
    <>
    <div className='container-fluid bg-dark' style={{height:"100vh"}}>
      <div className="row">
        <div className="col-md-2"></div>
        <div className="col-md-8">
          <div className="row  bg-danger p-5 mt-5">
              <div className="col-md-5 bg-light align-items-center justify-content-center text-center shadow" style={{height:"300px"}}>
                <h4 className='mt-3'>Your BMI:{bmi}</h4>
                <p>{text}</p>
                
                
                <ReactSpeedometer
              width={275}
              needleHeightRatio={0.60}
              value={bmi}
              segments={4}
              customSegmentStops={[0, 18, 25, 30, 45]}
              segmentColors={['#1D91F1', '#38DF17', '#EBF11D', '#F1671D']}
              minValue={0}
              maxValue={45}
              currentValueText="BMI"
              customSegmentLabels={[
                { text: "Underweight", position: "INSIDE", color: "#555" },
                { text: "Healthy", position: "INSIDE", color: "#555" },
                { text: "Over", position: "INSIDE", color: "#555" },
                { text: "Obesity", position: "INSIDE", color: "#555" },
              ]}
              ringWidth={47}
              needleTransitionDuration={3333}
              needleTransition="easeElastic"
              needleColor={"black"}
              textColor={"#d8dee9"}
/>

              
              </div>
              <div className="col-md-2"></div>
              <div className="col-md-5 bg-dark shadow" style={{height:"300px"}}>
              <form className=' p-5' onSubmit={calculate}>
                <h4 className='text-light text-center'>BMI Calculator</h4>
                <div className="mb-3">
                <TextField id="filled-basic" label="Height(cm)" variant="filled" onChange={(e)=>validate(e)} className='form-control' color="warning" name="height" value={height||""} />
                  {!IsHeight &&
                  <p className='fw-3 text-danger'>*Invalid Input</p>}
                </div>
                <div className="mb-3">
                <TextField id="filled-basic" label="Weight(kg)" variant="filled" onChange={(e)=>validate(e)} className='form-control' name='weight' color="warning" value={weight||""} />
                {!IsWeight &&
                  <p className='fw-3 text-danger'>*Invalid Input</p>}
                </div>
                <div className='d-flex justify-content-between'>
                <Button variant="contained" type='submit' disabled={IsHeight&&IsWeight?false:true}>Submit</Button>
                <Button variant="outlined" type='button' onClick={resetForm}>Reset</Button>
                </div>
              </form>
              </div>
              
          </div>
        </div>
        <div className="col-md-2"></div>
      </div>
    </div>
    </>
  )
}

export default App
