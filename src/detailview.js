import React from 'react'

import 'semantic-ui-css/semantic.min.css'
import {Card, Image,Container,Button,Grid} from 'semantic-ui-react'

import { withRouter,Link } from 'react-router-dom';


class DetailView extends React.Component{

    constructor(props){
        super(props)
        this.data = props.location.state
        
    }
    // { Object.keys(this.data).map(ele=>{
    //     console.log(this.data[ele])
    //     if(this.data[ele].length < 1)
    //     return(
    //         <h1>
    //             {ele} : {this.data[ele] }
    //         </h1>
    //     )
    // })
    // }

    render(){
        
        return(
            <Container fluid>
                <Grid fluid stackable>
                <Link to={{ pathname: '/' }} ><Button>back</Button></Link>
                <Card fluid style={{ margin: 10 }}>
                   <Card.Header>
                <Image src = {this.data.flag}  />
                    </Card.Header>
                <Card.Content fluid>
                 { Object.keys(this.data).map(ele=>{
                      console.log(this.data[ele])
                      if(typeof this.data[ele] === 'string'){
                          
                          return(
                                  <h1 style={{ margin: 10 }}>
                                {ele} : {this.data[ele] }
                                </h1>
                                 )

                          }
                         })
                         

                 }
                
                
               </Card.Content>
               
            </Card>     
                </Grid>

            </Container>
            
        )

        
    }




}
export default withRouter(DetailView)