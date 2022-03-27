import { useState } from 'react';
import { supabase } from '../client';

function AddFilament() {
  const filamentStarter = { name: "", type: "", color: "", price: 0, weight: 0, is_gone: false };
  const [filament, setFilament] = useState(filamentStarter);
  const { type, color, price, weight, is_gone } = filament;
  
  async function createFilament() {
    await supabase
      .from('filaments')
      .insert([
        { type, color, price, weight, is_gone }
      ])
      .single();
    setFilament(filamentStarter);
  }
  
  return (
    <section>
      <h1>Add a Filament</h1>
      <input
        placeholder="Type"
        value={type}
        onChange={e => setFilament({ ...filament, type: e.target.value })}
      />
      <input
        placeholder="Color"
        value={color}
        onChange={e => setFilament({ ...filament, color: e.target.value })}
      />
      <input
        placeholder="Price"
        value={price}
        onChange={e => setFilament({ ...filament, price: e.target.value })}
      />
      <input
        placeholder="Weight"
        value={weight}
        onChange={e => setFilament({ ...filament, weight: e.target.value })}
      />
      <input
        placeholder="Is Gone"
        value={is_gone}
        onChange={e => setFilament({ ...filament, is_gone: e.target.value })}
      />
      <button onClick={createFilament}>Create Filament</button>
    </section>
  );
}

export default AddFilament;