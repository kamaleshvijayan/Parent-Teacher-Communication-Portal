import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/use-auth';
import { MessageSquare, Bell, Users, Calendar } from 'lucide-react';
import { useEffect } from 'react';
import { mockMessages } from '../data/mock-data';

export function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  if (!user) return null;

  const unreadMessages = mockMessages.filter(m => !m.read && m.recipientId === user.id).length;

  const stats = [
    {
      title: 'Unread Messages',
      value: unreadMessages,
      icon: MessageSquare,
      color: 'bg-blue-500',
      action: () => navigate('/messages'),
    },
    {
      title: 'New Announcements',
      value: 3,
      icon: Bell,
      color: 'bg-green-500',
      action: () => navigate('/announcements'),
    },
    {
      title: user.role === 'teacher' ? 'Students' : 'Children',
      value: user.role === 'teacher' ? 24 : 2,
      icon: Users,
      color: 'bg-purple-500',
      action: () => navigate('/students'),
    },
    {
      title: 'Upcoming Events',
      value: 5,
      icon: Calendar,
      color: 'bg-orange-500',
      action: () => { },
    },
  ];

  const recentActivity = [
    { type: 'message', text: 'New message from Ms. Johnson', time: '2 hours ago' },
    { type: 'announcement', text: 'School trip announcement posted', time: '1 day ago' },
    { type: 'message', text: 'Reply from Mr. Anderson', time: '2 days ago' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Welcome back, {user.name}
        </h1>
        <p className="mt-2 text-gray-600">
          Here's what's happening with your {user.role === 'teacher' ? 'students' : 'children'} today
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.title}
              onClick={stat.action}
              className="bg-white overflow-hidden shadow rounded-lg cursor-pointer hover:shadow-md transition-shadow"
            >
              <div className="p-5">
                <div className="flex items-center">
                  <div className={`flex-shrink-0 ${stat.color} rounded-md p-3`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-5 w-0 flex-1">
                    <dl>
                      <dt className="text-sm font-medium text-gray-500 truncate">
                        {stat.title}
                      </dt>
                      <dd className="text-3xl font-semibold text-gray-900">
                        {stat.value}
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Recent Activity
          </h2>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-200 last:border-0">
                <div className={`flex-shrink-0 w-2 h-2 mt-2 rounded-full ${activity.type === 'message' ? 'bg-blue-500' : 'bg-green-500'
                  }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-gray-900">{activity.text}</p>
                  <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <button
              onClick={() => navigate('/compose')}
              className="w-full text-left px-4 py-3 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-blue-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">Send a Message</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/messages')}
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <MessageSquare className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">View All Messages</span>
              </div>
            </button>
            <button
              onClick={() => navigate('/students')}
              className="w-full text-left px-4 py-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <div className="flex items-center">
                <Users className="w-5 h-5 text-gray-600 mr-3" />
                <span className="text-sm font-medium text-gray-900">
                  View {user.role === 'teacher' ? 'Students' : 'Children'}
                </span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
