import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, onSnapshot, writeBatch, getDocs } from 'firebase/firestore';
import { firebaseDb } from '@/lib/firebase';
import { Building2, Briefcase, GraduationCap, MapPin, Mail, Linkedin, Users, Calendar, Trash2 } from 'lucide-react';

export function LeadProfileCards() {
  const [leads, setLeads] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to the Firebase collection in real-time
    const q = query(collection(firebaseDb, 'pipedream_leads'), orderBy('created_at', 'desc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedLeads = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLeads(fetchedLeads);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const clearLeads = async () => {
    if (!window.confirm('Are you sure you want to clear all mock leads?')) return;
    const batch = writeBatch(firebaseDb);
    const q = query(collection(firebaseDb, 'pipedream_leads'));
    const snapshot = await getDocs(q);
    snapshot.docs.forEach((doc) => {
      batch.delete(doc.ref);
    });
    await batch.commit();
  };

  if (loading) {
    return <div className="animate-pulse text-center text-muted-foreground p-8">Loading Real-Time Profiles...</div>;
  }

  if (leads.length === 0) {
    return null; // Don't show if empty
  }

  return (
    <div className="space-y-6 mt-8">
      <div className="flex items-center justify-between border-b border-border/50 pb-4">
        <h2 className="text-2xl font-bold tracking-tight text-foreground flex items-center gap-2">
          <Users className="h-6 w-6 text-primary" />
          Enriched Profiles ({leads.length})
        </h2>
        <button 
          onClick={clearLeads}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-medium border border-destructive/20"
        >
          <Trash2 className="h-3.5 w-3.5" />
          Clear Data
        </button>
      </div>
      
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {leads.map((lead) => (
          <div key={lead.id} className="depth-tilt-card rounded-2xl p-6 bg-card flex flex-col gap-6">
            
            {/* Header Section */}
            <div className="flex items-start gap-5 border-b border-border/50 pb-5">
              <img 
                src={lead.profile_image_url || `https://ui-avatars.com/api/?name=${lead.first_name}+${lead.last_name}&background=random`} 
                alt={lead.full_name} 
                className="w-20 h-20 rounded-xl object-cover shadow-md border border-border"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-xl font-bold text-foreground">{lead.full_name}</h3>
                    <p className="text-primary font-medium text-sm mt-0.5">{lead.headline}</p>
                  </div>
                  <a href={lead.linkedin_url} target="_blank" rel="noreferrer" className="p-2 bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 rounded-md transition-colors">
                    <Linkedin className="h-5 w-5" />
                  </a>
                </div>
                
                <div className="flex flex-wrap gap-4 mt-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5"><MapPin className="h-3.5 w-3.5" /> {lead.location}</span>
                  <span className="flex items-center gap-1.5"><Building2 className="h-3.5 w-3.5" /> {lead.company_name}</span>
                  <span className="flex items-center gap-1.5"><Users className="h-3.5 w-3.5" /> {lead.follower_count?.toLocaleString()} followers</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            {lead.summary && (
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">About</h4>
                <p className="text-sm text-foreground/80 leading-relaxed bg-background/50 p-3 rounded-lg border border-border/50">
                  {lead.summary}
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Experience */}
              {lead.experience && lead.experience.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                    <Briefcase className="h-4 w-4" /> Experience
                  </h4>
                  <div className="space-y-4">
                    {lead.experience.slice(0, 2).map((exp: any, i: number) => (
                      <div key={i} className="relative pl-4 border-l-2 border-primary/20">
                        <div className="absolute w-2 h-2 bg-primary rounded-full -left-[5px] top-1.5"></div>
                        <h5 className="font-semibold text-sm text-foreground">{exp.title}</h5>
                        <p className="text-xs text-primary">{exp.company}</p>
                        <p className="text-[10px] text-muted-foreground flex items-center gap-1 mt-1">
                          <Calendar className="h-3 w-3" /> {exp.start_date} — {exp.end_date}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Education & Skills */}
              <div className="space-y-6">
                {lead.education && lead.education.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-3 flex items-center gap-2">
                      <GraduationCap className="h-4 w-4" /> Education
                    </h4>
                    {lead.education.map((edu: any, i: number) => (
                      <div key={i}>
                        <h5 className="font-semibold text-sm text-foreground">{edu.school}</h5>
                        <p className="text-xs text-muted-foreground">{edu.degree}</p>
                      </div>
                    ))}
                  </div>
                )}
                
                {lead.skills && lead.skills.length > 0 && (
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">Skills</h4>
                    <div className="flex flex-wrap gap-2">
                      {lead.skills.slice(0, 6).map((skill: string, i: number) => (
                        <span key={i} className="px-2 py-1 bg-accent text-accent-foreground text-[10px] font-medium rounded-full border border-border">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Contact */}
            <div className="mt-auto pt-4 border-t border-border/50 flex flex-wrap gap-4 items-center justify-between text-xs font-medium">
              <a href={`mailto:${lead.email}`} className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4" /> {lead.email}
              </a>
              {lead.personal_email && (
                <span className="text-muted-foreground">Personal: {lead.personal_email}</span>
              )}
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}
