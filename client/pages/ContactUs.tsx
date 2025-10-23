import { useState } from "react";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";

export default function ContactUs() {
  const { toast } = useToast();
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description: "We'll get back to you as soon as possible.",
    });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      {/* Header */}
      <div className="w-full bg-primary-blue py-16">
        <div className="max-w-[1200px] mx-auto px-6 text-center">
          <h1 className="text-white text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-white text-lg">
            Have questions? We'd love to hear from you.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1200px] mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-xl shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] p-8 lg:p-12">
            <h2 className="text-2xl font-bold text-black mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 border border-[#1A1818] rounded-lg bg-bg-soft text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-4 py-3 border border-[#1A1818] rounded-lg bg-bg-soft text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-[#1A1818] rounded-lg bg-bg-soft text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-black mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 border border-[#1A1818] rounded-lg bg-bg-soft text-sm focus:outline-none focus:ring-2 focus:ring-primary-blue resize-none"
                  placeholder="Tell us more about your inquiry..."
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-primary-blue text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-xl shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] p-8">
              <h2 className="text-2xl font-bold text-black mb-6">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 8L10.89 13.26C11.19 13.47 11.59 13.47 11.89 13.26L19.78 8M5 19H19C20.1 19 21 18.1 21 17V7C21 5.9 20.1 5 19 5H5C3.9 5 3 5.9 3 7V17C3 18.1 3.9 19 5 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">Email</h3>
                    <a href="mailto:support@futurestudent.com.au" className="text-primary-blue hover:underline">
                      support@futurestudent.com.au
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">Phone</h3>
                    <a href="tel:+611300123456" className="text-primary-blue hover:underline">
                      1300 123 456
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary-blue flex items-center justify-center flex-shrink-0">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21C15.5 17.4 19 14.1764 19 10.2C19 6.22355 15.866 3 12 3C8.13401 3 5 6.22355 5 10.2C5 14.1764 8.5 17.4 12 21Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M12 12C13.1046 12 14 11.1046 14 10C14 8.89543 13.1046 8 12 8C10.8954 8 10 8.89543 10 10C10 11.1046 10.8954 12 12 12Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-black mb-1">Address</h3>
                    <p className="text-[#777]">
                      Level 5, 123 Education Street<br />
                      Sydney NSW 2000<br />
                      Australia
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] p-8">
              <h3 className="text-xl font-bold text-black mb-4">Office Hours</h3>
              <div className="space-y-2 text-[#777]">
                <p><strong className="text-black">Monday - Friday:</strong> 9:00 AM - 5:00 PM</p>
                <p><strong className="text-black">Saturday:</strong> 10:00 AM - 2:00 PM</p>
                <p><strong className="text-black">Sunday:</strong> Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
