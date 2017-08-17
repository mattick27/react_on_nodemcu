import React, { Component } from 'react';
import '../node_modules/bulma/css/bulma.css'
import '/Users/mac/Code/bnkota/node_modules/@material/switch/dist/mdc.switch.css'
import curtain_Logo from './picture/curtain.svg'
import plant_Logo from './picture/plant.svg'
import temp_Logo from './picture/fafa.svg'
import kmitl_Logo_3 from './picture/kmitl_logo(Thai).png'
import tank_Logo from './picture/Tank.svg'
import light_Logo from './picture/light.svg'
class App extends Component {
  constructor(props){
    super(props)
    this.state = {
        Temp_statC : 0,
        Temp_humidity : 0,
        Temp_gas : 0,
        Humidity_button : 0,
        Bin_status : 0,        
        Curtain_button : 0,
        Light_No1 : 0 ,
        Light_No2 : 0 ,
        Light_No3 : 0 ,  
   }
  }

toggleSwitch_hum = () => {
  if(this.state.Humidity_button == 0){
    window.location.href = 'http://192.168.0.30:8000/hum/on'
    
    this.setState({
      Humidity_button : 1
    })
  }

  else {
    window.location.href = 'http://192.168.0.30:8000/hum/off'
    this.setState({
      Humidity_button : 0
    })

  }
}

toggleSwitch_curtain = () => {
  if(this.state.Curtain_button == 0){
    window.location.href = 'http://192.168.0.30:8000/cur/on'
    
    this.setState({
      Curtain_button : 1
    })
  }

  else {
    window.location.href = 'http://192.168.0.30:8000/cur/off'
    this.setState({
      Curtain_button : 0
    })

  }
}

toggleSwitch_LightNo1 = () => {
  if(this.state.Light_No1 == 0){
    window.location.href = 'http://192.168.0.30:8000/l1/on'
    
    this.setState({
      Light_No1 : 1
    })
  }

  else {
    window.location.href = 'http://192.168.0.30:8000/l1/off'
    this.setState({
      Light_No1 : 0
    })

  }
}

toggleSwitch_LightNo2 = () => {
  if(this.state.Light_No2 == 0){
    window.location.href = 'http://192.168.0.30:8000/l2/on'
    
    this.setState({
      Light_No2 : 1
    })
  }

  else {
    window.location.href = 'http://192.168.0.30:8000/l2/off'
    this.setState({
      Light_No2 : 0
    })

  }
}
toggleSwitch_LightNo3 = () => {
  if(this.state.Light_No3 == 0){
    window.location.href = 'http://192.168.0.30:8000/l3/on'
    
    this.setState({
      Light_No3 : 1
    })
  }

  else {
    window.location.href = 'http://192.168.0.30:8000/l3/off'
    this.setState({
      Light_No3 : 0
    })

  }
}

  componentDidMount(){
    setInterval(()=>{
      fetch('http://192.168.0.30:8000/')
      .then(res => res.json())
      .then((data)=>{
      this.setState({
        Temp_statC : (data.Temp.stat_C),
        Temp_gas : (data.Temp.gas),
        Humidity_status : data.Humidity.status,
        Light_No1 : data.light.no_1,
        Light_No2 : data.light.no_2,
        Light_No3 : data.light.no_3,
        Curtain_button : data.Curtain.button,
        Bin_status : data.Bin.status,
        Humidity_button : (data.Humidity.button),

      })
     })
    },200)
  }

  render() {
    let hum_But,cur_But,Light_No1_But,Light_No2_But,Light_No3_But = ""

    /////////////////////////////////////
    ///     check Hum_buntton state   ///
    /////////////////////////////////////

    if (this.state.Humidity_button == 0){
      hum_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control"  onClick = {this.toggleSwitch_hum} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
    }
      else{
        hum_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" checked onClick = {this.toggleSwitch_hum} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
      }

    /////////////////////////////////////
    ///     check Hum_buntton state   ///
    /////////////////////////////////////
      

    /////////////////////////////////////
    /// check Curtain_buntton state   ///
    /////////////////////////////////////
    if (this.state.Curtain_button == 0){
      cur_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control"  onClick = {this.toggleSwitch_curtain} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
        </div>
        )
    }
      else{
        cur_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" checked onClick = {this.toggleSwitch_curtain} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
      }
    /////////////////////////////////////
    /// check Curtain_buntton state   ///
    /////////////////////////////////////

