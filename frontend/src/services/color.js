const colors = [
  {
    bg: 'bg-pink-100',
    text: 'text-pink-600',
  },
  {
    bg: 'bg-blue-100',
    text: 'text-blue-600',
  },
  {
    bg: 'bg-green-100',
    text: 'text-green-600',
  },
  {
    bg: 'bg-yellow-100',
    text: 'text-yellow-600',
  },
  {
    bg: 'bg-purple-100',
    text: 'text-purple-600',
  },
  {
    bg: 'bg-red-100',
    text: 'text-red-600',
  },
]
const getBookmarkColor = (index) => {
  return colors[index % colors.length]
}

export { getBookmarkColor }
