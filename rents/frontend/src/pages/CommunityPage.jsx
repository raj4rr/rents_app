import { useEffect, useState } from 'react';
import client from '../api/client';

export default function CommunityPage() {
  const [messages, setMessages] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [chores, setChores] = useState([]);
  const [text, setText] = useState('');

  const load = async () => {
    const [m, e, c] = await Promise.all([
      client.get('/community/messages'),
      client.get('/expenses'),
      client.get('/chores')
    ]);
    setMessages(m.data);
    setExpenses(e.data);
    setChores(c.data);
  };

  useEffect(() => { load(); }, []);

  const send = async () => {
    await client.post('/community/messages', { authorName: 'Resident', message: text });
    setText('');
    load();
  };

  return (
    <section>
      <h2>Community Hub</h2>
      <div className="grid">
        <div className="card">
          <h3>Chat</h3>
          <div className="chat-box">{messages.map((m) => <p key={m.id}><b>{m.authorName}:</b> {m.message}</p>)}</div>
          <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write message" />
          <button onClick={send}>Send</button>
        </div>
        <div className="card">
          <h3>Shared Expenses</h3>
          {expenses.map((e) => <p key={e.id}>{e.title}: {e.amount}</p>)}
        </div>
        <div className="card">
          <h3>Chore Chart</h3>
          {chores.map((c) => <p key={c.id}>{c.title} - {c.assignedTo} ({c.done ? 'Done' : 'Pending'})</p>)}
        </div>
      </div>
    </section>
  );
}
