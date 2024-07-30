// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export interface Users {
    results: User[];
    loading: 'idle' | 'pending' | 'succeeded' | 'failed'
}

export interface User {
    gender:     Gender;
    name:       Name;
    location:   Location;
    email:      string;
    phone:      string;
    id:         ID;
    picture:    Picture;
}

export enum Gender {
    Female = "female",
    Male = "male",
}

export interface ID {
    name:  string;
    value: null | string;
}

export interface Location {
    street:      Street;
    city:        string;
    state:       string;
    country:     string;
    postcode:    number | string;
    coordinates: Coordinates;
    timezone:    Timezone;
}

export interface Coordinates {
    latitude:  string;
    longitude: string;
}

export interface Street {
    number: number;
    name:   string;
}

export interface Timezone {
    offset:      string;
    description: string;
}

export interface Name {
    title: string;
    first: string;
    last:  string;
}

export interface Picture {
    large:     string;
    medium:    string;
    thumbnail: string;
}
