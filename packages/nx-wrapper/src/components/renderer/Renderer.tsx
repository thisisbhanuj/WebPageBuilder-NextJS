'use client'

import React, { useEffect, useState } from 'react';
import { convertDataToUI } from '@/utils/converter';
import { fetchComponentUI } from '@/actions/editor.action';

interface Props {}

const Renderer: React.FC<Props> = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchComponentUI();

        debugger;
        
        const result = JSON.parse(response.component ?? '{}');
        setData(result);
      } catch (error) {
        console.error('Failed to fetch editor data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {data ? convertDataToUI(data) : 'Loading...'}
    </div>
  );
};

export default Renderer;
