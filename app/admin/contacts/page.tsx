'use client';

import { useEffect, useState } from 'react';
import { ContactMessage } from '@/lib/models/Contact';
import { Mail, Trash2, RefreshCw, X, Send } from 'lucide-react';
import { useAdmin } from '@/contexts/AdminContext';
import RichTextEditor from '@/components/admin/RichTextEditor';

export default function ContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);
  const { refreshNewMessagesCount } = useAdmin();
  
  // Reply modal state
  const [showReplyModal, setShowReplyModal] = useState(false);
  const [replySubject, setReplySubject] = useState('');
  const [replyMessage, setReplyMessage] = useState('');
  const [sendingReply, setSendingReply] = useState(false);
  const [replyError, setReplyError] = useState('');

  useEffect(() => {
    fetchMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filter]);

  const fetchMessages = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/contacts?status=${filter}`);
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/contacts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });

      if (response.ok) {
        fetchMessages();
        if (selectedMessage?._id === id) {
          setSelectedMessage({ ...selectedMessage, status: status as ContactMessage['status'] });
        }
        // Refresh the new messages counter in the sidebar
        refreshNewMessagesCount();
      }
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const deleteMessage = async (id: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;

    try {
      const response = await fetch(`/api/admin/contacts?id=${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchMessages();
        setSelectedMessage(null);
        // Refresh the new messages counter in the sidebar
        refreshNewMessagesCount();
      }
    } catch (error) {
      console.error('Error deleting message:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-100 text-green-800';
      case 'read': return 'bg-blue-100 text-blue-800';
      case 'replied': return 'bg-purple-100 text-purple-800';
      case 'archived': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const openReplyModal = (message: ContactMessage) => {
    const companyInfo = message.company ? ` - ${message.company}` : '';
    setReplySubject(`Re: Contact from ${message.firstName} ${message.lastName}${companyInfo}`);
    setReplyMessage('');
    setReplyError('');
    setShowReplyModal(true);
  };

  const handleSendReply = async () => {
    // Strip HTML tags to check if there's actual content
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = replyMessage;
    const textContent = tempDiv.textContent || tempDiv.innerText || '';
    
    if (!selectedMessage || !textContent.trim()) {
      setReplyError('Please enter a reply message');
      return;
    }

    setSendingReply(true);
    setReplyError('');

    try {
      const response = await fetch('/api/admin/send-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messageId: selectedMessage._id,
          to: selectedMessage.email,
          subject: replySubject,
          replyText: replyMessage // Now contains HTML
        })
      });

      const data = await response.json();

      if (response.ok) {
        // Update message status to replied
        await updateStatus(selectedMessage._id!, 'replied');
        setShowReplyModal(false);
        setReplyMessage('');
        setReplySubject('');
      } else {
        setReplyError(data.error || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Error sending reply:', error);
      setReplyError('An error occurred while sending the reply');
    } finally {
      setSendingReply(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Messages</h1>
          <p className="text-gray-600 mt-1">Manage and respond to customer inquiries</p>
        </div>
        <button
          onClick={fetchMessages}
          disabled={loading}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title="Refresh messages"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="flex flex-wrap gap-2">
          {['all', 'new', 'read', 'replied', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                filter === status
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Messages Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          ) : messages.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">No messages found</p>
            </div>
          ) : (
            messages.map((message) => (
              <div
                key={message._id}
                onClick={() => setSelectedMessage(message)}
                className={`bg-white rounded-lg shadow-sm p-6 cursor-pointer transition-all hover:shadow-md ${
                  selectedMessage?._id === message._id ? 'ring-2 ring-blue-500' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">
                      {message.firstName} {message.lastName}
                    </h3>
                    <p className="text-sm text-gray-600">{message.email}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(message.status)}`}>
                    {message.status}
                  </span>
                </div>
                <p className="text-gray-700 text-sm line-clamp-2">{message.message}</p>
                <p className="text-xs text-gray-500 mt-3">
                  {new Date(message.createdAt).toLocaleString()}
                </p>
              </div>
            ))
          )}
        </div>

        {/* Message Detail */}
        <div className="lg:sticky lg:top-6 h-fit">
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedMessage.firstName} {selectedMessage.lastName}
                  </h2>
                  <p className="text-gray-600 mt-1">{selectedMessage.email}</p>
                  {selectedMessage.phone && (
                    <p className="text-gray-600">{selectedMessage.phone}</p>
                  )}
                  {selectedMessage.company && (
                    <p className="text-gray-600 font-medium">{selectedMessage.company}</p>
                  )}
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(selectedMessage.status)}`}>
                  {selectedMessage.status}
                </span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-gray-900 mb-2">Message:</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-sm text-gray-500">
                  Received: {new Date(selectedMessage.createdAt).toLocaleString()}
                </p>
              </div>

              {/* Actions */}
              <div className="space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status:
                  </label>
                  <select
                    value={selectedMessage.status}
                    onChange={(e) => updateStatus(selectedMessage._id!, e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="new">New</option>
                    <option value="read">Read</option>
                    <option value="replied">Replied</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>

                <button
                  onClick={() => openReplyModal(selectedMessage)}
                  className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  Reply via Email
                </button>

                <button
                  onClick={() => deleteMessage(selectedMessage._id!)}
                  className="flex items-center justify-center gap-2 w-full bg-red-600 hover:bg-red-700 text-white font-medium py-3 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                  Delete Message
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-500 text-lg">Select a message to view details</p>
            </div>
          )}
        </div>
      </div>

      {/* Reply Modal */}
      {showReplyModal && selectedMessage && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/20 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-900">Reply to Message</h2>
              <button
                onClick={() => setShowReplyModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Recipient Info */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="font-medium text-gray-700">To:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.email}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <span className="ml-2 text-gray-900">{selectedMessage.firstName} {selectedMessage.lastName}</span>
                </div>
              </div>
            </div>

            {replyError && (
              <div className="mb-4 p-3 bg-red-50 text-red-800 rounded-lg text-sm">
                {replyError}
              </div>
            )}

            <form onSubmit={(e) => { e.preventDefault(); handleSendReply(); }} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  value={replySubject}
                  onChange={(e) => setReplySubject(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Email subject"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message *
                </label>
                <RichTextEditor
                  content={replyMessage}
                  onChange={setReplyMessage}
                  placeholder="Type your reply here..."
                />
              </div>

              {/* Original Message */}
              <div className="pt-4 border-t border-gray-200">
                <p className="text-sm font-medium text-gray-700 mb-2">Original Message:</p>
                <div className="bg-gray-50 rounded-lg p-3 text-sm text-gray-600 max-h-32 overflow-y-auto">
                  <p className="whitespace-pre-wrap">{selectedMessage.message}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReplyModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={sendingReply}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  {sendingReply ? 'Sending...' : 'Send Reply'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

