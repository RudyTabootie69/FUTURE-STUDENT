import Navigation from "@/components/Navigation";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-bg-soft relative overflow-hidden">
      <Navigation />

      {/* Decorative circles */}
      <div className="absolute left-[267px] top-[193px] w-[300px] h-[300px] rounded-full opacity-40 pointer-events-none"
        style={{ background: "linear-gradient(180deg, #3185FC 0%, #B3D8FF 100%)" }}
      />
      <div className="absolute left-[862px] top-[607px] w-[200px] h-[200px] rounded-full opacity-40 pointer-events-none"
        style={{ background: "linear-gradient(315deg, #B3D8FF 0.3%, #3185FC 99.7%)" }}
      />
      <div className="absolute left-[978px] top-[456px] w-[150px] h-[150px] rounded-full bg-[#B3D8FF] opacity-40 pointer-events-none" />

      {/* Hero Section */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-6 pt-20 pb-32 text-center">
        <h1 className="text-primary-blue text-[92px] font-bold leading-normal mb-6">
          About Us
        </h1>
        <p className="text-black text-base max-w-[649px] mx-auto">
          We're a small passionate team that want to take the stress out of applying to Uni.
          With Future Student, the perfect path is waiting for you.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="relative z-10 max-w-[1142px] mx-auto px-6 pb-20">
        <div className="bg-white rounded-[30px] shadow-[0_10px_40px_0_rgba(49,133,252,0.20)] p-12 lg:p-16">
          <h2 className="text-primary-blue text-[32px] font-bold text-center mb-8">
            Our Story
          </h2>
          <div className="text-black text-base leading-relaxed space-y-6">
            <p>
              Future Student was born from a simple realization: the path to university shouldn't be overwhelming. 
              Every year, thousands of Year 12 students navigate a complex maze of applications, deadlines, and requirements. 
              We saw an opportunity to make this journey smoother, clearer, and more empowering.
            </p>
            <p>
              Our platform brings together everything students need in one place—from discovering courses that match 
              their interests and ATAR to tracking application deadlines and managing their wishlist. We've designed 
              every feature with the student experience at the forefront, ensuring that the application process becomes 
              a journey of discovery rather than a source of stress.
            </p>
            <p>
              What sets Future Student apart is our commitment to personalization. We understand that every student's 
              path is unique, influenced by their academic strengths, personal interests, and future aspirations. 
              That's why we've built tools that adapt to each individual's needs, providing tailored recommendations 
              and guidance throughout the entire application process.
            </p>
            <p>
              Our team consists of educators, technologists, and former university applicants who intimately understand 
              the challenges students face. We've combined our expertise to create a platform that not only simplifies 
              the application process but also empowers students to make informed decisions about their future.
            </p>
            <p>
              We believe that every student deserves access to quality guidance and support as they take this important 
              step in their educational journey. With Future Student, we're democratizing access to university application 
              resources and making the path to higher education clearer for everyone.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
