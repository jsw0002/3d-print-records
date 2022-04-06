import { useParams } from 'react-router-dom';

function PrintDetails() {
  const { id } = useParams();
  return (<h1>{`PrintDetails for id: ${id}`}</h1>)
}

export default PrintDetails