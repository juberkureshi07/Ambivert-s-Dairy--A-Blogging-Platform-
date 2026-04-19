import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, Timestamp } from 'firebase/firestore';
import { db, handleFirestoreError } from '../firebase';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';
import { MessageSquare, Clock, User } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  imageUrl?: string;
  timestamp: Timestamp;
}

export const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const postsPath = 'posts';
    const q = query(collection(db, postsPath), orderBy('timestamp', 'desc'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Post[];
      setPosts(postsData);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, 'LIST_POSTS', postsPath);
    });

    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare size={48} className="mx-auto text-gray-300 mb-4" />
        <h3 className="text-lg font-medium text-gray-900">No posts yet</h3>
        <p className="text-gray-500">Be the first to share something!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <div
          key={post.id}
          className="block bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow active:scale-[0.99] group"
        >
          <Link to={`/post/${post.id}`} className="block">
            {post.imageUrl && (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-48 object-cover group-hover:opacity-90 transition-opacity"
                referrerPolicy="no-referrer"
              />
            )}
            <div className="p-4 pb-0">
              <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-indigo-600 transition-colors">{post.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3 mb-4">{post.content}</p>
            </div>
          </Link>
          <div className="p-4 pt-0">
            <div className="flex items-center justify-between text-xs text-gray-400 border-t border-gray-50 pt-4">
              <Link 
                to={`/profile/${post.authorId}`}
                className="flex items-center hover:text-indigo-600 transition-colors z-10"
              >
                <User size={12} className="mr-1" />
                <span className="font-medium text-gray-500">{post.authorName || 'Anonymous'}</span>
              </Link>
              <div className="flex items-center">
                <Clock size={12} className="mr-1" />
                <span>{post.timestamp ? formatDistanceToNow(post.timestamp.toDate(), { addSuffix: true }) : 'Just now'}</span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
