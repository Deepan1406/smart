import logo from './logo.svg';
import './App.css';
import React from 'react'
// import 'semantic.min.css'
import { Link ,useHistory} from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css'
import {Card, Grid,Dimmer,Loader, Image,Container,Search ,Dropdown} from 'semantic-ui-react'
// import DetailView from './detailview';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
          data : [],
          onsearchvalue : '',
          searchResultArray : [],
          isSearching : false,
          listOfRegions : [],
          isLoading : true
    }

    

  }

   async componentDidMount(){
     let Regions = []
     let listOfRegions = []
    let url = 'https://restcountries.com/v2/all'
     await  fetch(url).
      then(response=> response.json()).
      then( data => { 
        data.map(ele=>{
          if(!Regions.includes(ele.region))
          {
            console.log(ele.region)
            Regions.push(ele.region)
            listOfRegions.push({ key : ele.name , value : ele.region ,text : ele.region })
          }
         // listOfRegions.push({ key : ele.name , value : ele.region   })
        })
        this.setState({
          data : data,
          listOfRegions : listOfRegions,
          isLoading : false
        })
        
         } ).catch(e=>{

         })
         console.log(listOfRegions)

         
      
  }
  setResult =(value,ByRegion)=>{
    console.log(value)
    let re = new RegExp(value.trim());
    let resultArray = []
    resultArray= this.state.data.filter((element)=>{
      if(ByRegion)
      return element.region.toLowerCase() == value.toLowerCase()
        
      else
      return re.exec(element.name.toLowerCase())
    })
    console.log(resultArray)
    this.setState({
      searchResultArray : resultArray,
      isSearching : false
    })
  }


  render(){
    let dataArraytobeShown = []
    if(this.state.onsearchvalue.trim() === '' ){
       dataArraytobeShown = this.state.data
    }
    else{
      dataArraytobeShown = this.state.searchResultArray
    }
    return (
      <Container fluid>
       
      <Search style={{ display :'inline' }}
          loading={this.state.isSearching}
          onResultSelect={(e, data) =>{
            console.log(data); }
          }
          onSearchChange={(e,{value})=>{  
            console.log(value)
             this.setState({ onsearchvalue : value , isSearching : true });this.setResult(value,false)  }}
         // results={results}
          value={this.state.onsearchvalue}
        />
        
          
      <Dropdown 
         placeholder='Select Region'
         onChange={(e,{value})=>{   this.setState({ onsearchvalue : value , isSearching : true });this.setResult(value,true)  }}
          search
       selection
        options={this.state.listOfRegions}
     />
     


      { this.state.isLoading ?
           <Dimmer active>
           <Loader  />
         </Dimmer>
        :      

      <Grid relaxed fluid stackable mobile={16} columns={3} divided style={{ margin  : 10  }}>
      {/* <Grid.Row   fluid> */}
      { dataArraytobeShown.map(ele=>(

       <Grid.Column key={ele.name} fluid>

      <Link to={{ pathname: '/detail', state:{...ele} }} >
      <Card key={ele} >
      <Image src={ele.flags.png} />
      <Card.Content fluid>
        <Card.Header>{ele.name}</Card.Header>
        <Card.Description>
          Population:{ele.population}<br/>
          Region :{ele.region} <br/>
         Capital : {ele.capital}
        </Card.Description>
      </Card.Content>
    </Card>
    </Link>
  
    </Grid.Column>
   
    
    
    
    
      )) }
      
      {/* </Grid.Row> */}
      </Grid>

      }
      
      </Container>
    )



  }



}


export default App;
