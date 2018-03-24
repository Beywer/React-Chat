import callApi from "utils/callApi";

// AUTH
export function loginApi(username, password) {
  return callApi('/login', undefined, {method: 'POST'}, {username, password})
}

export function signupApi(username, password) {
  return callApi('/signup', undefined, {method: 'POST'}, {username, password});
}

export function logoutApi() {
  return callApi('/logout')
}

export function receiveAuthApi(token) {
  return callApi('/users/me', token);
}

export function updateUserProfileApi(token, userProfile) {
  return callApi('/users/me', token, {method: 'POST'}, {data: userProfile});
}

// CHATS
export function getMyChatsApi(token) {
  return callApi('/chats/my', token);
}

export function getAllChatsApi(token) {
  return callApi('/chats', token);
}

export function createChatApi(title, token) {
  return callApi('/chats', token, {
      method: 'POST'
    },
    {data: {title}}
  )
}

export function getChatApi(chatId, token) {
  return callApi(`/chats/${chatId}`, token)
}

export function deleteChatApi(chatId, token) {
  return callApi(`/chats/${chatId}`, token, {
    method: 'DELETE'
  })
}

export function joinChatApi(chatId, token) {
  return callApi(`/chats/${chatId}/join`, token);
}

export function leaveChatApi(chatId, token) {
  return callApi(`/chats/${chatId}/leave`, token);
}

// MESSAGES
export function sendMessageApi(chatId, message, token) {
  return callApi(`/chats/${chatId}`, token, {method: 'POST'}, {data: {content: message}});
}
