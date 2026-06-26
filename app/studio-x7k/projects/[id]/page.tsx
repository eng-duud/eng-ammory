import ProjectForm from "../components/ProjectForm";

export default function EditProjectPage({ params }: { params: { id: string } }) {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-playfair text-3xl mb-1" style={{color:"var(--text)"}}>تعديل المشروع</h1>
        <p className="font-dm text-sm" style={{color:"var(--text-faint)"}}>عدّل تفاصيل المشروع والصور والتقنيات</p>
      </div>
      <ProjectForm projectId={params.id}/>
    </div>
  );
}
