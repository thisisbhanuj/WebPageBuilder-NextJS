import pageData from './data.json';

export async function fetchComponentUI() {
    try {
        const data = JSON.stringify(pageData);
  
        console.log('Data:', data);
  
        return {
          component: data,
          success: true,
          error: null
        };
    } catch (error) {
        console.error('Failed to fetch editor data:', error);
        return {
            component: null,
            success: false,
            error: 'Failed to fetch editor data'
        };
    }
}
