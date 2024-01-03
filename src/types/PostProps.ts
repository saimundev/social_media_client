export interface CreatePostProps {
  postImage: FormData;
  textImage: string;
}

export interface PostProps {
  postData: any;
  countUserPost: number;
}

export interface LikePostProps {
  userId: string | undefined;
  postId: string;
}

export interface CommentPostProps {
  postId: string | undefined;
  commentBy: string;
  comment: string;
}

export interface videoProps {
  title: string;
  thumbnailUrl: string;
  videoUrl: string;
}
