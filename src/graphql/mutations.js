/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createBlog = /* GraphQL */ `
  mutation CreateBlog(
    $input: CreateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    createBlog(input: $input, condition: $condition) {
      id
      title
      content
      coverImage
      owner
      createdAt
      updatedAt
      likes {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      userBlogsId
      __typename
    }
  }
`;
export const updateBlog = /* GraphQL */ `
  mutation UpdateBlog(
    $input: UpdateBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    updateBlog(input: $input, condition: $condition) {
      id
      title
      content
      coverImage
      owner
      createdAt
      updatedAt
      likes {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      userBlogsId
      __typename
    }
  }
`;
export const deleteBlog = /* GraphQL */ `
  mutation DeleteBlog(
    $input: DeleteBlogInput!
    $condition: ModelBlogConditionInput
  ) {
    deleteBlog(input: $input, condition: $condition) {
      id
      title
      content
      coverImage
      owner
      createdAt
      updatedAt
      likes {
        nextToken
        __typename
      }
      comments {
        nextToken
        __typename
      }
      userBlogsId
      __typename
    }
  }
`;
export const createLike = /* GraphQL */ `
  mutation CreateLike(
    $input: CreateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    createLike(input: $input, condition: $condition) {
      id
      blogID
      owner
      # Removed nested blog field again to avoid errors
      createdAt
      updatedAt
      blogLikesId
      __typename
    }
  }
`;
export const updateLike = /* GraphQL */ `
  mutation UpdateLike(
    $input: UpdateLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    updateLike(input: $input, condition: $condition) {
      id
      blogID
      owner
      blog {
        id
        title
        content
        coverImage
        owner
        createdAt
        updatedAt
        userBlogsId
        __typename
      }
      createdAt
      updatedAt
      blogLikesId
      __typename
    }
  }
`;
export const deleteLike = /* GraphQL */ `
  mutation DeleteLike(
    $input: DeleteLikeInput!
    $condition: ModelLikeConditionInput
  ) {
    deleteLike(input: $input, condition: $condition) {
      id
      blogID
      owner
      blog {
        id
        title
        content
        coverImage
        owner
        createdAt
        updatedAt
        userBlogsId
        __typename
      }
      createdAt
      updatedAt
      blogLikesId
      __typename
    }
  }
`;
export const createComment = /* GraphQL */ `
  mutation CreateComment(
    $input: CreateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    createComment(input: $input, condition: $condition) {
      id
      blogID
      content
      owner
      createdAt
      # Removed nested blog field again to avoid errors
      updatedAt
      blogCommentsId
      __typename
    }
  }
`;
export const updateComment = /* GraphQL */ `
  mutation UpdateComment(
    $input: UpdateCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    updateComment(input: $input, condition: $condition) {
      id
      blogID
      content
      owner
      createdAt
      blog {
        id
        title
        content
        coverImage
        owner
        createdAt
        updatedAt
        userBlogsId
        __typename
      }
      updatedAt
      blogCommentsId
      __typename
    }
  }
`;
export const deleteComment = /* GraphQL */ `
  mutation DeleteComment(
    $input: DeleteCommentInput!
    $condition: ModelCommentConditionInput
  ) {
    deleteComment(input: $input, condition: $condition) {
      id
      blogID
      content
      owner
      createdAt
      blog {
        id
        title
        content
        coverImage
        owner
        createdAt
        updatedAt
        userBlogsId
        __typename
      }
      updatedAt
      blogCommentsId
      __typename
    }
  }
`;
export const createUser = /* GraphQL */ `
  mutation CreateUser(
    $input: CreateUserInput!
    $condition: ModelUserConditionInput
  ) {
    createUser(input: $input, condition: $condition) {
      id
      name
      email
      bio
      profilePicture
      blogs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const updateUser = /* GraphQL */ `
  mutation UpdateUser(
    $input: UpdateUserInput!
    $condition: ModelUserConditionInput
  ) {
    updateUser(input: $input, condition: $condition) {
      id
      name
      email
      bio
      profilePicture
      blogs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
export const deleteUser = /* GraphQL */ `
  mutation DeleteUser(
    $input: DeleteUserInput!
    $condition: ModelUserConditionInput
  ) {
    deleteUser(input: $input, condition: $condition) {
      id
      name
      email
      bio
      profilePicture
      blogs {
        nextToken
        __typename
      }
      createdAt
      updatedAt
      owner
      __typename
    }
  }
`;
