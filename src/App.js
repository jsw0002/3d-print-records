import './App.css';
import { useState, useEffect } from 'react';
import { supabase } from './client';

function App() {
  const [prints, setPrints] = useState([]);
  // const [print, setPrint] = useState({ title: "", content: "" });
  // const { title, content } = print;

  useEffect(() => {
    fetchPrints();
  }, [])

  async function fetchPrints() {
    const { data } = await supabase
      .from('prints')
      .select();
    setPrints(data);
    console.log('data: ', data);
  }

  // async function createPrint() {
  //   await supabase
  //     .from('prints')
  //     .insert([
  //       { title, content }
  //     ])
  //     .single();
  //   setPrints({ title: "", content: "" });
  //   fetchPrints();
  // }

  return (
    <div className="App">
      {/* <input
        placeholder="Title"
        value={title}
        onChange={e => setPrints({ ...print, title: e.target.value })}
      /> 
      <button onClick={createPrint}>Create Print</button> */}
      {/* {
        prints.map(print => {
          <div key={print.id}>
            print
          </div>
        })
      } */}
    </div>
  );
}

export default App;
