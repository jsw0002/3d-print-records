import { useParams } from 'react-router-dom';

function FilamentDetails() {
  const { id } = useParams();
  return (<h1>{`FilamentDetails for id: ${id}`}</h1>)
}

export default FilamentDetails