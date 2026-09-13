import { useState } from 'react';
import { UserRound } from 'lucide-react';

export default function ProfileCard({ name, designation, department, batch, photoLabel = 'Photo', imageSrc }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="profile-card">
      <div className="profile-avatar" aria-label={`${photoLabel} placeholder`}>
        {imageSrc && !imageFailed ? <img src={imageSrc} alt="" onError={() => setImageFailed(true)} /> : <><UserRound size={42} /><span>{photoLabel}</span></>}
      </div>
      <div className="profile-copy">
        <h3>{name}</h3>
        <p className="profile-designation">{designation}</p>
        {department && <p className="profile-department">{department}</p>}
        {batch && <p className="profile-batch">Batch: {batch}</p>}
      </div>
    </article>
  );
}
