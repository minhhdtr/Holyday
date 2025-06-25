import type { RegisterFormData } from './pages/Register';
import type { SignInFormData } from './pages/SignIn';
import type { HotelSearchResponse, HotelType } from '../../backend/src/shared/type';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-in`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });

  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Token invalid');
  }
  return response.json();
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/sign-out`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Sign out failed');
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'POST',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error('Failed to add hotel');
  }
  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch hotels');
  }
  return response.json();
};

export const fetchMyHotelById = async (id: string): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${id}`, {
    method: 'GET',
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch hotel');
  }
  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/my-hotels/${hotelFormData.get('id')}`, {
    method: 'PUT',
    credentials: 'include',
    body: hotelFormData,
  });

  if (!response.ok) {
    throw new Error('Failed to update hotel');
  }
  return response.json();
};

export type SearchParams = {
  destination?: string;
  checkIn?: string;
  checkOut?: string;
  adultCount?: string;
  childCount?: string;
  page?: string;
  facilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOptions?: string;
};

export const searchHotels = async (searchParams: SearchParams): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append('destination', searchParams.destination || '');
  queryParams.append('checkIn', searchParams.checkIn || '');
  queryParams.append('checkOut', searchParams.checkOut || '');
  queryParams.append('adultCount', searchParams.adultCount?.toString() || '');
  queryParams.append('childCount', searchParams.childCount?.toString() || '');
  queryParams.append('page', searchParams.page || '');

  searchParams.facilities?.forEach((facility) => {
    queryParams.append('facilities', facility);
  });
  searchParams.types?.forEach((type) => queryParams.append('types', type));
  searchParams.stars?.forEach((star) => queryParams.append('stars', star));
  queryParams.append('maxPrice', searchParams.maxPrice || '');
  queryParams.append('sortOptions', searchParams.sortOptions || '');

  const response = await fetch(`${API_BASE_URL}/api/hotels/search?${queryParams}`);

  if (!response.ok) {
    throw new Error('Failed to search hotels');
  }
  return response.json();
};
