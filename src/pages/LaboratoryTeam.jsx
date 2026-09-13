import PageHeader from '../components/PageHeader';
import ProfileCard from '../components/ProfileCard';
import SocialLinks from '../components/SocialLinks';

export default function LaboratoryTeam() {
  return <>
    <PageHeader title="Laboratory Team" subtitle="Guidance, Coordination & Student Work" badge="AIML Department" />
    <section className="team-grid">
      <ProfileCard name="Prof. Suraj Mahajan" designation="Head of Department (HOD)" photoLabel="Faculty Photo" />
      <ProfileCard name="Prof. Pranay Dongarwar" designation="Course Coordinator" photoLabel="Faculty Photo" />
      <ProfileCard name="Avinash Pawar" designation="Student" department="Artificial Intelligence & Machine Learning" photoLabel="Student Photo" student><div className="student-meta"><span>Batch B2</span><span>ML Explorer creator</span></div><SocialLinks /></ProfileCard>
    </section>
    <section className="section-block team-note"><div className="section-head"><h3>Laboratory Direction</h3></div><p className="muted-text">The laboratory combines faculty guidance with hands-on browser simulations so each practical can be explored, repeated, and understood without external services.</p></section>
  </>;
}
