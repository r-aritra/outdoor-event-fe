import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const BatchEventApprove: React.FC = () => {
  const location = useLocation();
  const { state } = location;
  const [json, setJson] = useState(state?.data);

  useEffect(() => {
    setJson(state?.data);
    console.log(state?.data);
  }, []);

  return <p>{`BatchEventApprove ${json}`}</p>;
};

export default BatchEventApprove;
