import apiClient from './apiClient'

// GET all bookmarks
export const getBookmarks = async () => {
  const res = await apiClient({
    url: '/api/bookmark',
    method: 'GET',
  })

  return res.data
}

// CREATE bookmark
export const createBookmark = async (data) => {
  const res = await apiClient({
    url: '/api/bookmark',
    method: 'POST',
    data,
  })

  return res.data
}

// DELETE bookmark
export const deleteBookmark = async (id) => {
  const res = await apiClient({
    url: `/api/bookmark/${id}`,
    method: 'DELETE',
  })

  return res.data
}

// UPDATE bookmark
export const updateBookmark = async (id, data) => {
  const res = await apiClient({
    url: `/api/bookmark/${id}`,
    method: 'PUT',
    data,
  })

  return res.data
}
