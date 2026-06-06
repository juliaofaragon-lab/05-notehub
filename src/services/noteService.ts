import axios, { type AxiosResponse } from "axios";
import type { Note, NoteTag } from "../types/note";

const noteHubApi = axios.create({
  baseURL: "https://notehub-public.goit.study/api",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_NOTEHUB_TOKEN}`,
  },
});

export interface FetchNotesParams {
  page: number;
  perPage: number;
  search?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export const fetchNotes = async ({
  page,
  perPage,
  search,
}: FetchNotesParams): Promise<FetchNotesResponse> => {
  const response: AxiosResponse<FetchNotesResponse> = await noteHubApi.get(
    "/notes",
    {
      params: {
        page,
        perPage,
        ...(search ? { search } : {}),
      },
    },
  );

  return response.data;
};

export const createNote = async (payload: CreateNotePayload): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubApi.post(
    "/notes",
    payload,
  );

  return response.data;
};

export const deleteNote = async (noteId: string): Promise<Note> => {
  const response: AxiosResponse<Note> = await noteHubApi.delete(
    `/notes/${noteId}`,
  );

  return response.data;
};
