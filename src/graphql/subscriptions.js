/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const onCreateLike = /* GraphQL */ `
  subscription OnCreateLike($filter: ModelSubscriptionLikeFilterInput) {
    onCreateLike(filter: $filter) {
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
export const onUpdateLike = /* GraphQL */ `
  subscription OnUpdateLike($filter: ModelSubscriptionLikeFilterInput) {
    onUpdateLike(filter: $filter) {
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
export const onDeleteLike = /* GraphQL */ `
  subscription OnDeleteLike($filter: ModelSubscriptionLikeFilterInput) {
    onDeleteLike(filter: $filter) {
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
export const onCreateBlog = /* GraphQL */ `
  subscription OnCreateBlog(
    $filter: ModelSubscriptionBlogFilterInput
    $owner: String
  ) {
    onCreateBlog(filter: $filter, owner: $owner) {
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
export const onUpdateBlog = /* GraphQL */ `
  subscription OnUpdateBlog(
    $filter: ModelSubscriptionBlogFilterInput
    $owner: String
  ) {
    onUpdateBlog(filter: $filter, owner: $owner) {
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
export const onDeleteBlog = /* GraphQL */ `
  subscription OnDeleteBlog(
    $filter: ModelSubscriptionBlogFilterInput
    $owner: String
  ) {
    onDeleteBlog(filter: $filter, owner: $owner) {
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
export const onCreateComment = /* GraphQL */ `
  subscription OnCreateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onCreateComment(filter: $filter, owner: $owner) {
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
export const onUpdateComment = /* GraphQL */ `
  subscription OnUpdateComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onUpdateComment(filter: $filter, owner: $owner) {
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
export const onDeleteComment = /* GraphQL */ `
  subscription OnDeleteComment(
    $filter: ModelSubscriptionCommentFilterInput
    $owner: String
  ) {
    onDeleteComment(filter: $filter, owner: $owner) {
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
export const onCreateUser = /* GraphQL */ `
  subscription OnCreateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onCreateUser(filter: $filter, owner: $owner) {
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
export const onUpdateUser = /* GraphQL */ `
  subscription OnUpdateUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onUpdateUser(filter: $filter, owner: $owner) {
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
export const onDeleteUser = /* GraphQL */ `
  subscription OnDeleteUser(
    $filter: ModelSubscriptionUserFilterInput
    $owner: String
  ) {
    onDeleteUser(filter: $filter, owner: $owner) {
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
