import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import backgroundGif from '../assets/images/play.gif';
import './Play.scss';

const History = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/memory/history');
        setHistory(response.data);
      } catch (error) {
        console.error('Error fetching history:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div
      className="background-container"
      style={{
        backgroundImage: `url(${backgroundGif})`,
        overflowY: 'auto',
        height: '100vh'
      }}
    >
      <h1 className="game-title" style={{ fontSize: '60px', marginBottom: '2rem' }}>Game History</h1>

      <div style={{
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: '10px',
        padding: '1rem',
        width: '100%',
        maxWidth: '800px',
        margin: '0 auto',
        color: 'white',
        fontFamily: '"Press Start 2P", sans-serif'
      }}>
        {loading ? (
          <p style={{ fontSize: '16px', color: '#ffcc00', animation: 'blink 1s infinite' }}>
            Loading history...
          </p>
        ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '12px' }}>
          <thead>
          <tr style={{ borderBottom: '2px solid #fff' }}>
            <th style={{ padding: '10px' }}>Player</th>
            <th>Difficulty</th>
            <th>Failed</th>
            <th>Time</th>
            <th>Date</th>
          </tr>
          </thead>
          <tbody>
          {history.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', padding: '20px' }}>
                No game data found.
              </td>
            </tr>
          ) : (
            history.map((item, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #888' }}>
                <td style={{ padding: '10px' }}>{item.userID?.username || 'Anonymous'}</td>
                <td>{item.difficulty}</td>
                <td>{item.failed}</td>
                <td>{item.timeTaken}s</td>
                <td>{new Date(item.gameDate).toLocaleString()}</td>
              </tr>
            ))
          )}
          </tbody>
        </table>
        )}
      </div>

      <div className="button-container">
        <button className="game-button" onClick={() => navigate('/play')}>
          Back to Play
        </button>
      </div>
    </div>
  );
};

export default History;