    /////////////////////////////////////
    /// check LightNo1_buntton state  ///
    /////////////////////////////////////
    if (this.state.Light_No1 == 0){
      Light_No1_But =  
         (
         <div>
          <div className="mdc-switch">
            <input size = "10" type="checkbox" id="basic-switch" className="mdc-switch__native-control"  onClick = {this.toggleSwitch_LightNo1} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
    }
      else{
        Light_No1_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" checked onClick = {this.toggleSwitch_LightNo1} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
      }
    /////////////////////////////////////
    /// check LightNo1_buntton state  ///
    /////////////////////////////////////

    /////////////////////////////////////
    /// check LightNo2_buntton state  ///
    /////////////////////////////////////
    if (this.state.Light_No2 == 0){
      Light_No2_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control"  onClick = {this.toggleSwitch_LightNo2} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
    }
      else{
        Light_No2_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" checked onClick = {this.toggleSwitch_LightNo2} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
      }
    /////////////////////////////////////
    /// check LightNo2_buntton state  ///
    /////////////////////////////////////

    /////////////////////////////////////
    /// check LightNo3_buntton state  ///
    /////////////////////////////////////
    if (this.state.Light_No3 == 0){
      Light_No3_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control"  onClick = {this.toggleSwitch_LightNo3} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
    }
      else{
        Light_No3_But =  
         (
         <div>
          <div className="mdc-switch">
            <input type="checkbox" id="basic-switch" className="mdc-switch__native-control" checked onClick = {this.toggleSwitch_LightNo3} />          
            <div className="mdc-switch__background">
              <div className="mdc-switch__knob"></div>
            </div>
          </div>
         <label for="basic-switch" className="mdc-switch-label"></label> 
        </div>
        )
      }
    /////////////////////////////////////
    /// check LightNo3_buntton state  ///
    /////////////////////////////////////



    return (
      <div>
       
        <div className="tile is-ancestor" style ={{margin : "2%"}}>
            
            <div className ="tile columns is-vertical ">

              <div className = "tile columns is-child is-mobile">
                
                <div className = "tile is-parent">
                  <article className= "tile is-child notification is-info "> 
                    <div style ={{position:'relative',height: '150'}} >
                      <img style ={{position: 'absolute', margin: 'auto',top:'0',left:'0',right:'0',bottom:'0'}} src ={temp_Logo} width ='75' height = '75' />         
                    </div>

                    <p style ={{fontSize : '16',textAlign : "center"}} className ="subtitle is-6">
                    Temp:<br/>{this.state.Temp_statC} ˚C
                    </p>
                     <progress className="progress is-danger" value={this.state.Temp_statC} max="100"></progress>
                    
                    <p style ={{fontSize : '14',textAlign : "center"}} className ="subtitle is-6">
                     Humidity:<br/>{this.state.Humidity_button} %
                    </p>
                     <progress className="progress is-danger" value={this.state.Humidity_button} max="100"></progress>
                    
                    <p style = {{fontSize : '14',textAlign : "center"}} className="subtitle is-6">
                    C3H8:<br/>{this.state.Temp_gas} kg/m³
                    </p>
                     <progress className="progress is-danger" value={this.state.Temp_gas} max="10"></progress>
                  
                  </article>

                </div>

                  <div className = 'tile columns is-child is-vertical is-mobile'>
                    <div className = "tile is-parent">
                      <article className= "tile is-child notification is-info "> 
                        <div style ={{position:'relative',height: '100'}} >
                          <img style ={{position: 'absolute', margin: 'auto',top:'0',left:'0',right:'0',bottom:'0'}} src ={kmitl_Logo_3} width ='75' height = '75' />         
                        </div>
                      </article>
                    </div>
                    <div className = "tile is-parent">
                      <article className= "tile is-child notification is-info "> 
                        <div style ={{position:'relative',height: '150'}} >
                          <img style ={{position: 'absolute', margin: 'auto',top:'0',left:'0',right:'0',bottom:'0'}} src ={tank_Logo} width ='75' height = '75' />         
                        </div>
                        <p style = {{fontSize : '16',textAlign : "center"}} className="subtitle is-6">
                        Tank:{this.state.Bin_status}%
                        </p>
                        <progress className="progress is-danger" value={this.state.progree_var_1} max="100"></progress>
                  
                      </article>
                    </div>
                  </div>

             </div> 

              <div className = "tile">
                <div className = " tile is-child columns is-mobile is-vertical">    

                    <div className = "tile ">
                    <div className = "tile is-child columns is-mobile">
                      
                      <div className ="tile is-parent "> 
                        <article className= "tile is-child notification is-warning">  
                        <p className ="subtitle"><img src ={curtain_Logo} width ='75' height = '75' />{cur_But}</p>
                        {this.state.Curtain_button}
                        </article>
                      </div>

                      <div className ="tile is-parent "> 
                        <article className= "tile is-child notification is-warning">  
                        <p className ="subtitle"><img src ={plant_Logo} width ='75' height = '75' />{hum_But}</p>
                        </article>
                      </div>

                    </div>
                  </div>

                  <div className = "tile ">
                    <div className = "tile is-child columns is-mobile">
                      
                      <div className ="tile is-parent "> 
                        <article className= "tile is-parent notification is-info">  
                        <p className ="subtitle"><img src ={light_Logo} width ='50' height = '50' />{Light_No1_But} {this.state.Light_No1}</p>
                        </article>
                      </div>

                      <div className ="tile is-parent "> 
                        <article className= "tile is-parent notification is-info">  
                        <p className ="subtitle"><img src ={light_Logo} width ='50' height = '50' />{Light_No2_But} {this.state.Light_No2}</p>
                        </article>
                      </div>

                      <div className ="tile is-parent "> 
                        <article className= "tile is-parent notification is-info ">  
                        <p className ="subtitle"><img src ={light_Logo} width ='50' height = '50' />{Light_No3_But} {this.state.Light_No3}</p>
                        </article>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
        
            </div>
        
        </div>
      </div>

    );
  }
}
export default App;
