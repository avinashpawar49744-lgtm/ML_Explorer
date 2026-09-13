import PageHeader from '../components/PageHeader';
import ProfileCard from '../components/ProfileCard';
import SocialLinks from '../components/SocialLinks';
import hodsirPhoto from '../components/images/hodsir.png';
import coordinatorPhoto from '../components/images/image1.png';
import studentPhoto from '../components/images/student.png';

export default function LaboratoryTeam() {
  return <>
    <PageHeader title="Laboratory Team" subtitle="Guidance, Coordination & Student Work" badge="AIML Department" />
    <section className="team-grid">
      <ProfileCard name="Prof. Suraj Mahajan" designation="Head of Department (HOD)" photoLabel="Faculty Photo" imageSrc={hodsirPhoto} />
      <ProfileCard name="Prof. Pranay Dongarwar" designation="Course Coordinator" photoLabel="Faculty Photo" imageSrc={coordinatorPhoto} />
      <ProfileCard name="Avinash Pawar" designation="Student" department="Artificial Intelligence & Machine Learning" batch="B2" photoLabel="Student Photo" imageSrc={studentPhoto} />
    </section>
    <section className="section-block team-note"><div className="section-head"><h3>Laboratory Direction</h3></div><p className="muted-text">The laboratory combines faculty guidance with hands-on browser simulations so each practical can be explored, repeated, and understood without external services.</p></section>
    <section className="section-block student-connect"><div className="section-head"><div><h3>Student Connect</h3><p className="muted-text">Connect with the student</p></div></div><SocialLinks /></section>
  </>;
}
