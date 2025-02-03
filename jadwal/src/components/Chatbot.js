import React, { useState, useEffect, useRef } from 'react';
import { Button, Form, InputGroup, Card } from 'react-bootstrap';
import { FaQuestion } from 'react-icons/fa';

const faqData = [
  { question: "Bagaimana cara mendaftar?", answer: "Anda dapat mendaftar dengan mengklik tombol 'Daftar' di halaman utama." },
  { question: "Bagaimana cara login?", answer: "Anda dapat login dengan mengklik tombol 'Login' di halaman utama." },
  { question: "Apa yang bisa dilakukan oleh admin?", answer: "Admin dapat melihat semua aktivitas siswa dan guru." },
  { question: "Apa yang bisa dilakukan oleh guru?", answer: "Guru dapat membuat dan mengelola jadwal untuk kelas mereka." },
  { question: "Apa yang bisa dilakukan oleh siswa?", answer: "Siswa dapat melihat jadwal mereka dan menandai kehadiran mereka." },
  { question: "Bagaimana cara menggunakan FAQ?", answer: "Gunakan bagian FAQ untuk mendapatkan jawaban atas pertanyaan umum melalui chatbot." }
];

const greetings = ["halo", "hai", "selamat pagi", "selamat siang", "selamat sore", "selamat malam"];

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleQuerySubmit = (e) => {
    e.preventDefault();
    const lowerCaseQuery = query.toLowerCase();
    const isGreeting = greetings.some(greeting => lowerCaseQuery.includes(greeting));
    const faq = faqData.find(faq => faq.question.toLowerCase().includes(lowerCaseQuery));
    const response = isGreeting ? "Apa ada yang bisa saya bantu?" : (faq ? faq.answer : "Maaf, pertanyaan Anda tidak ditemukan.");
    setMessages([...messages, { type: 'user', text: query }, { type: 'bot', text: response }]);
    setQuery('');
  };

  const handleHintClick = (question) => {
    setQuery(question);
    handleQuerySubmit({ preventDefault: () => {} });
  };

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div>
      <Button 
        variant="success" 
        onClick={handleToggle} 
        style={{ 
          position: 'fixed', 
          bottom: '20px', 
          right: '20px', 
          zIndex: 1000, 
          borderRadius: '50%', 
          width: '60px', 
          height: '60px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}
      >
        <FaQuestion style={{ color: 'white', fontSize: '24px' }} />
      </Button>
      {isOpen && (
        <Card style={{ position: 'fixed', bottom: '100px', right: '20px', width: '300px', zIndex: 1000 }}>
          <Card.Body>
            <Card.Title>FAQ Chatbot</Card.Title>
            <div style={{ marginBottom: '10px' }}>
              <strong>Contoh pertanyaan:</strong>
              <ul>
                {faqData.map((faq, index) => (
                  <li key={index} style={{ cursor: 'pointer', color: 'blue' }} onClick={() => handleHintClick(faq.question)}>
                    {faq.question}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ maxHeight: '200px', overflowY: 'auto', marginBottom: '10px' }}>
              {messages.map((msg, index) => (
                <div key={index} style={{ textAlign: msg.type === 'user' ? 'right' : 'left' }}>
                  <div 
                    style={{ 
                      display: 'inline-block', 
                      padding: '10px', 
                      borderRadius: '10px', 
                      margin: '5px 0', 
                      backgroundColor: msg.type === 'user' ? '#dcf8c6' : '#f1f0f0' 
                    }}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <Form onSubmit={handleQuerySubmit}>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder="Ketik pertanyaan Anda..."
                  value={query}
                  onChange={handleQueryChange}
                />
                <Button variant="success" type="submit">Kirim</Button>
              </InputGroup>
            </Form>
          </Card.Body>
        </Card>
      )}
    </div>
  );
}

export default Chatbot;