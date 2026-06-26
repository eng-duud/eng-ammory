import ProjectForm from "../components/ProjectForm";

export default function NewProjectPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>مشروع جديد</h1>
        <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>أنشئ مشروع جديد وأضف صوره وتقنياته</p>
      </div>
      <ProjectForm/>
    </div>
  );
}
