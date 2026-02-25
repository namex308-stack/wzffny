import { Container } from "@/components/ui/Container";
import { AutoInterview } from "@/components/AutoInterview";

export const dynamic = "force-dynamic";

export default function AutoPilotPage() {
  return (
    <Container className="py-10">
      <div className="mb-6 space-y-2">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-indigo-600">
          Auto-Pilot
        </p>
        <h1 className="text-3xl font-bold text-slate-900">
          Wzffny Auto-Pilot (CV → أسئلة → فيديو → تقرير)
        </h1>
        <p className="text-sm text-slate-600">
          تحليل ATS فوري، أسئلة موزونة (30/50/20)، تقييم فيديو متعدد الأبعاد، وتقرير نهائي جاهز للإرسال.
        </p>
      </div>
      <AutoInterview />
    </Container>
  );
}
