import { motion } from "framer-motion"
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css"
import { textVariant } from "../utils/motions"
import { styles } from "../styles"
import { SectionWrapper } from "../hoc"
import { experiences } from "../constants";

type Prop = {
  title: string;
  company_name: string;
  icon: string;
  iconBg: string;
  date: string;
  points: string[];
}

const ExperienceCard = ({ experience }:{ experience: Prop}) => {
  return (
    <VerticalTimelineElement
      contentStyle={{ background: '#1d1836', color: "#fff" }}
      contentArrowStyle={{ borderRight: "7px solid #232631" }}
      date={experience.date}
      iconStyle={{ background: experience.iconBg }}
      icon={
        <div className="w-full h-full flex justify-center items-center">
          <img 
            src={experience.icon}
            alt={experience.title}
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      }
    >
      <div>
        <h3 className="text-white text-[24px] font-bold">{experience.title}</h3>
        <p className="text-secondary text-[16px] font-semibold" style={{ margin: 0 }}>{experience.company_name}</p>
      </div>

      <ul className="mt-5 list-disc ml-5 space-y-2">
        {experience.points.map((point, index) => (
          <li
          key={`experience-point-${index}`} 
          className="text-white-10 text-[14px] pl-[1px] tracking-wider"
          >
            {point}
          </li>
        ))}
      </ul>
    </VerticalTimelineElement>
  )
}

const Experience = () => {
  return (
    <>
      <motion.div variants={textVariant(0)}>
        <p className={`${styles.heroSubText}`}>What I have done so far</p>
        <p className={`${styles.heroHeadText}`}>Work Experience.</p>
      </motion.div>

      <div className="mt-20 flex flex-col">
        <VerticalTimeline>
          {experiences.map((experience, index) => (
            <ExperienceCard key={index} experience={experience} />
          ))}
        </VerticalTimeline>
      </div>
    </>
  )
}

export default SectionWrapper(Experience, "work")