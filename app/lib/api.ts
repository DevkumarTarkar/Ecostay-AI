// API configuration
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api';

console.log('API_BASE_URL:', API_BASE_URL);

export async function fetchHomestays() {
  try {
    console.log('Fetching from:', `${API_BASE_URL}/homestays`);
    const response = await fetch(`${API_BASE_URL}/homestays`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching homestays:', error);
    throw error;
  }
}

export async function searchHomestays(location: string) {
  try {
    const response = await fetch(`${API_BASE_URL}/homestays/search?location=${encodeURIComponent(location)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error searching homestays:', error);
    throw error;
  }
}

export async function getHomestayById(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/homestays/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching homestay:', error);
    throw error;
  }
}

export async function createHomestay(data: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/homestays/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error creating homestay:', error);
    throw error;
  }
}

export async function updateHomestay(id: number, data: any) {
  try {
    const response = await fetch(`${API_BASE_URL}/homestays/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error updating homestay:', error);
    throw error;
  }
}

export async function deleteHomestay(id: number) {
  try {
    const response = await fetch(`${API_BASE_URL}/homestays/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error deleting homestay:', error);
    throw error;
  }
}
