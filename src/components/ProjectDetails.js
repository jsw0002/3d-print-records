import { useParams } from 'react-router-dom';

function ProjectDetails() {
  const { id } = useParams();
  return (<h1>{`ProjectDetails for id: ${id}`}</h1>)
}

export default ProjectDetails