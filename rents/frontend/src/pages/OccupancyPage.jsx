import { useEffect, useState } from 'react';
import client from '../api/client';

export default function OccupancyPage() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    client.get('/admin/occupancy-map').then((res) => setRows(res.data));
  }, []);

  return (
    <section>
      <h2>Real-Time Occupancy Map</h2>
      <table>
        <thead>
          <tr>
            <th>Property</th><th>Apartment</th><th>Room</th><th>Bed</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i}>
              <td>{r.property}</td>
              <td>{r.apartment}</td>
              <td>{r.room}</td>
              <td>{r.bed}</td>
              <td>{r.occupied ? 'Occupied' : 'Available'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
