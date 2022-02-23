export type PostState =
  | {
      data: null;
      loading: boolean;
      error: null;
    }
  | {
      posts: unknown;
      data: null;
      loading: boolean;
      error: null;
    };

export type UserState =
  | {
      data: null;
      loading: boolean;
      error: null;
    }
  | {
      userDoc: unknown;
      data: null;
      loading: boolean;
      error: null;
    };
export interface GitHubUser {
  user: {
    uid?: string;
    email?: string;
    displayName?: string;
  };
  additionalUserInfo: {
    profile: Partial<firebase.firestore.DocumentData>;
  };
  credential: {
    accessToken: string;
  };
}
