import { createSignal, createEffect, For, Show } from 'solid-js'

interface Post {
  id: string
  author: string
  avatar: string
  content: string
  image?: string
  timestamp: Date
  likes: number
  comments: Comment[]
  isLiked: boolean
}

interface Comment {
  id: string
  author: string
  avatar: string
  content: string
  timestamp: Date
  likes: number
  isLiked: boolean
}

export default function Feed() {
  // Función para convertir archivo a base64
  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = error => reject(error)
    })
  }

  // Función para guardar posts en localStorage
  const savePostsToStorage = (postsData: Post[]) => {
    try {
      const serializedPosts = JSON.stringify(postsData, (key, value) => {
        if (key === 'timestamp' && value instanceof Date) {
          return value.toISOString()
        }
        return value
      })
      localStorage.setItem('feed-posts', serializedPosts)
    } catch (error) {
      console.error('Error saving posts to localStorage:', error)
    }
  }

  // Función para cargar posts desde localStorage
  const loadPostsFromStorage = (): Post[] => {
    try {
      const stored = localStorage.getItem('feed-posts')
      if (stored) {
        const parsed = JSON.parse(stored, (key, value) => {
          if (key === 'timestamp' && typeof value === 'string') {
            return new Date(value)
          }
          return value
        })
        return parsed
      }
    } catch (error) {
      console.error('Error loading posts from localStorage:', error)
    }
    
    // Posts por defecto si no hay datos guardados
    return [
      {
        id: '1',
        author: 'MemeTrader_Pro',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MemeTrader_Pro',
        content: 'Just bought 1000 shares of the "Distracted Boyfriend" meme! 📈 This one is going to the moon! 🚀',
        timestamp: new Date(Date.now() - 1000 * 60 * 30),
        likes: 42,
        comments: [
          {
            id: 'c1',
            author: 'CryptoMemer',
            avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=CryptoMemer',
            content: 'Great choice! I\'ve been holding this one for weeks 💎🙌',
            timestamp: new Date(Date.now() - 1000 * 60 * 15),
            likes: 8,
            isLiked: false
          }
        ],
        isLiked: true
      },
      {
        id: '2',
        author: 'ViralVestor',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ViralVestor',
        content: 'New meme alert! 🚨 "Woman Yelling at Cat" just hit the market. Early investors are already seeing 200% gains!',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
        likes: 156,
        comments: [],
        isLiked: false
      }
    ]
  }

  const [posts, setPosts] = createSignal<Post[]>(loadPostsFromStorage())

  const [newPostContent, setNewPostContent] = createSignal('')
  const [selectedFile, setSelectedFile] = createSignal<File | null>(null)
  const [previewUrl, setPreviewUrl] = createSignal<string | null>(null)
  const [commentInputs, setCommentInputs] = createSignal<Record<string, string>>({})

  // Efecto para guardar posts automáticamente cuando cambien
  createEffect(() => {
    const currentPosts = posts()
    if (currentPosts.length > 0) {
      savePostsToStorage(currentPosts)
    }
  })

  const handleFileSelect = (event: Event) => {
    const target = event.target as HTMLInputElement
    const file = target.files?.[0]
    
    if (file) {
      setSelectedFile(file)
      const url = URL.createObjectURL(file)
      setPreviewUrl(url)
    }
  }

  const removeFile = () => {
    setSelectedFile(null)
    if (previewUrl()) {
      URL.revokeObjectURL(previewUrl()!)
      setPreviewUrl(null)
    }
  }

  const createPost = async () => {
    const content = newPostContent().trim()
    if (!content) return

    let imageData: string | undefined = undefined
    
    // Si hay un archivo seleccionado, convertirlo a base64
    if (selectedFile()) {
      try {
        imageData = await fileToBase64(selectedFile()!)
      } catch (error) {
        console.error('Error converting file to base64:', error)
        imageData = previewUrl() || undefined
      }
    }

    const newPost: Post = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      content,
      image: imageData,
      timestamp: new Date(),
      likes: 0,
      comments: [],
      isLiked: false
    }

    setPosts(prev => [newPost, ...prev])
    setNewPostContent('')
    setSelectedFile(null)
    if (previewUrl()) {
      URL.revokeObjectURL(previewUrl()!)
      setPreviewUrl(null)
    }
  }

  const toggleLike = (postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, isLiked: !post.isLiked, likes: post.isLiked ? post.likes - 1 : post.likes + 1 }
        : post
    ))
  }

  const toggleCommentLike = (postId: string, commentId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? {
            ...post,
            comments: post.comments.map(comment =>
              comment.id === commentId
                ? { ...comment, isLiked: !comment.isLiked, likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1 }
                : comment
            )
          }
        : post
    ))
  }

  const addComment = (postId: string) => {
    const content = commentInputs()[postId]?.trim()
    if (!content) return

    const newComment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=You',
      content,
      timestamp: new Date(),
      likes: 0,
      isLiked: false
    }

    setPosts(prev => prev.map(post => 
      post.id === postId 
        ? { ...post, comments: [...post.comments, newComment] }
        : post
    ))

    setCommentInputs(prev => ({ ...prev, [postId]: '' }))
  }

  const formatTimeAgo = (date: Date) => {
    const now = new Date()
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)
    
    if (diffInSeconds < 60) return 'just now'
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`
    return `${Math.floor(diffInSeconds / 86400)}d ago`
  }

  return (
    <div class="min-h-screen bg-gradient-to-b from-blue-900 to-blue-700 p-6">
      <div class="max-w-2xl mx-auto">
        {/* Header */}
        <div class="text-center mb-8">
          <h1 class="text-4xl font-bold text-white mb-2">Community Feed</h1>
          <p class="text-gray-300">Share your trading insights and connect with fellow meme investors</p>
        </div>

        {/* Create Post */}
        <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 mb-6 border border-gray-700/50">
          <div class="flex items-start space-x-4">
            <img 
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
              alt="Your avatar" 
              class="w-12 h-12 rounded-full"
            />
            <div class="flex-1">
              <textarea
                value={newPostContent()}
                onInput={(e) => setNewPostContent(e.target.value)}
                placeholder="What's happening in the meme market?"
                class="w-full bg-gray-700/50 text-white placeholder-gray-400 rounded-lg p-4 border border-gray-600 focus:border-blue-500 focus:outline-none resize-none"
                rows="3"
              />
              
              <Show when={previewUrl()}>
                <div class="mt-4 relative">
                  <img 
                    src={previewUrl()!} 
                    alt="Preview" 
                    class="max-w-full h-48 object-cover rounded-lg"
                  />
                  <button
                    onClick={removeFile}
                    class="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center transition-colors"
                  >
                    ×
                  </button>
                </div>
              </Show>
              
              <div class="flex items-center justify-between mt-4">
                <div class="flex items-center space-x-4">
                  <label class="cursor-pointer text-blue-400 hover:text-blue-300 transition-colors">
                    <input
                      type="file"
                      accept="image/*,video/*"
                      onChange={handleFileSelect}
                      class="hidden"
                    />
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </label>
                  <span class="text-gray-400 text-sm">
                    {selectedFile() ? selectedFile()!.name : 'Add photo or video'}
                  </span>
                </div>
                
                <button
                  onClick={createPost}
                  disabled={!newPostContent().trim()}
                  class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-6 py-2 rounded-lg font-semibold transition-colors"
                >
                  Post
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Posts */}
        <div class="space-y-6">
          <For each={posts()}>
            {(post) => (
              <div class="bg-gray-800/50 backdrop-blur-sm rounded-xl p-6 border border-gray-700/50">
                {/* Post Header */}
                <div class="flex items-center space-x-3 mb-4">
                  <img 
                    src={post.avatar} 
                    alt={`${post.author} avatar`} 
                    class="w-10 h-10 rounded-full"
                  />
                  <div class="flex-1">
                    <h3 class="text-white font-semibold">{post.author}</h3>
                    <p class="text-gray-400 text-sm">{formatTimeAgo(post.timestamp)}</p>
                  </div>
                </div>

                {/* Post Content */}
                <p class="text-gray-200 mb-4 leading-relaxed">{post.content}</p>
                
                <Show when={post.image}>
                  <img 
                    src={post.image} 
                    alt="Post image" 
                    class="w-full max-h-96 object-cover rounded-lg mb-4"
                  />
                </Show>

                {/* Post Actions */}
                <div class="flex items-center space-x-6 py-3 border-t border-gray-700">
                  <button
                    onClick={() => toggleLike(post.id)}
                    class={`flex items-center space-x-2 transition-colors ${
                      post.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                    }`}
                  >
                    <svg class="w-5 h-5" fill={post.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    <span>{post.likes}</span>
                  </button>
                  
                  <button class="flex items-center space-x-2 text-gray-400 hover:text-blue-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <span>{post.comments.length}</span>
                  </button>
                  
                  <button class="flex items-center space-x-2 text-gray-400 hover:text-green-500 transition-colors">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                    </svg>
                    <span>Share</span>
                  </button>
                </div>

                {/* Comments */}
                <Show when={post.comments.length > 0}>
                  <div class="mt-4 space-y-3">
                    <For each={post.comments}>
                      {(comment) => (
                        <div class="flex items-start space-x-3 bg-gray-700/30 rounded-lg p-3">
                          <img 
                            src={comment.avatar} 
                            alt={`${comment.author} avatar`} 
                            class="w-8 h-8 rounded-full"
                          />
                          <div class="flex-1">
                            <div class="flex items-center space-x-2 mb-1">
                              <span class="text-white font-medium text-sm">{comment.author}</span>
                              <span class="text-gray-400 text-xs">{formatTimeAgo(comment.timestamp)}</span>
                            </div>
                            <p class="text-gray-200 text-sm">{comment.content}</p>
                            <button
                              onClick={() => toggleCommentLike(post.id, comment.id)}
                              class={`flex items-center space-x-1 mt-2 text-xs transition-colors ${
                                comment.isLiked ? 'text-red-500' : 'text-gray-400 hover:text-red-500'
                              }`}
                            >
                              <svg class="w-4 h-4" fill={comment.isLiked ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                              </svg>
                              <span>{comment.likes}</span>
                            </button>
                          </div>
                        </div>
                      )}
                    </For>
                  </div>
                </Show>

                {/* Add Comment */}
                <div class="flex items-center space-x-3 mt-4">
                  <img 
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" 
                    alt="Your avatar" 
                    class="w-8 h-8 rounded-full"
                  />
                  <div class="flex-1 flex space-x-2">
                    <input
                      type="text"
                      value={commentInputs()[post.id] || ''}
                      onInput={(e) => setCommentInputs(prev => ({ ...prev, [post.id]: e.target.value }))}
                      placeholder="Write a comment..."
                      class="flex-1 bg-gray-700/50 text-white placeholder-gray-400 rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          addComment(post.id)
                        }
                      }}
                    />
                    <button
                      onClick={() => addComment(post.id)}
                      disabled={!commentInputs()[post.id]?.trim()}
                      class="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg transition-colors"
                    >
                      Post
                    </button>
                  </div>
                </div>
              </div>
            )}
          </For>
        </div>
      </div>
    </div>
  )
}