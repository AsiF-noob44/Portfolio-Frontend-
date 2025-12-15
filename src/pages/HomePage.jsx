import ExperienceSection from "../components/homepage-components/ExperienceSection";
import ExpertiseSection from "../components/homepage-components/ExpertiseSection";
import HeaderSection from "../components/homepage-components/HeaderSection";
const HomePage = () => {
  return (
    <div className="flex w-full mt-14 gap-2">
      <div className="w-1/2">
        <HeaderSection />
        <ExperienceSection />
        <ExpertiseSection />
      </div>
      <div className="w-1/2 flex justify-center items-center">
        <img
          src="https://res.cloudinary.com/dq8tehp4v/image/upload/v1765485245/4_conv_jquknf.jpg"
          alt="Profile Hero Image"
          className="size-96 mx-auto rounded-3xl shadow-lg"
        />
      </div>
    </div>
  );
};

export default HomePage;
