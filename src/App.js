import logo from './logo.svg';
import './App.css';
import React,{useState,useEffect} from 'react'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
  
} from 'chart.js'

import {Bar} from 'react-chartjs-2'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function App() {
  const [chartdata,setChartData] = useState({datasets:[],})
  const [chartoptions,setChartoptions] = useState()
  const [useranswers,setUseranswers] = useState([])

  const [answersdata,setAnswersdata] = useState({datasets:[],})
  const [answeroptions,setAnsweroptions] = useState()
  const [answersbyVal,setAnswersbyVal] = useState([])

  useEffect(() => {
    axios.get(`http://localhost:3001/data/totalRecord`)
      .then(res => {
        setUseranswers(res.data())
      })
    axios.get(`http://localhost:3001/data/userAnswers`)
      .then(res => {
        answersbyVal(res.data())
      })

    setChartData({
      labels:["total","vincent","phillip"],
      datasets:[
        {
          label:'Users Response',
          data:{useranswers},
          borderColor:"rgb(53,162,235)",
          backgroundColor:"rgb(53,162,235,0.4)"
        }
      ]
    });
    setChartoptions({
      responsive:true,
      plugins:{
        position:"top",

      },
      Title:{
        display:true,
        text:"Answers he"
      }
    })


    setAnswersdata({
      labels:["total","yes","no"],
      datasets:[
        {
          label:'Answers',
          data:{answersbyVal},
          borderColor:"rgb(53,162,235)",
          backgroundColor:"rgb(53,162,235,0.4)"
        }
      ]
    });
    setAnsweroptions({
      responsive:true,
      plugins:{
        position:"top",

      },
      Title:{
        display:true,
        text:"Answers "
      }
    })

  },[])

  

  return (
    <>

    
   <div>
    <h1>Users </h1>
    <Bar  data={chartdata} options={chartoptions}/>
   </div>

   <div>
    <h1>Answers </h1>
    <Bar  data={answersdata} options={answeroptions}/>
   </div>
   </>

  );
}

