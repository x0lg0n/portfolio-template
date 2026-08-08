import { GlobeIcon, MailIcon } from "lucide-react";
import { FaLinkedin } from "react-icons/fa6";
import { SiGithub, SiX, SiYoutube } from "react-icons/si";

export type IconProps = React.HTMLAttributes<SVGElement>;

export const Icons = {
  globe: (props: IconProps) => <GlobeIcon {...props} />,
  email: (props: IconProps) => <MailIcon {...props} />,
  linkedin: (props: IconProps) => <FaLinkedin {...props} />,
  x: (props: IconProps) => <SiX {...props} />,
  youtube: (props: IconProps) => <SiYoutube {...props} />,
  github: (props: IconProps) => <SiGithub {...props} />,
};
