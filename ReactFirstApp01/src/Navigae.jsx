import { useNavigate } from 'react-router-dom';

function Nag() {
  const nav = useNavigate();

  const navigatePage = () => {
    nav('/about');
  }

  return (
    <button onClick={navigatePage}>Navigate</button>
  );
}

export default Nag;
