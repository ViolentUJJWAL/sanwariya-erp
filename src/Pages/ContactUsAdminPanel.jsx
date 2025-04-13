import { useState } from "react";
import { Mail, Clock, User, MessageCircle } from "lucide-react";

// Dummy data for messages
const DUMMY_MESSAGES = [
  {
    _id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    createdAt: "2024-01-15T10:30:00Z",
    message:
      "I'm interested in learning more about your services and would like to schedule a consultation.",
  },
  {
    _id: "2",
    name: "Jane Smith",
    email: "jane.smith@company.org",
    createdAt: "2024-01-16T14:45:00Z",
    message:
      "We have a potential partnership opportunity and would like to discuss further details.",
  },
  {
    _id: "3",
    name: "Mike Johnson",
    email: "mike.johnson@startup.com",
    createdAt: "2024-01-17T09:15:00Z",
    message:
      "Can you provide more information about your pricing and service packages?",
  },
];

const ContactUsAdminPanel = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [response, setResponse] = useState("");
  const [sending, setSending] = useState(false);

  const handleMessageSelect = (message) => {
    setSelectedMessage(message);
    setResponse("");
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const handleSendResponse = async () => {
    if (!response.trim()) {
      alert("Response cannot be empty!");
      return;
    }

    const messageData = {
      name: selectedMessage.name,
      email: selectedMessage.email,
      message: response,
    };

    try {
      setSending(true);
      // Simulate sending response
      await new Promise((resolve) => setTimeout(resolve, 1000));

      alert("Response sent successfully!");
      setResponse("");
    } catch (error) {
      alert("Failed to send response. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl font-bold mb-6 text-black-500">
        Contact Messages Admin Panel
      </h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages List */}
        <div className="space-y-4">
          {DUMMY_MESSAGES.map((message) => (
            <div
              key={message._id}
              className={`bg-white rounded-lg shadow-sm p-4 cursor-pointer transition-colors border ${
                selectedMessage?._id === message._id
                  ? "bg-[#E68A00] border-orange-500"
                  : "hover:bg-[#F8F5F0] border-[#6F4E37]"
              }`}
              onClick={() => handleMessageSelect(message)}
            >
              <div className="flex items-center gap-2 mb-2">
                <User className="w-4 h-4 text-orange-600" />
                <span className="font-medium text-black">{message.name}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#6F4E37] mb-2">
                <Mail className="w-4 h-4 text-orange-600" />
                <span>{message.email}</span>
              </div>

              <div className="flex items-center gap-2 text-sm text-[#6F4E37] mb-3">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>{formatDate(message.createdAt)}</span>
              </div>

              <div className="text-sm text-[#6F4E37] line-clamp-2">
                {message.message}
              </div>
            </div>
          ))}
        </div>

        {/* Message Detail View */}
        <div>
          {selectedMessage ? (
            <div className="bg-white rounded-lg shadow-lg p-6 border border-[#6F4E37]">
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4 text-orange-500">
                  Message Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-black">
                      From
                    </label>
                    <div className="mt-1 text-[#6F4E37]">
                      {selectedMessage.name} ({selectedMessage.email})
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">
                      Received
                    </label>
                    <div className="mt-1 text-[#6F4E37]">
                      {formatDate(selectedMessage.createdAt)}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-black">
                      Message
                    </label>
                    <div className="mt-1 p-3 bg-orange-100 rounded-md text-[#6F4E37]">
                      {selectedMessage.message}
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-medium text-black mb-2">
                  Response
                </label>
                <textarea
                  value={response}
                  onChange={(e) => setResponse(e.target.value)}
                  className="w-full p-3 border rounded-md text-[#6F4E37]"
                  rows={6}
                  placeholder="Type your response here..."
                />
                <div className="mt-4 flex justify-end">
                  <button
                    className={`text-xl ml-2 px-4 p-2 bg-orange-400 hover:bg-orange-500 text-white rounded ${
                      sending ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                    onClick={handleSendResponse}
                    disabled={sending}
                  >
                    {sending ? "Sending..." : "Send Response"}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center h-64 border-2 border-dashed rounded-lg border-[#6F4E37]">
              <div className="text-center text-[#6F4E37]">
                <MessageCircle className="w-12 h-12 mx-auto mb-2 text-[#196F3D]" />
                <p>Select a message to view details</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactUsAdminPanel;
