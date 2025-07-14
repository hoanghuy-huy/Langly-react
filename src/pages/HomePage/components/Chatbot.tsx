import { useRef, useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { X, MessageSquare } from 'lucide-react';

interface Message {
  role: 'user' | 'bot';
  content: string;
}

const initialMessages: Message[] = [
  { role: 'bot', content: 'Xin chào! Tôi là Chatbot AI tư vấn sản phẩm. Bạn muốn tìm khóa học nào?' },
];

const replyScenarios = [
  {
    keywords: ["chào", "hello", "hi", "xin chào"],
    reply: "Xin chào! Tôi là Chatbot AI tư vấn sản phẩm. Bạn muốn tìm khóa học nào?"
  },
  {
    keywords: ["cảm ơn", "thank"],
    reply: "Rất vui được hỗ trợ bạn. Nếu cần tư vấn thêm, hãy nhắn cho tôi bất cứ lúc nào nhé!"
  },
  {
    keywords: ["react", "reactjs", "frontend"],
    reply: "Bạn có thể tham khảo khóa học \"React Masterclass 2024\" với nội dung từ cơ bản đến nâng cao, giảng viên Nguyễn Văn A. Bạn muốn biết thêm chi tiết không?"
  },
  {
    keywords: ["data science", "machine learning", "ml"],
    reply: "Chúng tôi có các khóa: \"Python cho Data Science\" và \"Machine Learning với Python\". Bạn quan tâm đến khóa nào hơn?"
  },
  {
    keywords: ["dưới 500", "<500", "rẻ", "giá thấp"],
    reply: "Một số khóa học dưới 500K: AWS Cloud Practitioner (399,000 VND), Digital Marketing Mastery (499,000 VND). Bạn muốn xem chi tiết khóa nào?"
  },
  {
    keywords: ["trên 1 triệu", ">1m", "đắt"],
    reply: "Khóa \"Machine Learning với Python\" (1,299,000 VND) là một trong những khóa chuyên sâu, phù hợp cho bạn muốn nâng cao kiến thức."
  },
  {
    keywords: ["ai dạy", "giảng viên", "teacher"],
    reply: "Bạn muốn hỏi về giảng viên của khóa học nào? Ví dụ: 'Ai dạy khóa Node.js Backend Development?'"
  },
  {
    keywords: ["Node.js", "backend"],
    reply: "Khóa học \"Node.js Backend Development\" do giảng viên Phạm Thị D hướng dẫn. Bạn muốn xem nội dung chi tiết khóa học này không?"
  },
  {
    keywords: ["người mới", "beginner", "dễ", "cơ bản"],
    reply: "Một số khóa học phù hợp cho người mới bắt đầu: Python cho Data Science, AWS Cloud Practitioner, UI/UX Design Fundamentals. Bạn muốn tìm hiểu thêm về khóa nào?"
  },
  {
    keywords: [],
    reply: "Cảm ơn bạn đã quan tâm! Bạn có thể hỏi về khóa học, chủ đề, mức giá hoặc giảng viên mà bạn muốn tìm hiểu."
  }
];

function getBotReply(userInput: string) {
  const input = userInput.toLowerCase();
  for (const scenario of replyScenarios) {
    if (scenario.keywords.length === 0) continue;
    for (const kw of scenario.keywords) {
      if (input.includes(kw)) {
        return scenario.reply;
      }
    }
  }
  return replyScenarios[replyScenarios.length - 1].reply;
}

const Chatbot = () => {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState('');
  const [open, setOpen] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, open]);

  if (!open) {
    return (
      <button
        className="fixed  bottom-6 right-6 z-50 bg-[var(--primary-color)] hover:bg-blue-400 text-white rounded-full shadow-2xl p-3 flex items-center justify-center cursor-pointer"
        onClick={() => setOpen(true)}
        aria-label="Mở chatbot"
      >
        <MessageSquare className="w-5 h-5" />
      </button>
    );
  }

  const handleSend = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: 'user', content: input };
    const botMsg: Message = { role: 'bot', content: getBotReply(input) };
    setMessages((prev) => [
      ...prev,
      userMsg,
      botMsg,
    ]);
    setInput('');
  };

  const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSend();
  };

  return (
    <Card className="fixed bottom-6 right-6 w-full max-w-sm shadow-2xl z-50 bg-white border border-gray-50">
      <CardHeader className="flex flex-row items-center justify-between border-b border-gray-300">
        <CardTitle>Chatbot AI tư vấn sản phẩm</CardTitle>
        <button
          className="ml-2 p-1 cursor-pointer rounded hover:bg-gray-100 text-gray-500"
          onClick={() => setOpen(false)}
          aria-label="Đóng chatbot"
        >
          <X className="w-5 h-5 text-red-500" />
        </button>
      </CardHeader>
      <CardContent className="flex flex-col h-96 p-0  ">
        <div className="flex-1 overflow-y-auto px-4 py-2 bg-gray-50 border-b ">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`rounded-2xl px-3 py-2 max-w-[80%] text-sm shadow ${
                  msg.role === 'user'
                    ? 'bg-[var(--primary-color)] text-white'
                    : 'bg-white text-gray-800 border'
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="flex items-center gap-2 p-2 pb-0 mb-0 mt-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleInputKeyDown}
            placeholder="Nhập câu hỏi về sản phẩm..."
            className="flex-1 focus:border-gray-400 focus:ring-2 focus:ring-gray-300 focus:outline-none rounded-2xl"
          />
          <Button
            onClick={handleSend}
            className={`px-4 py-2 rounded-2xl cursor-pointer ${!input.trim() ? 'bg-gray-300 text-gray-500 cursor-not-allowed hover:bg-gray-300' : ''}`}
            disabled={!input.trim()}
          >
            Gửi
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default Chatbot;
