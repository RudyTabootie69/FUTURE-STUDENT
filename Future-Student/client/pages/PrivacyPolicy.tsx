import Navigation from "@/components/Navigation";
import { Hero } from "@/sections/Hero";
import { TextSection } from "@/components/TextSection";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-bg-soft">
      <Navigation />

      <Hero
        title="Privacy Policy"
        description="Future Student is committed to providing quality services to you and this policy outlines our ongoing obligations to you in respect of how we manage your Personal Information. We have adopted the Australian Privacy Principles (APPs) contained in the Privacy Act 1988 (Cth) (the Privacy Act). The NPPs govern the way in which we collect, use, disclose, store, secure and dispose of your Personal Information. A copy of the Australian Privacy Principles may be obtained from the website of The Office of the Australian Information Commissioner at https://www.oaic.gov.au/"
      />

      <TextSection
        title="What is Personal Information?"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "Personal Information is information or an opinion that identifies an individual. Examples of Personal Information we collect includes names, addresses, email addresses, phone and facsimile numbers.",
          "This Personal Information is obtained in via interaction with our website www.futurestudent.com.au while logged in and from interactions with third parties. We do not store or take any information via cookies that aren't essential for the functioning of the website. We don’t guarantee website links or policy of authorised third parties.",
          "We collect your Personal Information for the primary purpose of providing our services to you, providing information to our clients and marketing. We may also use your Personal Information for secondary purposes closely related to the primary purpose, in circumstances where you would reasonably expect such use or disclosure. You may unsubscribe from our mailing/marketing lists at any time by contacting us in writing.",
          "When we collect Personal Information we will, where appropriate and where possible, explain to you why we are collecting the information and how we plan to use it."
        ]}
      />

      <TextSection
        title="Sensitive Information"
        background="white"
        paragraphs={[
          "Sensitive information is defined in the Privacy Act to include information or opinion about such things as an individual's racial or ethnic origin, political opinions, membership of a political association, religious or philosophical beliefs, membership of a trade union or other professional body, criminal record or health information.",
          "Sensitive information will be used by us only:",
          "1. For the primary purpose for which it was obtained",
          "2. For a secondary purpose that is directly related to the primary purpose",
          "3. With your consent; or where required or authorised by law.",
        ]}
      />

      <TextSection
        title="Third Parties"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "Where reasonable and practicable to do so, we will collect your Personal Information only from you. However, in some circumstances we may be provided with information by third parties. In such a case we will take reasonable steps to ensure that you are made aware of the information provided to us by the third party."
        ]}
      />
      <TextSection
        title="Security of Personal Information"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "Your Personal Information is stored in a manner that reasonably protects it from misuse and loss and from unauthorized access, modification or disclosure.",
          "When your Personal Information is no longer needed for the purpose for which it was obtained, we will take reasonable steps to destroy or permanently de-identify your Personal Information. However, most of the Personal Information is or will be stored in client files which will be kept by us for a minimum of 7 years."
        ]}
      />
      <TextSection
        title="Access to your Personal Information"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "You may access the Personal Information we hold about you and to update and/or correct it, subject to certain exceptions. If you wish to access your Personal Information, please contact us in writing.",
          "Future Student will not charge any fee for your access request, but may charge an administrative fee for providing a copy of your Personal Information.",
          "In order to protect your Personal Information we may require identification from you before releasing the requested information."
        ]}
      />
      <TextSection
        title="Maintaining the Quality of your Personal Information"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "It is important to us that your Personal Information is up to date. We  will  take reasonable steps to make sure that your Personal Information is accurate, complete and up-to-date. If you find that the information we have is not up to date or is inaccurate, please advise us as soon as practicable so we can update our records and ensure we can continue to provide quality services to you."
        ]}
      />
      <TextSection
        title="Policy Updates"
        background="hsl(var(--bg-soft))"
        paragraphs={[
          "This Policy may change from time to time and is available on our website."
        ]}
      />
    </div>
  );
}
