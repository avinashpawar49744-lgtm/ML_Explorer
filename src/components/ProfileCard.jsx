import { UserRound } from 'lucide-react';

export default function ProfileCard({ name, designation, department, photoLabel = 'Photo', student = false, children }) {
  return (
    <article className={`profile-card ${student ? 'student-profile' : ''}`}>
      <div className="profile-avatar" aria-label={`${photoLabel} placeholder`}>
        <UserRound size={42} />
        <span>{photoLabel}</span>
      </div>
      <div className="profile-copy">
        <h3>{name}</h3>
        <p className="profile-designation">{designation}</p>
        {department && <p className="profile-department">{department}</p>}
        {children}
      </div>
    </article>
  );
}
