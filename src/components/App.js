import React, { useState, useEffect } from "react";

import Loading from "./Loading";
import Tours from "./Tours";

const url = "https://course-api.com/react-tours-project";

const App = () => {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);

  const removeTour = (id) => {
    setTours(tours.filter((tour) => tour.id !== id));
  };

  useEffect(() => {
    fetchTours();
  }, []);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await fetch(url);

      const toursFetched = await response.json();
      setTours(toursFetched);
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  };

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }

  if (tours.length === 0) {
    return (
      <main id="main">
        <div className="title">
          <h2>No tours left</h2>
          <button className="btn" onClick={fetchTours}>
            refresh
          </button>
        </div>
      </main>
    );
  }
  return (
    <main id="main">
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  );
};

// class App extends React.Component{

//   constructor(props){
//     super(props)
//     this.state={
//       tours:[],
//       loading: true
//     }

//     this.fetchTours = this.fetchTours.bind(this)
//     this.removeTour = this.removeTour.bind(this)
//   }

//   removeTour(id){
//     this.setState({tours:this.state.tours.filter((tour)=>tour.id!==id)})
//   }
//   // fetchTours = async () => {

//   // }

//   componentDidMount(){
//     this.fetchTours()
//   }
//   async fetchTours (){
//     try{
//       this.setState({loading:true})
//       const response = await fetch(url)

//       const toursFetched = await response.json()
//       console.log(toursFetched)
//       this.setState({tours:toursFetched,loading:false})
//     }catch(err){
//       this.setState({loading:false})
//       console.log(err)

//     }
//   }

//   render(){

//     if(this.state.loading){
//       return(
//         <main>
//           <Loading />
//         </main>
//       )
//     }

//     if(this.state.tours.length === 0 ){
//       return(
//           <main>
//             <div className="title">
//               <h2>No tours left</h2>
//               <button className="btn" onClick={this.fetchTours}>refresh</button>
//             </div>
//           </main>
//       )
//     }
//     return(
//       <main>
//         <Tours tours={this.state.tours} removeTour={this.removeTour}/>
//       </main>
//     )
//   }
// }

export default App;
