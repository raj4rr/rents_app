import { useState } from 'react';
import client from '../api/client';

export default function AdminPage() {
  const [roomId, setRoomId] = useState('');
  const [inventoryMode, setInventoryMode] = useState('HYBRID');
  const [msg, setMsg] = useState('');

  const updateMode = async () => {
    const res = await client.patch(`/rooms/${roomId}/inventory-mode`, { inventoryMode });
    setMsg(`Room ${res.data.code} mode updated to ${res.data.inventoryMode}`);
  };

  return (
    <section>
      <h2>Property Admin</h2>
      <div className="card form-card">
        <h3>Dynamic Inventory Toggle</h3>
        <input value={roomId} onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID" />
        <select value={inventoryMode} onChange={(e) => setInventoryMode(e.target.value)}>
          <option value="PRIVATE_ONLY">PRIVATE_ONLY</option>
          <option value="SHARED_ONLY">SHARED_ONLY</option>
          <option value="HYBRID">HYBRID</option>
        </select>
        <button onClick={updateMode}>Update</button>
        {msg && <p>{msg}</p>}
      </div>
    </section>
  );
}
