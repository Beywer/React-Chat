import callApi from "utils/callApi";

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

export function logoutApi() {
  return callApi('/logout')
}
