import { useLocation, useParams } from 'react-router-dom';

function PrintDetails() {
  const { state } = useLocation();
  console.log('state: ', state);
  const { id } = useParams();
  return (<h1>{`PrintDetails for id: ${id}`}</h1>)
}

export default PrintDetails