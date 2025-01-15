export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Contact Us</h1>
      <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-8">
        <form className="space-y-4">
          <div>
            <label htmlFor="name" className="block mb-2">Name</label>
            <input 
              type="text" 
              id="name" 
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="Your Name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block mb-2">Email</label>
            <input 
              type="email" 
              id="email" 
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="your.email@example.com"
            />
          </div>
          <div>
            <label htmlFor="message" className="block mb-2">Message</label>
            <textarea 
              id="message" 
              className="w-full px-3 py-2 border rounded-lg"
              rows={4}
              placeholder="Your message..."
            ></textarea>
          </div>
          <button 
            type="submit" 
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  )
}