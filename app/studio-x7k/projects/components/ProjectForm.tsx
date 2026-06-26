import dynamic from "next/dynamic";
const ProjectFormClient = dynamic(() => import("./ProjectFormClient"), { ssr: false });
export default ProjectFormClient;
