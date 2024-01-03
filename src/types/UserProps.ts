export interface UserProps {
  _id?: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface UsersProps {
  _id: string;
  name: string;
  profile: {
    secure_url: string;
  };
}

export interface SearchProps {
  search: string;
}

export interface ProfilePhotoProps {
  profile: string;
}
